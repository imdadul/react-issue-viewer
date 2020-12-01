const process = require('process');

const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
    module.exports = require('./webpack.prod.js');
} else {
    console.log('')
    module.exports = require('./webpack.dev.js');
}
