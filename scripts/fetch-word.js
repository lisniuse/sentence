const fly = require('flyio');
const w1005 = require('./data/1005');
const cheerio = require('cheerio');
let debugWord = "attentively";
const words = [{
    number: "1005",
    w: w1005
}];
const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Connection': 'keep-alive',
    'Cookie': 'DICT_UGC=be3af0da19b5c5e6aa4e17bd8d90b28a|; webDict_HdAD=%7B%22req%22%3A%22http%3A//dict.youdao.com%22%2C%22width%22%3A960%2C%22height%22%3A240%2C%22showtime%22%3A5000%2C%22fadetime%22%3A500%2C%22notShowInterval%22%3A3%2C%22notShowInDays%22%3Afalse%2C%22lastShowDate%22%3A%22Mon%20Nov%2008%202010%22%7D; ___rl__test__cookies=1539067752379; DICT_UGC=be3af0da19b5c5e6aa4e17bd8d90b28a|; _ga=GA1.2.494737868.1535357533; OUTFOX_SEARCH_USER_ID_NCOO=397820575.6348569; OUTFOX_SEARCH_USER_ID="1708024336@10.169.0.82"; _gid=GA1.2.1522480411.1538966276; DICT_UGC=be3af0da19b5c5e6aa4e17bd8d90b28a|; JSESSIONID=abcmz3LFxbm4Q6fo9Jrzw; _ntes_nnid=928e519fa591eb31fa445123b4e945e4,1538975681385; UM_distinctid=166521a3ea13dd-0fa6d65e9df21d-346a7809-1aeaa0-166521a3ea2f8; search-popup-show=-1; user-from=http://www.youdao.com/w/eng/book/; from-page=http://www.youdao.com/w/eng/book/; ___rl__test__cookies=1539067770315',
    'Host': 'www.youdao.com',
    'Referer': 'http://www.youdao.com/',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
};

//fly配置
fly.interceptors.request.use((request)=>{
    //给所有请求添加自定义header
    for (const key in headers) {
        const element = headers[key];
        request.headers[key] = element;
    }
    return request;
});

const sleep = async function (second) {
    return new Promise(function (reslove, reject) {
        setTimeout(function() {
            reslove(true);
        }, second * 1000);
    });
}

const getChinese = async function(english) {
    let res = {};
    do {
        res = await fly.get("http://www.youdao.com/w/eng/" + english).catch(()=>{});
        if ( res ) {
            if ( !res.data ) {
                console.log("重新尝试获取", english, "的中文");
                await sleep(2);
            }
        } else if ( !res ) {
            console.log("重新尝试获取", english, "的中文");
            await sleep(2);
        }
    } while ( !res || !res.data )
    let $ = cheerio.load(res.data, { decodeEntities: false });
    let chinese = $(".trans-container ul li").eq(0).text();
    return chinese;
}

const getSentences = async function(english) {
    let res = "";
    let $ = "";
    let count = 0;
    do {
        count++;
        res = await fly.get("http://www.youdao.com/example/blng/eng/" + english + "/#keyfrom=dict.main.moreblng").catch(()=>{});
        if ( res ) {
            if ( res.data ) {
                $ = cheerio.load(res.data, { decodeEntities: false });
                if ( $("#bilingual .remind p").text().indexOf("当前分类下找不到") !== -1 ) {
                    console.log("第"+count+"次尝试获取句子，没有找到分类");
                    await sleep(2);
                }
            } else if ( !res.data ) {
                console.log("第"+count+"次尝试获取句子，没有找到res.data");
                await sleep(2);
            }
        } else {
            console.log("第"+count+"次尝试获取句子，没有找到res");
            await sleep(2);
        }
    } while ( !res || !res.data || $("#bilingual .remind p").text().indexOf("当前分类下找不到") !== -1 )
    let sentenceEles = $("#bilingual ul li");
    let sentences = [];
    sentenceEles.each((i, elem) => {
        if ( i < 4 ) {
            let english = $(elem).find("p").eq(0).text();
            let chinese = $(elem).find("p").eq(1).text();
            english = english.split("\n")[0];
            chinese = chinese.split("\n")[0];
            sentences.push({
                english: english,
                chinese: chinese,
                from: $(elem).find("p").eq(2).text()
            });
        } else {
            return 
        }
    });
    sentences.sort(function(obj1, obj2) {
        return obj1.english.length - obj2.english.length;
    });
    for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i];
        let res = await fly.post("http://127.0.0.1:7004/api/v1/sentence", sentence).catch(()=>{});
        sentences[i].id = res.data.data._id;
    }
    return sentences;
}

const main = async function () {
    for (let index = 0; index < words[0].w.length; index++) {
        const english = words[0].w[index];
        if ( debugWord === english ) debugWord = "";
        if ( debugWord ) continue;
        const categoryNumber = words[0].number;
        let chinese = await getChinese(english);
        let sen = await getSentences(english);
        let senIds = [];
        sen.forEach(function(obj) {
            senIds.push(obj.id);
        });
        const word = {
            categoryNumber: categoryNumber,
            english: english,
            chinese: chinese,
            sentenceId: sen[0].id,
            sentenceIds: senIds
        }
        let res = await fly.post("http://127.0.0.1:7004/api/v1/word", word).catch(()=>{});
        console.log(english, res.data);
    }
}
main();