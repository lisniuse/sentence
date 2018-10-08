'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {

    async index() {
        ctx.body = "hi!";
    }

    //获取分类列表
    async list() {
        const { ctx, service, config } = this;
        let res = await ctx.service.category.find({});

        // 设置响应体和状态码
        ctx.body = {
            code: 0,
            msg: '查询成功',
            data: res
        };
    }
    
    //内部接口 创建分类
    async create() {
        const { ctx, service, config } = this;
        if ( ctx.app.config.env !== "local" ) {
            error(ctx, "没有操作权限");
        }

        const category = ctx.request.body;

        let categoryRes = await service.category.getCategoryByName(category.name);
        if ( categoryRes ) {
            return ctx.helper.throwError(ctx, "分类已经存在", 1);
        }

        //创建分类
        categoryRes = await ctx.service.category.create(category);

        //如果问题添加成功
        if ( categoryRes._id ) {
            // 设置响应体和状态码
            ctx.body = {
                code: 0,
                msg: '分类创建成功',
                data: categoryRes
            };
        } else {
            return ctx.helper.throwError(ctx, "分类创建失败")
        }
        
        ctx.status = 200;
    }
}

module.exports = CategoryController;