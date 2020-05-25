const cheerio = require('cheerio');
const fs = require('fs')
const rp = require('request-promise');

const data = fs.readFileSync('furniture.html', 'utf8');

const baseURL = `

https://stardewvalleywiki.com/Furniture

`;

var initialID = 755;

var list = [];


var items = cheerio('td:first-child a', data);




for (const item of Object.keys(items)) {

    if (items[item].type == 'tag') {

        let currentItem = items[item];

        let childrenList =  currentItem.parent.parent.children;


        let price = childrenList[15];

        if(price !== undefined) {
            price = price.attribs.value
        } else {
            price = "NaN"
        }







        let level = childrenList[3]
        level = level.children[0].data
        level = level.substring(0, level.length-1)





        let dmg = childrenList[5]
        dmg = dmg.children[0].data
        dmg = dmg.substring(0, dmg.length-1)


        let crit = childrenList[7]

        crit = crit.children[0].data
        if(crit !== undefined) {
            crit = crit.substring(0, crit.length-1)
/*             console.log(crit);
            console.log('-------------------------------'); */

        } else {
            crit = "NaN"
        }
        
        

        let stats = {
            level: level,
            damage: dmg,
            criticalChance: crit,
            buff: [
                { stat: "Speed", val: "+2" }
            ]
        }





        list.push({
            id: initialID,
            name: currentItem.attribs.title,
            type: "Weapons",
            link: "https://stardewvalleywiki.com" + currentItem.attribs.href,
            sellPrice: sanitizeValue(price),
            stats: stats,
            obtainedFrom: ["Adventurer's Guild (g)"]
        })
        initialID++;
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