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
    password: String,
    folder:[{nameFolder:String,
                descriptionFolder: String,
                statussharedFolder : String,
                snippet: [{nameSnippet:String,
                            descriptionSnippet: String,
                            tagSnippet: String,
                            contentSnippet: String,
                            date : Date,
                            typelanguage: String
                            }]
                }]
});
var UserModel = mongoose.model('Users', UserSchema);

app.use(express.static('public'));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Afficher la page d'accueil
app.get('/', function (req, res) {
    res.render('index');
});

app.post('/signup', function (req, res) {
    var user = new UserModel ({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        folder:[{nameFolder: req.body.nameFolder,
                    descriptionFolder:  req.body.descriptionFolder,
                    statussharedFolder : req.body.statussharedFolder,
                    snippet: [{nameSnippet: req.body.nameSnippet,
                                descriptionSnippet: req.body.descriptionSnippet,
                                tagSnippet: req.body.tagSnippet,
                                contentSnippet: req.body.contentSnippet,
                                date : req.body.date,
                                typelanguage: req.body.typelanguage
                                }]
                    }]
    });

    if (req.body.username && req.body.firstname && req.body.lastname
        && req.body.email && req.body.password && req.body.nameFolder
        && req.body.descriptionFolder && req.body.statussharedFolder
        && req.body.nameSnippet && req.body.descriptionSnippet
        && req.body.tagSnippet && req.body.contentSnippet
        && req.body.date && req.body.typelanguage) {
        user.save(function (error, user) {
            console.log("user",user);
            console.log("error",error);
              res.send('signed');
        });
    }
    else {
         console.log("not BDD error");
        res.send('Not registered');
    }
    //res.render('index');
    //res.send('you sign');
});

app.listen(80, function () {
    console.log("Server listening on port 8080");
});
