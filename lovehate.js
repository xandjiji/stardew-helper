const cheerio = require('cheerio');
const rp = require('request-promise');

const baseURL = `

https://stardewvalleywiki.com/Golden_Pumpkin

`;


rp(baseURL)

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

        console.log(JSON.stringify(finalObj));
    })

function createArrayObject(cherioResult) {

    let resultArray = [];

    for (const link of Object.keys(cherioResult)) {

        if (cherioResult[link].type == 'tag') {
            resultArray.push(cherioResult[link].attribs.title);
        }
    }

    return resultArray;
}