const cheerio = require('cheerio');
const fs = require('fs')
const rp = require('request-promise');

const data = fs.readFileSync('furniture.html', 'utf8');

const baseURL = `

https://stardewvalleywiki.com/Furniture

`;

var initialID = 723;

var list = [];


var items = cheerio('a', data);




for (const item of Object.keys(items)) {

    if (items[item].type == 'tag') {

        /* if(items[item].attribs.class !== 'image') {
            list.push(furnitureFactory(items[item]));
        } */

        if(items[item].attribs.class !== 'image') {
            list.push(items[item].attribs.title)
        }
    
        


        

        
    }
}

/* console.log(list); */

console.log(JSON.stringify(list));


function furnitureFactory(node) {

    const { title, href } = node.attribs;

    let test = node.parent.parent.children[3];

    /* console.log(test);
    console.log('---------------------------------------'); */
    
    

    if(test) {
        test = test.attribs.value;
    } else {
        test = 'NaN';
    }

    let obj = {
        id: initialID,
        name: title,
        type: "Mineral",
        link: `https://stardewvalleywiki.com${href}`,
        obtainedFrom: [
            `Purchased from Marnie's Ranch (${sanitizeValue(test)}g)`
        ],
        makes: [

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