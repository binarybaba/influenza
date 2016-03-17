var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));
/*app.set('views', ['./public','./public/partials/']);*/ 
/*Commenting ^this out because we dont need public partials to be rendered server side and it's causing a lot of shit with angular + ui.router*/

app.set('views', './views');
/*Setting the views here. So we've just moved ./partials/index.ejs to its own views folder at ./views/ */
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
});



app.listen(port, function(){
    console.log("Listening on port "+port);
});