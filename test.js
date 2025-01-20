const templateData = 'This is {{header}}, and this is another {{header}}.';
const templateHeader = 'Header Text';

const result = templateData.replace(/\{\{header\}\}/g, templateHeader);

console.log(result);
