var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    res.render('index', {
         site:'http://allrightamin.xyz',
        me:'Amin Mohamed Ajani'
    });
});

module.exports = router;