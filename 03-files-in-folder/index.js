const fs = require("fs").promises;
const path = require("path");
const source = path.join(__dirname, "secret-folder");

readFiles(source);

async function readFiles(source) {
   const files = await fs.readdir(source);

   for (const file of files) {
      const pathFile = path.join(source, file);
      const stat = await fs.stat(pathFile);

      if (stat.isDirectory()) {
         readFiles(pathFile)
      };

      if (stat.isFile()) {
         console.log({
            fileName: file,
            fileSize: stat.size,
            lastEdit: stat.birthtime
         });
      }
   }
};



