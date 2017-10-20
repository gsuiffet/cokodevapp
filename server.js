var express = require('express');
var app = express();
var mongoose= require('mongoose');

var options = { server: { socketOptions: {connectTimeoutMS: 30000 } }};
mongoose.connect('mongodb://cokodev:keepcool@ds227035.mlab.com:27035/cokodev',options, function(err) {
    console.log(err);
});

var UserSchema = mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

var UserModel = mongoose.model('Users', UserSchema);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/signup', function (req, res) {
    var user = new UserModel ({
        username: req.query.username,
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        email: req.query.email,
        password: req.query.password
    });
    if (req.query.username && req.query.firstname && req.query.lastname && req.query.email && req.query.password) {
        user.save(function (error, user) {
            console.log("user",user);
            console.log("error",error);
        });
    }
    res.render('index');
    //res.send('you sign');
});

app.listen(8080, function () {
    console.log("Server listening on port 8080");
});
