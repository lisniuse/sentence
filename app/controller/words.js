'use strict';

/**
 * 
 * words页面
 */
const Controller = require('egg').Controller;

class WordsController extends Controller {

    async index() {
        const { ctx, service, config } = this;

        let data = {
        }

        await ctx.render('/pages/words', data);
    }
}

module.exports = WordsController;