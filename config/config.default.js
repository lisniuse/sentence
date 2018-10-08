'use strict';

const path = require('path');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1532073849273_2285';

    config.password = "bba76d0c6606b500";

    config.security = {
        csrf: {
            ignore: '/api/*',
        },
    };

    config.view = {
        defaultViewEngine: 'ejs',
        mapping: {
            '.html': 'ejs',
        },
    };

    config.mongoose = {
        url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/sentence',
        options: {
            poolSize: 20,
        },
    };

    // add your config here
    config.middleware = [
        'common'
    ];

    //404 page
    config.notfound = {
        pageUrl: '/view/404.html',
    };
    
    //站点信息
    config.Site = function() {
        return {
            title: "句悦网 - 毫无保留的免费英语词汇表",
            description: "免费在线提供所有阶段的备考参考词汇表，并且提供翻译、例句和发音，方便进行单词背诵，可自由进行切换预览且支持手机电脑预览。",
            keywords: "英语词汇大全,英语四级词汇表,考研英语词汇表,英语六级词汇表,小学英语词汇表,雅思词汇表"
        }
    }
    
    return config;
};