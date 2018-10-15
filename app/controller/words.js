'use strict';

/**
 * 
 * words页面
 */
const Controller = require('egg').Controller;

class WordsController extends Controller {

    async index() {
        const { ctx, service, config } = this;
        const number = String(ctx.params.number).replace(".html", "");

        let categoryRes = await service.category.findOne({
            number: number
        });

        console.log(categoryRes);

        let wordsRes = await service.word.find({
            categoryIds: [ categoryRes._id ]
        });
    
        console.log(wordsRes);

        let data = {
            number: ctx.params.number,
            category: categoryRes,
            words: wordsRes
        };

        await ctx.render('/pages/words', data);
    }
}

module.exports = WordsController;