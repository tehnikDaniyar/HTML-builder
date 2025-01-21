const fs = require('fs').promises;
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const targetDir = path.join(__dirname, 'files-copy');

copyDir(sourceDir, targetDir);

async function copyDir(source, target) {
   await createDir(target);

   const files = await fs.readdir(source);

   for (const file of files) {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);

      const stats = await fs.stat(sourcePath);

      if (stats.isDirectory()) {
         await copyDirectory(sourcePath, targetPath);
      } else {
         await fs.copyFile(sourcePath, targetPath);
      }
   }
};

async function createDir(dirPath) {
   try {
      await fs.access(dirPath);
   } catch (error) {
      fs.mkdir(dirPath);
   }
}