const Reqman = require('reqman');
const marked = require('marked');

//添加问题
const req = new Reqman({
    baseUrl: "http://127.0.0.1:7004/"
});

const categories = [{
    name: "高考大纲词汇表", //名称
    alias: "gaokao", //英文别名
    number: "1001", //编号
}, {
    name: "大学四级词汇表", //名称
    alias: "cet4", //英文别名
    number: "1002", //编号
}, {
    name: "大学六级词汇表", //名称
    alias: "cet6", //英文别名
    number: "1003", //编号
}, {
    name: "考研英语词汇表", //名称
    alias: "ge", //英文别名
    number: "1006", //编号
}, {
    name: "成人学位英语词汇表", //名称
    alias: "adult-higher-education-bachelors-degree-in-English-test", //英文别名
    number: "1004", //编号
}, {
    name: "成人自考英语2词汇表",
    alias: "self-examination-english2", //英文别名
    number: "1005", //编号
}];

categories.forEach(function(category, index) {
    req.push(function() {
        return {
        method: "POST",
        url: 'api/v1/category',
        data: category
    }})
})
req.do(function(){
});