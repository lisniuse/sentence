'use strict';

module.exports = (options, app) => {
    //获取模版需要的公共数据
    return async function (ctx, next) {
        const config = app.config;
        const locals = ctx.locals; 
        await next();
    };
};
