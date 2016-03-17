var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('views', ['./public','./public/partials/']);
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render('index');
});

app.get('/p', function(req,res){
    res.render('partials1');
});

app.listen(port, function(){
    console.log("Listening on port "+port);
});