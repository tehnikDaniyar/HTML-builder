const fs = require('fs').promises;
const path = require('path');

bundleCss();


async function bundleCss() {
   let data1 = '';
   const path1 = path.join(__dirname, 'styles/style-1.css');
   const path2 = path.join(__dirname, 'styles/style-2.css');
   const path3 = path.join(__dirname, 'styles/style-3.css');

   data1 += await fs.readFile(path1, 'utf8');
   data1 += await fs.readFile(path2, 'utf8');
   data1 += await fs.readFile(path3, 'utf8');

   await fs.writeFile(path.join(__dirname, 'project-dist/bundle.css'), data1);
}