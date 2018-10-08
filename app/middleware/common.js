'use strict';

module.exports = (options, app) => {
    //获取模版需要的公共数据
    return async function (ctx, next) {
        const config = app.config;
        const service = ctx.service;
        const categories = await service.category.find({});
        let locals = ctx.locals;
        locals.site = config.Site();
        locals.categories = categories;
        await next();
    };
};
