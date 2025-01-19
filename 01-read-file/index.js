const fs = require('fs');
const path = require('path');

const absolutePath = path.join(__dirname, 'text.txt');

fs.readFile(absolutePath, (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
