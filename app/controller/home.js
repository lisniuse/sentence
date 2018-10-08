'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx, service, config } = this;
        const categories = await service.category.find({});
        
        let data = {
            site: config.Site(),
            categories: categories
        }
        
        await ctx.render('/pages/index', data);
    }
}

module.exports = HomeController;