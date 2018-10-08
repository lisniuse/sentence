'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    /*
    * 词汇种类表
    */
    const CategorySchema = new Schema({

        name: { type: String }, //名称
        alias: { type: String }, //英文别名
        number: { type: String }, //编号

        createTime: { type: Number },
        updateTime: { type: Number }
    });

    CategorySchema.pre('save', function (next) {
        const now = (new Date()).getTime();

        this.createTime = now;
        this.updateTime = now;
        next();
    });

    CategorySchema.pre('update', function (next) {
        const now = (new Date()).getTime();
        this.updateTime = now;
        next();
    });

    return mongoose.model('Category', CategorySchema);
};
