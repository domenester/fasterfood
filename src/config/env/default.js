'use strict';

const { app } = require('electron');
const path = 'db';
module.exports = {
    app: {
        title: 'Food-Faster',
        description: 'Fast Managment',
        keywords: 'node'
    },
    port: process.env.PORT || 3001,
    db: {
        connectionPath: app.getPath('userData'),
        path: path,
        location: app.getPath('userData') + '/' + path,
        uri: 'mongodb://localhost',
        options: {
            user: '',
            password: ''
        }
    },
    templateEngine: 'swig'
};
