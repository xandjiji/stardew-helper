const fs = require('fs');
const request = require('request');

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


var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);
  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };