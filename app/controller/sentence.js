'use strict';

/*
* sentence api
*/
const Controller = require('egg').Controller;

class SentenceController extends Controller {
    async index() {
        const { ctx, service, config } = this;
        ctx.body = "hi";
    }

    async create() {
        const { ctx, service, config } = this;
        if ( ctx.app.config.env !== "local" ) {
            error(ctx, "没有操作权限");
        }

        const sentence = ctx.request.body;

        //查找句子是否已经存在
        let sentenceRes = await service.sentence.findOne({
            english: sentence.english
        });

        if ( sentenceRes ) {
            // 设置响应体和状态码
            ctx.body = {
                code: 0,
                msg: '句子已经存在',
                data: sentenceRes
            };
            return;
        }

        let createSentenceRes = await service.sentence.create(sentence);

        //如果句子添加成功
        if ( createSentenceRes._id ) {
            // 设置响应体和状态码
            ctx.body = {
                code: 0,
                msg: '句子创建成功',
                data: createSentenceRes
            };
        } else {
            return ctx.helper.throwError(ctx, "句子创建失败")
        }
        ctx.status = 200;
    }
}

module.exports = SentenceController;