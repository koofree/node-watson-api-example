/**
 * Created by swizzle on 2016. 11. 9..
 */

var read_train = require('../data/js/read_train');
var assert = require('assert');

module.exports = function () {

    var filepath = 'data/source/data.csv';
    var options = {
        separate: true
    };

    read_train(filepath, function (err, data, train, test) {
        if (err) throw err;
        assert(Object.keys(train).length > 0);
        assert(Object.keys(test).length > 0);

        console.log("Success File Check Test on Read Train Module");
    }, options);
};