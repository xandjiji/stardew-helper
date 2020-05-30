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
        
        let currentItem = data[i];

        for(let j = 0; j < data.length; j++) {
            
            const { id, name } = currentItem;

            if(name == '??Foroguemon??') { continue }
            if(name == '??HMTGF??') { continue }
            if(name == '??Pinky Lemon??') { continue }

            let regTest = new RegExp(` ${name} `, 'gi');
            

            let currentCheck = data[j];

            

            if(currentCheck.obtainedFrom) {

                for(let k = 0; k < currentCheck.obtainedFrom.length; k++) {

                    let item = currentCheck.obtainedFrom[k];
                    
                    if(typeof item === 'string'|| item instanceof String) {

                        if(regTest.test(item)) {

                            console.clear();
                            
                            let newString = item.replace(regTest, ` ${colors.green}&${name}~${colors.reset} `);
                            let oldString = data[j].obtainedFrom[k];
    
                            console.log(`${count} of 352`);
                            console.log('');
                            
                            console.log(`Do you want to replace: ${colors.yellow}${name}${colors.reset} (item ID: ${colors.cian}${id}${colors.reset})`);
                            console.log(oldString + ` (in ID: ${colors.cian}${currentCheck.id}${colors.reset})`);
                            console.log('With:');
                            console.log(newString);
    
                            console.log('');console.log('');
                            let ans = await askQuestion("YES (enter) or NO (z)?")
                            
                            if(ans !== 'z') {
                                data[j].obtainedFrom[k] = '@' + item.replace(regTest, ` &${id}~ `); 
                            }
                            count++;
                            saveData(data);
                        }
                        
                    }
                    
                }
            }
        }
    }
    
    saveData(data);
    
    

});

function saveData(data) {
    fs.writeFile('./newTrabItems.json', JSON.stringify(data.sort(byID)), err => {
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