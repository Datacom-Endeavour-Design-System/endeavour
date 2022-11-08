const fs = require('fs');
const replace = require('replace-in-file');

// cloudflare pages doesn't like node_modules and @ characters
fs.renameSync(
  './storybook-static/sb-addons/node_modules/@storybook',
  './storybook-static/sb-addons/storybook'
);
// fix references to the moved files
replace.sync({
  files: './storybook-static/*',
  from: /node_modules\/%40storybook/g,
  to: 'storybook',
});
