const fs = require('fs');
const path = require('path');

const absolutePath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(absolutePath, { encoding: "utf-8" });

readStream.on('data', (chunk) => {
   console.log(chunk);
});



// fs.readFile(absolutePath, (err, data) => {
//    if (err) throw err;
//    console.log(data.toString());
// });


