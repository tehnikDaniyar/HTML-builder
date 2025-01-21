const fs = require('fs').promises;
const path = require('path');
const sourceCss = path.join(__dirname, 'styles');
const targetCSs = path.join(__dirname, 'project-dist/bundle.css');


bundleCss(sourceCss, targetCSs);

async function bundleCss(source, target) {
   let res = '';
   const files = await fs.readdir(source)

   for (const file of files) {
      const pathFile = path.join(source, file);
      const extName = path.extname(pathFile);

      if (extName === '.css') {
         const data = await fs.readFile(pathFile);
         res += data;
      };
   };

   await fs.writeFile(target, res);
};



