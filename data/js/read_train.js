/**
 * Created by swizzle on 2016. 11. 9..
 */

var fs = require('fs');
var csv = require('fast-csv');
var extend = require('extend');


module.exports = function (filepath, callback, options) {
    var DEFAULT_OPTIONS = {
        separate: true,
        csv: false,
        headers: false,
        delimiter: ',',
        limit_count: 15000
    };

    options = extend(DEFAULT_OPTIONS, options);

    /** @namespace options.limit_count */
    /** @namespace options.csv */

    fs.readFile(filepath, 'utf-8', function (err, text) {
        var obj = {};
        var temp_options = extend({}, options);
        if (temp_options.headers) {
            temp_options.headers = true;
        }

        csv.fromString(text, temp_options)
            .on("data", function (data) {
                if (options.headers) {
                    if (obj[data[options.headers[0]]] == undefined) {
                        obj[data[options.headers[0]]] = [];
                    }
                    obj[data[options.headers[0]]].push(data[options.headers[1]]);
                } else {
                    if (obj[data[1]] == undefined) {
                        obj[data[1]] = [];
                    }
                    obj[data[1]].push(data[0]);
                }
            })
            .on("end", function () {
                if (options.separate) {
                    var train = {};
                    var test = {};
                    Object.keys(obj).forEach(function (key) {
                        obj[key].sort(function () {
                            return 0.5 - Math.random()
                        });

                        var half_count = obj[key].length / 2;
                        if (half_count > options.limit_count) {
                            half_count = options.limit_count;
                        }
                        train[key] = obj[key].splice(0, half_count);
                        test[key] = obj[key];
                    });
                    if (options.csv) {
                        var train_array = [];
                        Object.keys(train).forEach(function (key) {
                            train[key].forEach(function (value) {
                                train_array.push([value, key]);
                            });
                        });

                        var test_array = [];
                        Object.keys(test).forEach(function (key) {
                            test[key].forEach(function (value) {
                                test_array.push([value, key]);
                            });
                        });

                        csv.writeToString(train_array, {header: false}, function (_err, train_text) {
                            csv.writeToString(test_array, {header: false}, function (__err, test_text) {
                                return callback(err, text, train_text, test_text);
                            });
                        });
                    } else {
                        return callback(err, text, train, test);
                    }
                } else {
                    if (options.csv) {
                        var array = [];
                        Object.keys(obj).forEach(function (key) {
                            obj[key].forEach(function (value) {
                                array.push([value, key]);
                            });
                        });
                        csv.writeToString(array, {headers: false}, function (err, data) {
                            if (err) return callback(err, text);
                            return callback(err, text, data);
                        });
                    } else {
                        return callback(err, text, obj);
                    }

                }
            });
    });
};
