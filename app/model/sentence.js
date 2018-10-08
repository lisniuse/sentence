'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    /*
    * 句子表
    */
    const SentenceSchema = new Schema({

        english: { type: String }, //英文句子
        chinese: { type: String }, //中文意思

        from: { type: String }, //出处
        
        createTime: { type: Number },
        updateTime: { type: Number }
    });

    SentenceSchema.pre('save', function (next) {
        const now = (new Date()).getTime();

        this.createTime = now;
        this.updateTime = now;
        next();
    });

    SentenceSchema.pre('update', function (next) {
        const now = (new Date()).getTime();
        this.updateTime = now;
        next();
    });

    return mongoose.model('Sentence', SentenceSchema);
};
