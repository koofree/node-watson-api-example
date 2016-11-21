/**
 * Created by swizzle on 2016. 11. 21..
 */

var fs = require('fs');
var util = require('util');
var moment = require('moment');

module.exports = function () {
    return {
        json: function (obj, prefix) {
            var result_text = JSON.stringify(obj);
            console.log(result_text);
            fs.writeFile(util.format('%s_%s.json', prefix, moment().format('YYMMDDHHmmss')), result_text);
        }
    };
}();