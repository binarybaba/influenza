var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('users',{
        site:'http://allrightamin.xyz',
        me:'Amin Mohamed Ajani'
    });
});

module.exports = router;

/*var express = require('express');
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
};*/