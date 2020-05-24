const cheerio = require('cheerio');
const fs = require('fs')
const rp = require('request-promise');

const data = fs.readFileSync('furniture.html', 'utf8');

const baseURL = `

https://stardewvalleywiki.com/Furniture

`;

var initialID = 571;

var list = [];


var items = cheerio('a', data);




for (const item of Object.keys(items)) {

    if (items[item].type == 'tag') {

        list.push(furnitureFactory(items[item]));

        
    }
}

/* console.log(list); */

console.log(JSON.stringify(list));


function furnitureFactory(node) {

    const { title, href } = node.attribs;

    const { value } = node.parent.parent.parent.children[3].attribs;
    
    
    

    let obj = {
        id: initialID,
        name: title,
        type: "Furniture",
        link: `https://stardewvalleywiki.com${href}`,
        obtainedFrom: [
            
        ]

    }

    initialID++;
    

    return obj;
}

function sanitizeValue(value) {
    
    let intVal = parseInt(value);

    return numberWithCommas(intVal);
    
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}