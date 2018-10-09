'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    /*
    * 单词表
    */
    const WordSchema = new Schema({
        categoryIds: { type: Array }, //所属种类ID

        english: { type: String }, //英文词
        chinese: { type: String }, //中文词义
        pos: { type: String }, //词性
        phoneticSymbol: { type: String }, //音标 

        sentenceId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Sentence' }, //简单例句
        sentenceIds: { type: Array }, //所有例句
        
        createTime: { type: Number },
        updateTime: { type: Number }
    });

    WordSchema.pre('save', function (next) {
        const now = new Date().getTime();

        this.createTime = now;
        this.updateTime = now;
        next();
    });

    WordSchema.pre('update', function (next) {
        const now = new Date().getTime();
        this.updateTime = now;
        next();
    });

    return mongoose.model('Word', WordSchema);
};
