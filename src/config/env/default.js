'use strict';

module.exports = {
    app: {
    title: 'Food-Faster',
    description: 'Fast Managment',
    keywords: 'node'
    },
    port: process.env.PORT || 3000,
    db: {
        uri: 'mongodb://localhost',
        options: {
            user: '',
            password: ''
        }
    },
    templateEngine: 'swig'
};
