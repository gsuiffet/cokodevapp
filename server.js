var express = require('express');
var app = express();
var mongoose= require('mongoose');
var session = require("express-session");

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

//Pour les sessions
app.use(session({
  secret: 'a4f8071f-c873-4447-8ee2',
  resave: false,
  saveUninitialized: false,
 })
);

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
        && req.body.email && req.body.password) {

            /*if (req.body.username && req.body.firstname && req.body.lastname
                && req.body.email && req.body.password && req.body.nameFolder
                && req.body.descriptionFolder && req.body.statussharedFolder
                && req.body.nameSnippet && req.body.descriptionSnippet
                && req.body.tagSnippet && req.body.contentSnippet
                && req.body.date && req.body.typelanguage) {*/

//Faire une condition pour checker le mot de passe à confirmer
                user.save(function (error, user) {
                    req.session.tokenId = user.id;
                    console.log("userid: "+user.id);
                    req.session.isLog = true;
                    console.log("user",user);
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

app.post('/login', function (req, res) {

    UserModel.findOne({email: req.body.email, password: req.body.password}, function (err, UserSchema) {
              //if (clientsSchema && clientsSchema.email == req.body.email && clientsSchema.password == req.body.password) {
               if (UserSchema) {
                          req.session.isLog = true;
                          req.session.tokenId = UserSchema.id;
                         console.log(UserSchema.id);
                          console.log("Bon match !");
                } else {
                      console.log("Not registered yet");
                 }
                 if (req.session.isLog) {
                     res.send("logged");
                 } else {
                      var error = "Incorrect login or password";
                      res.send({error: error});
               }

           });
      });

app.post('/folder', function (req, res) {

    var folder = new UserModel ({
        folder:[{nameFolder: req.body.nameFolder,
                    descriptionFolder:  req.body.descriptionFolder,
                    statussharedFolder : req.body.statussharedFolder,
                    }]
    });
console.log(req.session.isLog);
    if (req.session.isLog) {
        //UserModel.find({_id: req.session.tokenId}, function (err, user) {
                  UserModel.update({_id: req.session.tokenId && folder_id: req.session.tokenId},{folder:req.body.folder}, function (err, folder) {

                      //save du folder à rajouter
                             console.log(" folder recorded !");
                             res.send('recorded');
                               });
                               } else {
                                   console.log("error folder not recorded");
                               }
                     });



app.get('/loginPage', function (req, res) {
    /*commentsModel.find({tokenUser: req.session.tokenId}, function (err, comments) {
     res.send('Recorded comment of user');
 });*/
 res.render('loginPage');
 //res.send("Success");
});


app.listen(80, function () {
    console.log("Server listening on port 8080");
});
