var express = require('express');
var app = express();

exports.partials = function(req, res){
    var filename = req.params.filename;
    if(filename){
        res.render('partials/'+filename);
    }
    else{
        return;
    }
        
};

exports.index = function(req, res){
    res.render('index');
};