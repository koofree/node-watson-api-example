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
    csv: true
};

read_train('data/train/data_train.csv', function (err, text, obj) {
    watson_classifier.training(obj, function (err, response) {
        if (err) throw err;

        result_writer.json(response, 'training_result');
    });
}, options);