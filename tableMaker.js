const fs = require('fs')
const rp = require('request-promise');
const cheerio = require('cheerio');
const path = require('path');

newlist = []

fs.readFile('./jsons/_CROPS.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var data = JSON.parse(jsonString)

    /* REMOVE */
    let pickList = [216,220,228,234,240,222,226,224,238,246,198,232,236,230,248,244,242,292,294];
    data = cherryPickTable(pickList, data);
    /* REMOVE */


    /* REMOVING SEEDS */
    /* for(let i = 0; i < data.length; i++) {
        let currentName = data[i].name;
        
        let seedsReg = 'Seeds';
        seedsReg = new RegExp('\\b' + seedsReg + '\\b');

        let seedReg = 'Seed';
        seedReg = new RegExp('\\b' + seedReg + '\\b');

        let saplingReg = 'Sapling';
        saplingReg = new RegExp('\\b' + saplingReg + '\\b');


        let result = (seedsReg.test(currentName) || saplingReg.test(currentName));

        result = (seedReg.test(currentName) || result);

        if(result) {
            data.splice(i, 1);            
        }

    } */
    

    data = data.sort(byProfit);

    let tableArray = [];
    for(let i = 0; i < data.length; i++) {
        tableArray.push(data[i].id);
    }
    console.log(JSON.stringify(tableArray));
    

});


function byName(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
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

function byProfit(a, b) {
    let aProfit = a.profitability;
    let bProfit = b.profitability;

    aProfit = parseFloat(aProfit);
    bProfit = parseFloat(bProfit);

    if(isNaN(aProfit)) {
        console.log(`NAN DETECTED (${a.name})`);
    }

    if(isNaN(bProfit)) {
        console.log(`NAN DETECTED (${b.name})`);
    }

    if (aProfit < bProfit) {
        return -1;
    }
    if (aProfit > bProfit) {
        return 1;
    }
    return 0;
}

function cherryPickTable(pickedArray, fromArray) {
    
    let newArray = [];

    for(let i = 0; i < pickedArray.length; i++) {
        let pickedIndex = pickedArray[i];
        
        
        newArray.push(getByIndex(pickedIndex, fromArray));
    }
    

    return newArray;
}

function getByIndex(index, fromArray) {
    
    for(let i = 0; i < fromArray.length; i++) {
        if(fromArray[i].id == index) {
            
            return fromArray[i];
        }
    }
}