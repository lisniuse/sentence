$(function () {

        var app = new Vue({
            el: ".container",
            data: function() {
                return {
                    isShowWord: true,
                    isShowWordMeaning: true,
                    isShowSentence: true,
                    isShowAllSentence: false
                }
            },
            mounted: function() {
            },
            methods: {
                seleteItem: function(type) {
                    console.log(type);
                    this[type] = !this[type];
                    console.log(this[type]);
                },

            }
        });

});