var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', function(req, res){
    res.render('index');
});

app.listen(3000, function(){
    console.log('Server started on port 3000...');
});