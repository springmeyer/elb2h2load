const es = require('event-stream');
const fs = require('fs');
const url = require('url');

const file_input = process.argv[2];
if (!fs.existsSync(file_input)) {
  console.error('please provide a path to a input logfile');
  process.exit(-1);
}

var s = fs.createReadStream(file_input);

s.pipe(es.split())
    .pipe(es.mapSync(function(line){
        // strip off the RS (0x1e, record separator) per RFC8142
        var data = line.slice(1);
        // remove zero-width spaces
        data = data.replace(/\u200B/g,' ');
        if (data) {
            // extra uri out of elb log format
            var uri = data.substr(data.indexOf('GET')+3).trim().split(' ')[0];
            var path = url.parse(uri).path;
            console.log(path);
        }
    })
    .on('error', function(err){
        console.log('Error while reading file.', err);
        process.exit(-1)
    })
);
