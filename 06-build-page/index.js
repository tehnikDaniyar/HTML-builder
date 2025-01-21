const fs = require('fs').promises;
const path = require('path');
const targetFolder = path.join(__dirname, '/project-dist');
const sourseFiles = path.join(__dirname, 'assets');
const sourceCss = path.join(__dirname, 'styles');
const targetCss = path.join(targetFolder, 'style.css');

bundleProject();

async function createDir(dirPath) {
   try {
      await fs.access(dirPath);
      await fs.rm(dirPath, { recursive: true });
      fs.mkdir(dirPath);
   } catch (error) {
      fs.mkdir(dirPath);
   }
}

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

async function bundleHtml() {
   let templateData = '';
   let templateHeader = '';
   let templateArticles = '';
   let templateFooter = '';

   templateData += await fs.readFile(
      path.join(__dirname, 'template.html'),
      'utf-8',
   );
   templateHeader += await fs.readFile(
      path.join(__dirname, 'components/header.html'),
      'utf-8',
   );
   templateArticles += await fs.readFile(
      path.join(__dirname, 'components/articles.html'),
      'utf-8',
   );
   templateFooter += await fs.readFile(
      path.join(__dirname, 'components/footer.html'),
      'utf-8',
   );

   replaceTemplate();

   await fs.writeFile(
      path.join(__dirname, 'project-dist/index.html'),
      templateData,
   );

   function replaceTemplate() {
      templateData = templateData.replace(/\{\{header\}\}/g, templateHeader);
      templateData = templateData.replace(/\{\{footer\}\}/g, templateFooter);
      templateData = templateData.replace(/\{\{articles\}\}/g, templateArticles);
   }
}


async function copyDir(source, target) {
   await createDir(target);

   const files = await fs.readdir(source);

   for (const file of files) {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);

      const stats = await fs.stat(sourcePath);

      if (stats.isDirectory()) {
         await copyDir(sourcePath, targetPath);
      } else {
         await fs.copyFile(sourcePath, targetPath);
      }
   }
};


async function bundleProject() {
   await createDir(targetFolder);
   await bundleCss(sourceCss, targetCss);
   await bundleHtml();
   await copyDir(sourseFiles, path.join(__dirname, 'project-dist/assets'));
}
