const fs = require('fs')
const rp = require('request-promise');
const cheerio = require('cheerio');
const path = require('path');

newlist = []

fs.readFile('./itemsTrab.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var data = JSON.parse(jsonString)

    let count = 0;

    
    
    const directoryPath = path.join(__dirname, 'item_assets');
    let fileList = [];

    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach

        /* let fileName = file.substring(0, file.length-4);
        let otherName = fileName.replace(/_/g, " "); */

        for(let i = 0; i < data.length; i++) {
            found = false;
            for(let j = 0; j < files.length; j++) {
                
                let fileName = files[j].substring(0, files[j].length-4);
                let otherName = fileName.replace(/_/g, " ");

                if(fileName == data[i].name || otherName == data[i].name) {
                    found = true;
                }
            }

            if(!found) {
                console.log(data[i].name);
                
            }
        }
        
    });
    

    /* data.forEach((item, index, array) => {
        newlist.push(item);
        count++;

        for (let i = 0; i < array.length; i++) {
            if (array[i].name == item.name) {
                if(array[i].id !== item.id) {
                    console.log(item.name);
                }
            }
        }

        if (count === array.length) {
            console.log('done');
            saveData()

        }
    }) */

    for(let i = 0; i < data.length; i++) {
        
        let currentItem = data[i];
        
        /* for(let j = 0; j < data.length; j++) {

            let makes = data[j].obtainedFrom;
            if(makes) {


                for(let k = 0; k < makes.length; k++) {
                    if(makes[k] == currentItem.name) {
                        makes[k] = currentItem.id;
                    }
                }
            }
        } */


        /* if(currentItem.recipe) {
            for(let j = 0; j < currentItem.recipe.length; j++) {
                currentItem.recipe[j].qty = parseInt(currentItem.recipe[j].qty, 10)
            }
        } */


    }
    /* saveData(data); */

});

/* setTimeout(saveData, 10000) */


function saveData(data) {
    fs.writeFile('./newTrabItems.json', JSON.stringify(data.sort(byID)), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

function byID(a, b) {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
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