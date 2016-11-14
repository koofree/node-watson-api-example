/**
 * Created by swizzle on 2016. 11. 14..
 */


var watson_classifier = require('../data/js/watson_classifier');
var read_train = require('../data/js/read_train');
var fs = require('fs');

read_train('data/train/data_test.csv', function (err, text, obj) {
    watson_classifier.test(obj, function (err, response) {
        if (err) throw err;

        var response_text = JSON.stringify(response, null, 2);
        fs.writeFile('test_result.json', response_text);
    });
});