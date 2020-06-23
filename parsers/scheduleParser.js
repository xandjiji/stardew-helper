let str = `
    spring_9: "610 Beach 38 36 2 dick_fish/850 FishShop 5 4 2 \"Strings\\schedules\\Willy:spring_9.000\"/1010 Hospital 12 14 0 \"Strings\\schedules\\Willy:spring_9.001\"/1330 Hospital 4 6 1 \"Strings\\schedules\\Willy:spring_9.002\"/1600 Saloon 17 22 2 \"Strings\\schedules\\Willy:spring_9.003\"/2320 FishShop 4 4 2" #!String
    rain: "610 Beach 38 36 2 dick_fish/850 FishShop 5 4 2/1700 Saloon 17 22 2 \"Strings\\schedules\\Willy:winter.000\"/2320 FishShop 4 4 2" #!String
    winter_15: "1630 Saloon 17 22 2 \"Strings\\schedules\\Willy:winter_15.000\"/2420 FishShop 4 4 2" #!String
    winter_16: "1630 Saloon 17 22 2 \"Strings\\schedules\\Willy:winter_16.000\"/2420 FishShop 4 4 2" #!String
    winter_17: "1630 Saloon 17 22 2 \"Strings\\schedules\\Willy:winter_17.000\"/2420 FishShop 4 4 2" #!String
    Winter: "610 Beach 38 36 2 dick_fish/850 FishShop 5 4 2/1700 Saloon 17 22 2 \"Strings\\schedules\\Willy:winter.000\"/2320 FishShop 4 4 2" #!String
    Sat: "610 Forest 91 40 2 dick_fish/1400 Town 59 100 2 dick_fish/1900 Saloon 17 22 2 \"Strings\\schedules\\Willy:Sat.000\"/2300 FishShop 5 4 2" #!String
    Fri: "610 Beach 38 36 2 dick_fish/850 FishShop 5 4 2/1700 Saloon 17 22 2 \"Strings\\schedules\\Willy:Fri.000\"/2320 FishShop 4 4 2" #!String
    Spring: "610 Beach 38 36 2 dick_fish/850 FishShop 5 4 2/1700 Beach 25 36 2 dick_fish/2200 FishShop 4 4 2" #!String
`

strArrayI = str.split('    ')

strArrayI.shift();

/* console.log(strArrayI); */

let asdArray = [];
for(let j = 0; j < strArrayI.length; j++) {
    let current_item = strArrayI[j];

    let asssd = current_item.split(':');    
    

    asdArray.push(
        {
            conditions: [{weekday: asssd[0]}],
            schedule: toObj(current_item)
        }
    )
}

console.log(JSON.stringify(asdArray));


function toObj(str) {
    let strArray = str.split(' ');
    strArray.shift();
    str = strArray.join(' ');

    strArray = str.split('/');


    var finalArray = [];

    for(let i = 0; i < strArray.length; i++) {
        let path = strArray[i];


        let pathArr = path.split(' ');

        finalArray.push(
            {
                time: pathArr[0].replace('"', ''),
                location: `${pathArr[1]} ${pathArr[2]} ${pathArr[3]}`
            }
        );
    }

    return finalArray
}


/* let strArray = str.split(' ');
strArray.shift();
str = strArray.join(' ');

strArray = str.split('/');


var finalArray = [];

for(let i = 0; i < strArray.length; i++) {
    let path = strArray[i];

    
    let pathArr = path.split(' ');

    finalArray.push(
        {
            time: pathArr[0].replace('"', ''),
            location: `${pathArr[1]} ${pathArr[2]} ${pathArr[3]}`
        }
    );
    


}

console.log(JSON.stringify(finalArray));
 */