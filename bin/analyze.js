/**
 * Created by swizzle on 2016. 11. 14..
 */

var analyzer = require('../data/js/watson_analyzer');
var result_writer = require('../util/result_writer');

analyzer.analyze("Greetings IBM Developer Connect 2016 Korea and Node Play", function (err, result) {
    result_writer.json(result, 'analyze_result');
});