const fs = require('fs').promises;
const path = require('path');
const dirPath = path.join(__dirname, '/project-dist');
const sourseFiles = path.join(__dirname, 'assets');

bundleProject();

async function createDir(dirPath) {
  try {
    await fs.access(dirPath);
  } catch (error) {
    fs.mkdir(dirPath);
  }
}

async function bundleCss() {
  let data1 = '';
  const path1 = path.join(__dirname, 'styles/01-header.css');
  const path2 = path.join(__dirname, 'styles/02-main.css');
  const path3 = path.join(__dirname, 'styles/03-footer.css');

  data1 += await fs.readFile(path1, 'utf8');
  data1 += await fs.readFile(path2, 'utf8');
  data1 += await fs.readFile(path3, 'utf8');

  await fs.writeFile(path.join(__dirname, 'project-dist/style.css'), data1);
}

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

async function bundleProject() {
  await createDir(dirPath);
  await bundleCss();
  await bundleHtml();
  await copyDirectory(sourseFiles, path.join(__dirname, 'project-dist/assets'));
}

async function copyDirectory(source, target) {
  await createDir(target);

  const files = await fs.readdir(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    const stats = await fs.stat(sourcePath);

    if (stats.isDirectory()) {
      console.log(sourcePath, targetPath);
      await copyDirectory(sourcePath, targetPath);
    } else {
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}
