const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '/project-dist');

fs.access(dirPath, fs.constants.F_OK, (err) => {
   if (err) {
      createDir();
   };

   bundleHtml();
   bundleCss();


});

function createDir() {
   fs.mkdir(dirPath, (err) => {
      if (err) throw err;
   });
}

function bundleCss() {
   let data1 = '';
   const path1 = path.join(__dirname, 'styles/01-header.css');
   const path2 = path.join(__dirname, 'styles/02-main.css');
   const path3 = path.join(__dirname, 'styles/03-footer.css');

   fs.readFile(path1, 'utf8', (err, data) => {
      if (err) throw err;
      data1 += data;

      fs.readFile(path2, 'utf-8', (err, data) => {
         if (err) throw err;
         data1 += data;

         fs.readFile(path3, 'utf-8', (err, data) => {
            if (err) throw err;
            data1 += data;

            fs.writeFile(path.join(__dirname, 'project-dist/style.css'), data1, (err) => {
               if (err) throw err;
            });

         });
      });
   });
};

function bundleHtml() {
   let templateData = '';
   let templateHeader = '';
   let templateArticles = '';
   let templateFooter = '';

   fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, htmlData) => {
      if (err) throw err;
      templateData += htmlData;
      fs.readFile(
         path.join(__dirname, 'components/articles.html'),
         'utf-8',
         (err, articlesData) => {
            if (err) throw err;
            templateArticles += articlesData;
            fs.readFile(path.join(__dirname, 'components/header.html'), 'utf-8', (err, headerData) => {
               if (err) throw err;
               templateHeader += headerData;
               fs.readFile(path.join(__dirname, 'components/footer.html'), 'utf-8', (err, footerData) => {
                  if (err) throw err;
                  templateFooter += footerData;
                  replaceTemplate();
                  fs.writeFile(
                     path.join(__dirname, 'project-dist/index.html'),
                     templateData,
                     (err) => {
                        if (err) throw err;
                        console.log('complete html bundle');
                     });
               });
            },
            );
         });
   });

   function replaceTemplate() {
      templateData = templateData.replace(/\{\{header\}\}/g, templateHeader);
      templateData = templateData.replace(/\{\{footer\}\}/g, templateFooter);
      templateData = templateData.replace(/\{\{articles\}\}/g, templateArticles);
   };
}
