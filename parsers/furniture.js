const cheerio = require('cheerio');
const fs = require('fs')
const rp = require('request-promise');

const data = fs.readFileSync('furniture.html', 'utf8');

const baseURL = `

https://stardewvalleywiki.com/Furniture

`;

var initialID = 902;

var list = [];


var items = cheerio('td:first-child a', data);




for (const item of Object.keys(items)) {

    if (items[item].type == 'tag') {

        let currentItem = items[item];

        let childrenList =  currentItem.parent.parent.children;

        let price = childrenList[11]
        if(price !== undefined) {
            price = price.attribs.value
        } else {
            price = "NaN"
        }
        

        let healing = childrenList[5]
        let healing1 = healing.children[0].data;
        let healing2 = healing.children[2].data


        healing1 = sanitizeSpaces(healing1)
        healing2 = sanitizeSpaces(healing2)
        
        /* console.log(healing.children[0]);
        console.log('--------------------'); */

        let ingredients = childrenList[3]
        /* console.log(ingredients.children);
        console.log('--------------------'); */

        let recipinha = getIngred(ingredients.children)
        
        


        


        list.push({
            id: initialID,
            name: currentItem.attribs.title,
            type: "Food",
            link: "https://stardewvalleywiki.com" + currentItem.attribs.href,
            sellPrice: sanitizeValue(price),
            healing:{
                energy: healing1,
                health: healing2
            },
            obtainedFrom: ["Cooking","Recipe is learned watching The Queen of Sauce ()"],
            recipe: recipinha
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

function sanitizeSpaces(value) {
    value = value.replace(/ /g, "");
    value = value.replace('\n', "");

    return value
}

function getIngred(node) {

    let arr = []


    node.forEach(element => {
        if(element.children !== undefined) {
            
            arr.push(element.children[0].data)
            
             
        }
    });

    let finalArr = [];

    arr.forEach(element => {
        let name = element.substring(0, element.length-4)

        let count = element.substring(name.length+2, element.length-1)
        
        finalArr.push({
            id: name,
            qty: count
        })

        
        
        
    })

    return finalArr
    
    
    
    
}