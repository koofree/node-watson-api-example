/**
 * Created by swizzle on 2016. 11. 21..
 */

var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var config = require('../../config.json');
var async = require('async');
var extend = require('extend');


module.exports = function () {
    var alchemy_language = new AlchemyLanguageV1({
        api_key: config.watson.alchemy.apikey
    });

    var tone_analyzer = new ToneAnalyzerV3({
        username: config.watson.tone.username,
        password: config.watson.tone.password,
        version_date: '2016-05-19'
    });

    return {
        analyze: function (text, callback) {
            var results = {};
            var calls = [];
            calls.push(function (_callback) {
                alchemy_language.sentiment({
                    text: text
                }, function (err, sentiment) {
                    if (err) throw err;
                    results.sentiment = sentiment['docSentiment'];
                    _callback(err, sentiment);
                });
            });
            calls.push(function (_callback) {
                alchemy_language.emotion({
                    text: text
                }, function (err, emotion) {
                    if (err) throw err;
                    results.emotion = emotion['docEmotions'];
                    _callback(err, emotion);
                });
            });
            calls.push(function (_callback) {
                tone_analyzer.tone({
                    text: text,
                    tones: 'language'
                }, function (err, tone) {
                    if (err) throw err;
                    results.tone = tone['document_tone']['tone_categories'][0]['tones'][0];
                    _callback(err, tone);
                });
            });
            async.parallel(calls, function (err) {
                if (err) throw err;
                callback(err, results);
            });
        }
    };
}();