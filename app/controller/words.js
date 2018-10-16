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

        let wordsRes = await service.word.find({
            categoryIds: [ categoryRes._id ]
        });
        
        let newWords = [];
        for (let i = 0; i < wordsRes.length; i++) {
            let word = wordsRes[i];
            let sentences = [];
            for (let index = 0; index < word.sentenceIds.length; index++) {
                let id = word.sentenceIds[index];
                let sentence = await service.sentence.findOne({_id: id});
                sentences.push(sentence);
            }
            newWords.push({
                english: word.english,
                chinese: word.chinese,
                sentence: word.sentenceId,
                sentences: sentences
            });
        }
        
        let data = {
            number: ctx.params.number,
            category: categoryRes,
            words: newWords
        };

        await ctx.render('/pages/words', data);
    }
}

module.exports = WordsController;