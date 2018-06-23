const pageTemplates = require('./page.templates.js');
let config = require('../../webpack.config.js');

// Set entry point
config.entry.app = './scripts/main.js';

// Load in page templates
config.plugins.push(...pageTemplates);

module.exports = config;