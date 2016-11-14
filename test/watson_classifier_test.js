/**
 * Created by swizzle on 2016. 11. 14..
 */

var watson_classifier = require('../data/js/watson_classifier');

module.exports = function () {

    var test_text = '이거 버그 너무 심함.. ㅜㅜ';
    
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