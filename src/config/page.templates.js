const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = [
    // Home
    {
        title: 'Portfolio | Monty Chanthapanya',
        meta: '',
        template: 'templates/pages/index.ejs',
        filename: 'index.html',
        canonical: '',
        inject: 'body',
        data: ''
    }
];

const pageTemplates = pages.map(page => new HtmlWebpackPlugin(page));

module.exports = pageTemplates;
