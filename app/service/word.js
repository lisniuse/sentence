'use strict';

const Service = require('egg').Service;

class WordService extends Service {

    /*
     * 新建单词
     */
    async create(answerObj) {
        const answer = new this.ctx.model.Word();
        for (const key in answerObj) {
            answer[key] = answerObj[key];
        }
        return answer.save();
    }

    /*
     * 根据关键字，获取一组单词
     * Callback:
     * - err, 数据库异常ß
     * - answers, 单词列表
     * @param {String} query 关键字
     * @param {Object} opt 选项
     * @return {Promise[answers]} 承载单词列表的 Promise 对象
     */
    async getWordsByQuery(query, opt) {
        return this.ctx.model.Word.find(query, '', opt).exec();
    }

    /**
     * 查询单词
     */
    async find(query) {
        return this.ctx.model.Word.find(query)
        .populate('questionId')
        .exec();
    }

    /**
     * 搜索单词
     */
    async search(query, pageNum = 0, pageSize = 10) {
        return this.ctx.model.Word.find(query)
        .populate('questionId')
        .populate('categoryId')
        .sort({'createTime':-1})
        .skip(pageNum * pageSize)
        .limit(pageSize)
        .exec();
    }

    /***
     *  查找最最新的制定数量的单词
     */
    async findByNum(pageSize) {
        let pageNum = 0;
        return this.ctx.model.Word.find({})
        .populate('questionId')
        .sort({'createTime':-1})
        .skip(pageNum * pageSize)
        .limit(pageSize)
        .exec();
    }

    /**
     * 查找一个单词
     */
    async findOne(query) {
        return this.ctx.model.Word.findOne(query)
        .populate('questionId')
        exec();
    }

    /*
     * 根据单词Id查找单词
     * @param {Object} obj
     */
    async getWordById(answerId) {
        return this.ctx.model.Word.findById(answerId)
        .populate('questionId')
        .exec();
    }


    /**
     * 更新单词信息
     */
    async update(answerId, updateInfo) {
        if (!answerId) {
            return;
        }
        const query = { _id: answerId };
        const update = updateInfo;
        return this.ctx.model.Word.update(query, update).exec();
    }

    /**
     * 通过单词Id删除单词
     */
    async remove(answerId) {
        return this.ctx.model.Word.findOneAndRemove({
            _id: answerId
        }).exec();
    }

    /**
     * 统计
     */
    async count(query) {
        return this.ctx.model.Word.count(query).exec();
    }
}

module.exports = WordService;
