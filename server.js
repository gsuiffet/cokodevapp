var express = require('express');
var app = express();
var mongoose= require('mongoose');
var session = require("express-session");

var options = { server: { socketOptions: {connectTimeoutMS: 30000 } }};
mongoose.connect('mongodb://cokodev:keepcool@ds227035.mlab.com:27035/cokodev',options, function(err) {
    console.log(err);
});

var userSchema = mongoose.Schema({
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
var userModel = mongoose.model('users', userSchema);

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
    var user = new userModel ({
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

    userModel.findOne({username: req.body.userName, mail: req.body.email, password: req.body.password}, function (err, userSchema) {
        if (userSchema && userSchema.email == req.body.email && userSchema.password == req.body.password) {
                          req.session.isLog = true;
                          req.session.tokenId = userSchema.id;
                         console.log(userSchema.id);
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

        //if (req.session.isLog) {}
                       console.log("folder "+JSON.stringify(folder));
                       userModel.update({_id:"59edea0cbd2f2e2928a84fbe"},{$push: {folders:  folder}}, function (err, folder) {

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
                    //date : req.body.date   => On la garde dans la base de données mais pas nécessaire dans le formulaire.
                    languageType: req.body.languageType
            }
            //new Date(),
          console.log(JSON.stringify(snippet));
          userModel.update({'folders._id':"59edeb12a9bd582df8a458f5"},
                            {$push: {'folders.$.snippets': snippet}}, function (err, snippet) {
                               console.log("snippet ",JSON.stringify(snippet));
                               //console.log(" folder recorded !");
                               res.send('recorded');
               });
});

//Pour afficher un folder et un snippet spécifique
app.get('/loginPage', function (req, res) {
//Pour afficher un folder spécifique
    userModel.find({_id:"59edea0cbd2f2e2928a84fbe"},{folders: {$elemMatch: {_id:"59edeb12a9bd582df8a458f5"}}}, function (err, user) {
        console.log(JSON.stringify(user));
     res.send('Recorded comment of user');

     });
});

app.listen(80, function () {
    console.log("Server listening on port 8080");
});
