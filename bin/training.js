/**
 * Created by swizzle on 2016. 11. 14..
 */

var watson_classifier = require('../data/js/watson_classifier');
var read_train = require('../data/js/read_train');
var fs = require('fs');

read_train('data/train/data_train.csv', function (err, text) {
    watson_classifier.training(text, function (err, response) {
        if (err) throw err;

        var response_text = JSON.stringify(response, null, 2);
        fs.writeFile('training_result.json', response_text);
        console.log(response_text);
    });
});