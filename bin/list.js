/**
 * Created by swizzle on 2016. 11. 14..
 */

var watson_classifier = require('../data/js/watson_classifier');

watson_classifier.list(function (err, response) {
    var result = JSON.stringify(response, null, 2);
    console.log(result);
});