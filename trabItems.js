const fs = require('fs')
const rp = require('request-promise');
const cheerio = require('cheerio');

global.newlist = []

fs.readFile('./itemsTrab.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var data = JSON.parse(jsonString)

    let count = 0;

    data.forEach((item, index, array) => {
        rp(item.link)
            .then(function (html) {


                var loves = cheerio('.wikitable th:contains("Love") + td > div > a + a ', html);
                var likes = cheerio('.wikitable th:contains("Like") + td > div > a + a ', html);
                var neutrals = cheerio('.wikitable th:contains("Neutral") + td > div > a + a ', html);
                var dislikes = cheerio('.wikitable th:contains("Dislike") + td > div > a + a ', html);
                var hates = cheerio('.wikitable th:contains("Hate") + td > div > a + a ', html);

                let finalObj = {
                    "loves": createArrayObject(loves),
                    "likes": createArrayObject(likes),
                    "neutrals": createArrayObject(neutrals),
                    "dislikes": createArrayObject(dislikes),
                    "hates": createArrayObject(hates)
                }

                item.gifting = finalObj;

                newlist.push(item);         
            })
    });

    setTimeout(saveData, 10000)


    /* data.forEach(element => {
        
        rp(element.link)
        .then(function(html) {


            var loves = cheerio('.wikitable th:contains("Love") + td > div > a + a ', html);
            var likes = cheerio('.wikitable th:contains("Like") + td > div > a + a ', html);
            var neutrals = cheerio('.wikitable th:contains("Neutral") + td > div > a + a ', html);
            var dislikes = cheerio('.wikitable th:contains("Dislike") + td > div > a + a ', html);
            var hates = cheerio('.wikitable th:contains("Hate") + td > div > a + a ', html);

            let finalObj = {
                "loves": createArrayObject(loves),
                "likes": createArrayObject(likes),
                "neutrals": createArrayObject(neutrals),
                "dislikes": createArrayObject(dislikes),
                "hates": createArrayObject(hates)
            }     

            element.gifting = finalObj;
            
            newlist.push(element);            
        })
    }) */

})


function saveData() {
    fs.writeFile('./newTrabItems.json', JSON.stringify(newlist.sort(byID)), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

function byID(a, b) {
    if(a.id < b.id) {
        return -1;
    }
    if(a.id > b.id) {
        return 1;
    }
    return 0;
}




function createArrayObject(cherioResult) {

    let resultArray = [];

    for (const link of Object.keys(cherioResult)) {

        if (cherioResult[link].type == 'tag') {
            resultArray.push(cherioResult[link].attribs.title);
        }
    }

    return resultArray;
}