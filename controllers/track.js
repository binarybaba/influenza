/*Read this http: //www.hacksparrow.com/node-js-exports-vs-module-exports.html*/
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