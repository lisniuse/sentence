'use strict';

const Controller = require('egg').Controller;

class WordController extends Controller {
    async index() {
        const { ctx, service, config } = this;
        ctx.body = "hi";
    }

    async addQuestion () {
        const { ctx, service, config } = this;
        await ctx.render('/pages/addQuestion');
    }

    async addCategory () {
        const { ctx, service, config } = this;
        await ctx.render('/pages/addCategory');  
    }

    async addAnswer() {
        const { ctx, service, config } = this;
        await ctx.render('/pages/addAnswer');  
    }

    async addLink() {
        const { ctx, service, config } = this;
        await ctx.render('/pages/addLink');  
    }
}

module.exports = WordController;