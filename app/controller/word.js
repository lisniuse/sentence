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

        let wordRes = await service.word.findOne({
            english: word.english
        });

        if ( wordRes ) {
            return ctx.helper.throwError(ctx, "单词已经存在", 1);
        }

        //创建单词
        wordRes = await service.word.create(word);

        //如果单词添加成功
        if ( wordRes._id ) {
            // 设置响应体和状态码
            ctx.body = {
                code: 0,
                msg: '单词创建成功',
                data: categoryRes
            };
        } else {
            return ctx.helper.throwError(ctx, "单词创建失败")
        }
        ctx.status = 200;
    }
}

module.exports = WordController;