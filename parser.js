const fs = require('fs')
const cheerio = require('cheerio');
const data = fs.readFileSync('bundles.html', 'utf8');
const $ = cheerio.load(data)
const request = require('request');

const baseURL = 'https://stardewvalleywiki.com/';
var links = [];

var images = $('#nametemplate img');

for(let i = 0; i < images.length; i++) {
    links.push(
        {
            alt: images[i].attribs.alt,
            url: sanitizeLink(images[i].attribs.srcset)
        }
    );
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

/* console.log(links); */

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

function sanitizeLink(string) {
    string = string.split(',');

    string = string[string.length-1];
    string = string.substring(1, string.length - 3);

    string = 'https://stardewvalleywiki.com' + string;


    return string;
}


links.forEach(function (img) {
    request(img.url).pipe(fs.createWriteStream('./images/' + img.alt));
})

/* console.log(links); */