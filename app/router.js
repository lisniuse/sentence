'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
    const {
        router,
        controller
    } = app;

    //首页路由
    router.redirect('/index.php', '/index.html', 302);
    router.redirect('/index.asp', '/index.html', 302);

    router.get('/', controller.home.index); //首页
    router.get('/index.html', controller.home.index); //首页

    router.get('/words/:number', controller.words.index); //首页

    //各平台验证路由
    // router.get('/bdunion.txt', controller.veri.bdunion); //百度联盟
    // router.get('/robots.txt', controller.veri.robots); //robots文件
    // router.get('/sogousiteverification.txt', controller.veri.sogou); //sougou 验证文件
    // router.get('/shenma-site-verification.txt', controller.veri.sm); //神马搜索 验证文件
    // router.get('/sitemap.xml', controller.veri.sitemapXml); //sitemapXml文件

    //api
    router.post('/api/v1/category', controller.category.create); //创建分类，内部接口
    router.post('/api/v1/word', controller.word.create); //创建一个单词
    
    // router.post('/api/v1/question', controller.question.create); //添加一个问题
    // router.post('/api/v1/category', controller.category.create); //添加一个分类
    // router.post('/api/v1/answer', controller.answer.create); //添加一个回答
    // router.post('/api/v1/link', controller.link.create); //添加一个回答
};