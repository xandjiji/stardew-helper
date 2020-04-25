const fs = require('fs');

let rawdata = fs.readFileSync('./src/rooms.json');
let rooms = JSON.parse(rawdata);

roomsArray = rooms.rooms;

var currentId = 0;

for(let i = 0; i < roomsArray.length; i++) {
    let currentBundles = roomsArray[i].bundles;

    for(let j = 0; j < currentBundles.length; j++) {
        let currentItems = currentBundles[j].items;

        for(let k = 0; k < currentItems.length; k++) {
            
            let item = currentItems[k];
            item['id'] = currentId;

            currentId++;            
        }
    }
    
}



fs.writeFile('./newRooms.json', JSON.stringify(roomsArray), err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
