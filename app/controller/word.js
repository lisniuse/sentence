'use strict';

/*
* word api
*/
const Controller = require('egg').Controller;

class WordController extends Controller {
    async index() {
        const { ctx, service, config } = this;
        ctx.body = "hi";
    }

    async create() {
        const { ctx, service, config } = this;
        if ( ctx.app.config.env !== "local" ) {
            error(ctx, "没有操作权限");
        }
        const word = ctx.request.body;
        
        //把category给查询出来
        let categoryRes = "";
        //如果传入的是categoryNumber。
        if ( word.categoryNumber ) {
            categoryRes = await service.category.findOne({
                number: word.categoryNumber
            });
        //如果传入的是categoryId。
        } else if ( word.categoryId ) {
            categoryRes = await service.category.findOne({
                _id: word.categoryId
            });
        }

        if ( !categoryRes ) {
            return ctx.helper.throwError(ctx, "没有找到单词分类", 1);
        }

        //查找带分类单词是否已经存在
        let cwordRes = await service.word.findOne({
            $and: [
                {
                    english: word.english
                },
                {
                    categoryIds: categoryRes._id
                }
            ]
        });

        //单纯查找单词是否存在
        let wordRes = await service.word.findOne({
            english: word.english
        });

        if ( wordRes && cwordRes ) {
            return ctx.helper.throwError(ctx, "单词已经存在", 1);
        }

        //如果没有这种分类的词，就更新单词，增加它的分类
        let updateWordRes = "";
        let createWordRes = "";
        if ( wordRes && !cwordRes ) {
            updateWordRes = await service.word.update(wordRes._id, {
                $push: {
                    categoryIds: categoryRes._id
                }
            });
        } else if ( !wordRes && !cwordRes ) { //如果完全没有找到这个单词，就创建新的。
            //创建单词
            let _word = {
                categoryIds: [ categoryRes._id ],
                english: word.english,
                chinese: word.chinese,
                sentenceId: word.sentenceId,
                sentenceIds: word.sentenceIds,
            }
            createWordRes = await service.word.create(_word);
        }

        //如果单词添加成功
        if ( createWordRes._id ) {
            // 设置响应体和状态码
            ctx.body = {
                code: 0,
                msg: '单词创建成功',
                data: createWordRes
            };
        } else if ( updateWordRes._id ) {
            // 设置响应体和状态码
            ctx.body = {
                code: 0,
                msg: '单词更新成功',
                data: updateWordRes
            };
        } else {
            return ctx.helper.throwError(ctx, "创建或更新单词失败")
        }
        ctx.status = 200;
    }
}

module.exports = WordController;