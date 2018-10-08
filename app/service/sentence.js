'use strict';

const Service = require('egg').Service;

class SentenceService extends Service {

    /*
     * 新建句子
     */
    async create(answerObj) {
        const answer = new this.ctx.model.Sentence();
        for (const key in answerObj) {
            answer[key] = answerObj[key];
        }
        return answer.save();
    }

    /*
     * 根据关键字，获取一组句子
     * Callback:
     * - err, 数据库异常ß
     * - answers, 句子列表
     * @param {String} query 关键字
     * @param {Object} opt 选项
     * @return {Promise[answers]} 承载句子列表的 Promise 对象
     */
    async getSentencesByQuery(query, opt) {
        return this.ctx.model.Sentence.find(query, '', opt).exec();
    }

    /**
     * 查询句子
     */
    async find(query) {
        return this.ctx.model.Sentence.find(query)
        .populate('questionId')
        .exec();
    }

    /**
     * 搜索句子
     */
    async search(query, pageNum = 0, pageSize = 10) {
        return this.ctx.model.Sentence.find(query)
        .populate('questionId')
        .populate('categoryId')
        .sort({'createTime':-1})
        .skip(pageNum * pageSize)
        .limit(pageSize)
        .exec();
    }

    /***
     *  查找最最新的制定数量的句子
     */
    async findByNum(pageSize) {
        let pageNum = 0;
        return this.ctx.model.Sentence.find({})
        .populate('questionId')
        .sort({'createTime':-1})
        .skip(pageNum * pageSize)
        .limit(pageSize)
        .exec();
    }

    /**
     * 查找一个句子
     */
    async findOne(query) {
        return this.ctx.model.Sentence.findOne(query)
        .populate('questionId')
        exec();
    }

    /*
     * 根据句子Id查找句子
     * @param {Object} obj
     */
    async getSentenceById(answerId) {
        return this.ctx.model.Sentence.findById(answerId)
        .populate('questionId')
        .exec();
    }


    /**
     * 更新句子信息
     */
    async update(answerId, updateInfo) {
        if (!answerId) {
            return;
        }
        const query = { _id: answerId };
        const update = updateInfo;
        return this.ctx.model.Sentence.update(query, update).exec();
    }

    /**
     * 通过句子Id删除句子
     */
    async remove(answerId) {
        return this.ctx.model.Sentence.findOneAndRemove({
            _id: answerId
        }).exec();
    }

    /**
     * 统计
     */
    async count(query) {
        return this.ctx.model.Sentence.count(query).exec();
    }
}

module.exports = SentenceService;
