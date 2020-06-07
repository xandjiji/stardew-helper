const fs = require('fs')
const readline = require('readline');

function askQuestion(query) {
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
}))
}

colors = {
    reset:      '\x1b[0m',  // white
    red:       '\x1b[31m', // red
    green:    '\x1b[32m', // green
    yellow:  '\x1b[33m', // yellow
    magenta:     '\x1b[35m', // magenta
    cian: '\x1b[36m', // cian
    gray:    '\x1b[90m'  // gray
}


fs.readFile('./itemsTrab.json', 'utf8', async (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }

    var data = JSON.parse(jsonString)

    let count = 0;


    for(let i = 0; i < data.length; i++) {

        let currentItem = data[i]

        if(currentItem.recipe) {


            for(let j = 0; j < currentItem.recipe.length; j++) {
                

                if(typeof currentItem.recipe[j].id === 'number' && currentItem.recipe[j].id > 688 && currentItem.recipe[j].id < 964) {
                    count++;

                    console.log(`from: ${colors.cian}${currentItem.name}${colors.reset} id: [${colors.yellow}${currentItem.id}${colors.reset}]`);
                    
                    let foundItemId = currentItem.recipe[j].id;

                    
                    let foundItem = getByIndex(foundItemId, data);
                    let nextItem = getByIndex(foundItemId+1, data);
                    
                    console.log(`    ${colors.magenta}${foundItem.name}${colors.reset} id [${colors.red}${foundItem.id}${colors.reset}] -> ${colors.magenta}${nextItem.name}${colors.reset} id [${colors.green}${nextItem.id}${colors.reset}]`);






                    data[i].recipe[j].id = data[i].recipe[j].id + 1;
                    /* console.log(data[i].recipe[j].id); */
                    
                    
                    
                }
                
            }
        }
        
    }

    console.log(`TOTAL: ${count}`);
    
    saveData(data);
    
    

});

function saveData(data) {
    fs.writeFile('./newTrabItems.json', JSON.stringify(data), err => {
        if (err) {
            /* console.log('Error writing file', err) */
        } else {
            /* console.log('Successfully wrote file') */
        }
    })
}


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

