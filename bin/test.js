/**
 * Created by swizzle on 2016. 11. 14..
 */


var watson_classifier = require('../data/js/watson_classifier');
var read_train = require('../data/js/read_train');
var result_writer = require('../util/result_writer');
var fs = require('fs');

var options = {
    separate: false,
    headers: false,
    delimiter: ',',
    csv: false
};

read_train('data/train/ratings_test_limit.csv', function (err, text, obj) {
    watson_classifier.test(obj, function (err, response) {
        if (err) throw err;

        result_writer.json(response, 'test_result');
    });
}, options);