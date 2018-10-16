$(function () {

    utils = {};

    //插入代码
    (function() {
        var filterHTML = '' + 
        '<ul id="filterWords" v-show="keyword.length > 0">' +
        '<li class="word-item" v-for="word in filterWords">' +
        '    <div class="one-word"> ' +
        '       <span class="serial-number" v-show="isShowSerialNumber">{{word.serialNumber}}</span>' +
        '       <span class="english" v-show="isShowWord">{{word.english}}</span>' +
        '       <span class="chinese" v-show="isShowWordMeaning">{{word.chinese}}</span>' +
        '       <span class="sentence" v-show="isShowSentence">' +
        '           <span class="sentence-english">{{word.sentence.english}}</span>' +
        '           <span class="sentence-chinese">{{word.sentence.chinese}}</span>' +
        '       </span>' +
        '    </div>' +
        '    <div class="example-sentence" v-show="isShowAllSentence">' +
        '        <ol>' +
        '           <li class="sentence-item" v-for="sentence in word.sentences">' +
        '               <span class="sentence-english">{{sentence.english}}</span>' +
        '               <span class="sentence-chinese">{{sentence.chinese}}</span>' +
        '           </li>' +
        '        </ol>' +
        '    </div>' +
        '</li>' +
        '</ul>';
        $("main").append(filterHTML);
    })();

    var app = new Vue({
        el: ".container",
        data: function () {
            return {
                keyword: "",
                filterWords: [],
                isShowWord: true,
                isShowWordMeaning: true,
                isShowSentence: true,
                isShowAllSentence: false,
                isShowSerialNumber: false
            }
        },
        mounted: function () {

        },
        watch: {
            keyword: function (val) {
                if ( !val ) return;
                this.getFilterWords($("#allWords li:contains("+ val +")"));
            }
        },
        methods: {
            seleteItem: function (type) {
                if (type === "isShowAllSentence") {
                    if (this.isShowAllSentence === false) {
                        this.isShowSentence = false;
                        this.isShowWord = true;
                    }
                }
                if (type === "isShowSentence") {
                    if (this.isShowSentence === false) {
                        this.isShowAllSentence = false;
                    }
                }
                this[type] = !this[type];
            },

            getFilterWords: function (eles) {
                var words = [];
                $.each(eles, function() {
                    var sentences = [];
                    var liEle = this;
                    if ( $(this).attr("class") === "sentence-item" ) {
                        liEle = $(this).parent().parent().parent();
                    }
                    var sentencesEles = $(liEle).find(".example-sentence li");
                    $.each(sentencesEles, function() {
                        sentences.push({
                            english: $(this).find(".sentence-english").text(),
                            chinese: $(this).find(".sentence-chinese").text(),
                        });
                    });
                    var word = {
                        serialNumber: $(liEle).find(".one-word .serial-number").text(),
                        english: $(liEle).find(".one-word .english").text(),
                        chinese: $(liEle).find(".one-word .chinese").text(),
                        sentence: {
                            english: $(liEle).find(".one-word .sentence-english").text(),
                            chinese: $(liEle).find(".one-word .sentence-chinese").text(),
                        },
                        sentences: sentences
                    }
                    var hasWord = false;
                    words.forEach(function(_word) {
                        if ( _word.english === word.english && _word.chinese === word.chinese ) {
                            hasWord = true;
                        }
                    });
                    if ( hasWord === false ) {
                        words.push(word);
                    }
                });
                console.log(words);
                this.filterWords = words;
            }
        }
    });

});