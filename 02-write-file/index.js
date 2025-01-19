const { stdin } = process;
const fs = require('fs');
const path = require('path');
const absolutePath = path.join(__dirname, 'text.txt');

console.log('HELLO DEVOLOPMER!!!!');

stdin.on('data', (data) => {
  fs.appendFile(absolutePath, data.toString(), (err) => {
    if (err) throw err;
  });
});

process.on('SIGINT', () => {
  console.log('BY BY go slip my litle devoloper');
  process.exit();
});
