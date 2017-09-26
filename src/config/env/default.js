'use strict';

const { app } = require('electron');

module.exports = {
    app: {
    title: 'Food-Faster',
    description: 'Fast Managment',
    keywords: 'node'
    },
    port: process.env.PORT || 3000,
    db: {
        path: 'db',
        location: app.getAppPath() + '/' + this.path,
        uri: 'mongodb://localhost',
        options: {
            user: '',
            password: ''
        }
    },
    templateEngine: 'swig'
};
