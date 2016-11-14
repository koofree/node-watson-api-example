/**
 * Created by swizzle on 2016. 11. 14..
 */

var NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');
var config = require('../../config.json');
var async = require('async');
var extend = require('extend');

module.exports = function () {
    var natural_language_classifier = new NaturalLanguageClassifierV1({
        username: config.watson.username,
        password: config.watson.password
    });

    var classifier_id = config.watson.classifier.id;
    var language = config.watson.classifier.language;

    return {
        list: function (callback) {
            natural_language_classifier.list({}, callback);
        },
        training: function (data, callback) {
            var params = {
                training_data: data,
                language: language
            };
            natural_language_classifier.create(params, callback);
        },
        test: function (data, callback, options) {
            var DEFAULT_OPTIONS = {
                limit_count: Number.MAX_SAFE_INTEGER
            };
            options = extend(DEFAULT_OPTIONS, options);

            if (typeof data === 'string' || data instanceof String) {
                natural_language_classifier.classify({
                    text: data,
                    classifier_id: classifier_id
                }, callback);
            } else if (typeof data === 'Object' || data instanceof Object) {
                var results = {
                    rate: 0,
                    data: []
                };
                var calls = [];
                Object.keys(data).forEach(function (key) {
                    var this_data = data[key];
                    if (options.limit_count < data[key].length) {
                        this_data = this_data.slice(0, options.limit_count);
                    }

                    this_data.forEach(function (text) {
                        calls.push(function (_callback) {
                            natural_language_classifier.classify({
                                text: text,
                                classifier_id: classifier_id
                            }, function (err, response) {
                                if (err) return _callback(err);

                                var result = [response['text'], response['top_class'], key, response['top_class'] == key];

                                results['data'].push(result);
                                _callback(err, result);
                            });
                        });
                    });
                });
                async.parallel(calls, function (err, result) {
                    if (err) {
                        throw err;
                    }

                    var all_count = results['data'].length;
                    var true_count = 0;
                    results['data'].forEach(function (_obj) {
                        if (_obj[3] === true) true_count += 1;
                    });
                    results['rate'] = true_count / all_count * 100;

                    callback(err, results);
                });
            }

        }
    };
}();
