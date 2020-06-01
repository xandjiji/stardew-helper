const fs = require('fs')
const cheerio = require('cheerio');
const data = fs.readFileSync('bundles.html', 'utf8');
const $ = cheerio.load(data)
const request = require('request');

const baseURL = 'https://stardewvalleywiki.com/';
var links = [];

var images = $('td:first-child img');

for(let i = 0; i < images.length; i++) {
    if(images[i].attribs.alt !== 'Gold.png') {
        links.push(
            {
                alt: images[i].attribs.alt,
                url: sanitizeLink(images[i].attribs.src)
            }
        );
    }
}

images = $('#qualityimage > img');

for(let i = 0; i < images.length; i++) {
        links.push(
            {
                alt: images[i].attribs.alt,
                url: sanitizeLink(images[i].attribs.srcset)
            }        
        );

}

console.log(links);

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

function sanitizeLink(string) {

    if(string) {
    
    /* string = string.split(',');

    string = string[string.length-1];
    string = string.substring(1, string.length - 3);

    string = 'https://stardewvalleywiki.com' + string; */


        return "https://stardewvalleywiki.com" + string;
    } else {
        return 'ERROOOOOOOOOOOOO';
    }
}


links.forEach(function (img) {
    if(img.url == 'ERROOOOOOOOOOOOO') {
        console.log(img);
    } else {
        request(img.url).pipe(fs.createWriteStream('./minerals/' + img.alt));
    }
})

/* console.log(links); */