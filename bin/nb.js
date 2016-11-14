/**
 * Created by swizzle on 2016. 11. 14..
 */

var classifier = require('classifier');
var read_train = require('../data/js/read_train');

var nb = new classifier.Bayesian();

read_train('../data/train/review_data_train2.csv', function (err, data, train) {
    if (err) throw err;

    var train_data_count = 0;
    Object.keys(train).forEach(function (key) {
        train[key].forEach(function (value) {
            nb.train(value, key);
            train_data_count += 1;
        });
    });

    read_train('../data/train/review_data_test2.csv', function (err, data, test) {
        var result_true = 0;
        var result_false = 0;
        Object.keys(test).forEach(function (key) {
            test[key].forEach(function (value) {
                var result = nb.classify(value);
                console.log(value + '##' + key + "##" + result);
                if (result == key) {
                    result_true += 1;
                } else {
                    result_false += 1;
                }
            });
        });
        var total_count = (result_true + result_false);
        var rate = result_true / total_count * 100;
        console.log('test data count is ' + train_data_count);
        console.log('total count is ' + total_count);
        console.log('correct rate is ' + rate);
    }, {separate: false});
}, {separate: false});