/**
 * Created by swizzle on 2016. 11. 14..
 */

var watson_classifier = require('../data/js/watson_classifier');

module.exports = function () {

    var test_text = '오늘 너무 덥지 않냐?';
    
    var print_result = function (err, response) {
        if (err)
            console.log('error:', err);
        else {
            console.log(JSON.stringify(response, null, 2));
        }
    };

    watson_classifier.list(print_result);
    watson_classifier.test(test_text, print_result);
};