# The first way to handle multiple plugins
## Project structure
```
my-project/
├── plugins/
│   ├── Hello-World-0/
│   │   ├── src/
│   │   └── ...
│   └── Hello-World-1/
│       ├── src/
│       └── ...
├── node_modules/
├── package.json
├── webpack.config.js
└── ...
```
## Update webpack.config.js
```
const fs = require('fs');
const path = require('path');

const pluginsDir = path.resolve(__dirname, 'plugins');
const pluginFolders = fs.readdirSync(pluginsDir).filter(f => fs.statSync(path.join(pluginsDir, f)).isDirectory());

const entry = pluginFolders.reduce((entries, folder) => {
  entries[folder] = path.resolve(pluginsDir, folder, 'src/entry.ts');
  return entries;
}, {});

const config = {
  entry: entry,
  output: {
    filename: '[name]/bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Rest of the config remains the same
};
```
This script dynamically finds each plugin folder in the plugins directory and creates an entry point for it. The output files are also named according to the plugin folder, keeping builds separated.

## Overview
After running `npm i && npm build` it will create `dist` folder:
```
my-project/
├── dist/
│   ├── Hello-World-0/
│   │   └── bundle.js/
│   └── Hello-World-1/
│       └── bundle.js/
```
And we can connect plugins with url: http://127.0.0.1:8081/Hello-World-N/bundle.js

Well, it works. But I doubt that's what we need.