exports.getData = function (req) {
    var express = require('express');
    var fs = require('fs');
    fs.readFile('./' + req.file.path, {
        encoding: 'utf-8'
    }, function (err, data) {
        console.log('----- inside track ----');
        console.log('Data - ' + data);
        console.log('Trend -' + req.body.trend);
    });
};
//var influencers = [];
//module.exports = function (request) {
//    var express = require('express');
//    var fs = require('fs');
//
//    var path = './' + request.file.path;
//    fs.readFile(path, {
//        encoding: 'utf-8'
//    }, function (err, data) {
//        if (!err) {
//            influencers = data.split(',');
//            /*console.log(rawInfluencers);*/
//            //the last element has a CR. Replace returns a newline. So 
//            /*var trimmed = rawInfluencers[rawInfluencers.length - 1].replace(/(\r\n|\n|\r)/gm, '');*/
//            /*rawInfluencers.pop();*/
//            /*rawInfluencers.push(trimmed);*/
//            /*console.log(rawInfluencers);*/
//            /*return rawInfluencers;*/
//        } else {
//            console.log('Error ' + err);
//        }
//
//    });
//
//};