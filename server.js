var express = require('express');
var app = express();
var mongoose= require('mongoose');
var session = require("express-session");

var options = { server: { socketOptions: {connectTimeoutMS: 30000 } }};
mongoose.connect('mongodb://cokodev:keepcool@ds227035.mlab.com:27035/cokodev',options, function(err) {
    console.log(err);
});

var UserSchema = mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    folders:[{folderName:String,
                folderDescription: String,
                folderStatus : String,
                snippets: [{snippetName:String,
                            snippetDescription: String,
                            snippetTag: String,
                            snippetContent: String,
                            date : Date,
                            languageType: String
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

//Page Sign up
app.post('/signup', function (req, res) {
    var user = new UserModel ({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        folders:[{folderName:"default",
                    snippets: [{snippetName:"default"}]
                    }]
    });

    if (req.body.userName && req.body.firstName && req.body.lastName
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

//Création d'un folder
app.post('/addfolder', function (req, res) {

    var folder ={folderName:req.body.folderName,
                    folderDescription: req.body.folderDescription,
                    folderStatus: req.body.folderStatus,
                    snippets: []
                }

// Pour enregistrer un snippet
                /*snippets: [{snippetName: req.body.snippetName,
                            snippetDescription: req.body.snippetDescription,
                            snippetTag: req.body.snippetTag,
                            snippetContent: req.body.snippetContent,
                            date : req.body.date,
                            languageType: req.body.languageType
                            }]
                }]*/
        //if (req.session.isLog) {}
                       console.log("folder "+folder);
                       UserModel.update({_id:"59edb8e03abdb81780ae520a"},
                       {$push: {folders:  folder}}, function (err, folder) {

                             console.log(" folder recorded !");
                             res.send('recorded');
                               });
                               /*} else {
                                   console.log("error folder not recorded");
                               }*/
});

//Modification d'un folder
/*app.post('/updatefolder', function (req, res) {

    UserModel.update({_id:"59edb8e03abdb81780ae520a"},
    {{folders:  folder}}, function (err, folder) {

          console.log(" folder updated !");
          res.send('recorded');
            });
});*/

//Création d'un snippet
app.post('/addsnippet', function (req, res) {

    var snippet ={snippetName: req.body.snippetName,
                    snippetDescription: req.body.snippetDescription,
                    snippetTag: req.body.snippetTag,
                    snippetContent: req.body.snippetContent,
                    date : req.body.date,
                    languageType: req.body.languageType
            }
        //if (req.session.isLog) {}
                       console.log("snippet "+snippet);
                       UserModel.update({_id:"59edb8e03abdb81780ae520a", folders:"59edb9d20aa5121538d33572"},
                       {$push: {snippets:  snippet}}, function (err, folder) {
                             console.log(" folder recorded !");
                             res.send('recorded');
                               });
                               /*} else {
                                   console.log("error folder not recorded");
                               }*/
});

app.get('/loginPage', function (req, res) {
    UserModel.find({_id:"59edb8e03abdb81780ae520a"}, {folders:{_id: "59edb9810aa5121538d3356f"}} function (err, comments) {

          console.log(folders);

     res.send('Recorded comment of user');
 });

});

 res.render('loginPage');
 //res.send("Success");
});


app.listen(80, function () {
    console.log("Server listening on port 8080");
});
