/**
 * Created by swizzle on 2016. 11. 14..
 */

var watson_classifier = require('../data/js/watson_classifier');
var result_writer = require('../util/result_writer');

watson_classifier.list(function (err, response) {
    result_writer.json(response, 'classifier_list');
});