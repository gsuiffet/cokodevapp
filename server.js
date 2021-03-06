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

/*************************************************************************
CREATION FOLDER
*************************************************************************/
app.post('/addfolder', function (req, res) {

    var folder ={folderName:req.body.folderName,
                    folderDescription: req.body.folderDescription,
                    folderStatus: req.body.folderStatus,
                    snippets: []
                }

        //if (req.session.isLog) {}
                       console.log("folder "+JSON.stringify(folder));
                       userModel.update({_id:"59ef056a865e362e2092aa6e"},{$push: {folders:  folder}}, function (err, folder) {

                             console.log(" folder recorded !");
                             res.send('recorded');
                               });
                               /*} else {
                                   console.log("error folder not recorded");
                               }*/
});

/*************************************************************************
CREATION SNIPPET
*************************************************************************/
app.post('/addsnippet', function (req, res) {

    var snippet ={snippetName: req.body.snippetName,
                    snippetDescription: req.body.snippetDescription,
                    snippetTag: req.body.snippetTag,
                    snippetContent: req.body.snippetContent,
                    date : new Date (),   //=> On la garde dans la base de données mais pas nécessaire dans le formulaire.
                    languageType: req.body.languageType
            }

          console.log(JSON.stringify(snippet));
          userModel.update({'folders._id':"59ef05b4728f1218a45977a1"},{$push: {'folders.$.snippets': snippet}}, function (err, snippet) {
                               console.log("snippet ",JSON.stringify(snippet));
                               //console.log(" folder recorded !");
                               res.send('recorded');
               });
});

/*************************************************************************
SUPPRESSION FOLDER ET SNIPPET
*************************************************************************/
/*Pour supprimer un USER : => fonctionne
userModel.remove({_id:"59eef92df1c2b90b98ca3a85"}, function (err, user) {
                     console.log(user);
                     res.send(user);
     });*/

/*Pour supprimer un FOLDER : => fonctionne
userModel.update({_id:"59ee0331a5c8d85d806266b4"},{$pull: {'folders': {_id:"59eeff408b924032943bd8af"}}}, function (err, user) {
                     console.log(user);
                     res.send(user);
     });*/

/*Pour supprimer un SNIPPET : => fonctionne
userModel.update({'folders._id':"59eeff4a8b924032943bd8b0"},{$pull: {'folders.$.snippets': {_id:"59ef0193cb7d7e1be04f81ac"}}}, function (err, user) {
                    console.log(user);
                    res.send(user);
});*/

/*************************************************************************
MODIFICATION USER, FOLDER ET SNIPPET SELECTIONNE
*************************************************************************/
/*Modification d'un champ du USER : => fonctionne
userModel.update({_id:"59ef056a865e362e2092aa6e"}, {firstName: "Olivia"} , function (err, user) {
                     console.log(user);
                     res.send(user);
     });*/
/*Modification d'un champ du FOLDER : => fonctionne
userModel.update({'folders._id':"59ef05aa728f1218a45977a0"}, {$set: {'folders.$.folderStatus': "private"}} , function (err, folderName) {
                     console.log(folderName);
                     res.send(folderName);
     });*/
/*Modification d'un champ du SNIPPET : => fonctionne
Voir solutions dans fichier texte
  userModel.update({'folders._id':"59ef05b4728f1218a45977a1"},{$set: {'folders.$.snippets.0.languageType': "PHP"}}
  ou
  userModel.update({'folders':{$elemMatch: {'_id': '59ef05b4728f1218a45977a1'}}},{$set: {'folders.$.snippets.0.languageType': "Ruby"}}
  => mais pas optimal
  Meilleure solution :
  var updateSnippetName = 'script.js';
  var updateSnippetDescription = 'Ceci est un test';
  var updateSnippetTag = "script"
  var updateSnippetContent = "ceci est un script"
  var updateLanguageType = 'JS'
       userModel.findOne({_id:"59ef056a865e362e2092aa6e"},{'_id':0,'folders': { $elemMatch: {_id:"59ef05b4728f1218a45977a1"}},'folders.snippets': 1}, function (err, snippets) {
                                              //console.log(snippets);
                                   var snippetCollection = snippets.folders[0].snippets;

                                              for (var i=0; i<snippetCollection.length; i++) {
                                                          //console.log(snippetCollection[i]._id);
                                                          if (snippetCollection[i]._id == '59ef06288f229127c0ae2270') {
                                                                // console.log(snippetCollection[i]._id +" == "+ '59ef06148f229127c0ae226f');
                                                                    //console.log("i", i);
                                                                     //positionMySnippet = snippetCollection[i];
                                                                     //console.log('position '+ positionMySnippet);
                                                                        // console.log(snippets.folders[0].snippets[i].snippetName);

                                                                      let data = {}
                                                                      data["folders.$.snippets." + i + ".snippetName"] = updateSnippetName
                                                                      data["folders.$.snippets." + i + ". snippetDescription"] = updateSnippetDescription
                                                                      data["folders.$.snippets." + i + ".snippetTag"] = updateSnippetTag
                                                                      data["folders.$.snippets." + i + ".snippetContent"] = updateSnippetContent
                                                                      data["folders.$.snippets." + i + ".languageType"] = updateLanguageType

                                                                     console.log(data);
                                                                       userModel.update({'folders':{$elemMatch: {'_id': '59ef05b4728f1218a45977a1'}}},
                                                                      {$set:data}, function (err, snippets) {
                                                                                      console.log(JSON.stringify(snippets));
                                                                                        res.send(snippets);
                                                                                    });
                                                         }
                                                        // break;
                                               }
                               });*/


  /*************************************************************************
  AFFICHAGE FOLDER ET SNIPPET SELECTIONNE
  *************************************************************************/
   //Pour afficher un FOLDER spécifique : => fonctionne
  /*userModel.find({_id:"59edea0cbd2f2e2928a84fbe"},{folders: {$elemMatch: {_id:"59edeb12a9bd582df8a458f5"}}}, function (err, user) {
   console.log(JSON.stringify(user));
    res.send('Recorded comment of user');
  });*/
  /*Pour afficher un SNIPPET spécifique : => ne fonctionne pas
  userModel.find({_id:"59edea0cbd2f2e2928a84fbe"},{snippets: {$elemMatch: {_id:"59edfa7100bd3407e06d576c"}}},
  userModel.find({_id:"59edea0cbd2f2e2928a84fbe"},{'folders.snippets': {$in:{ _id:"59edfa7100bd3407e06d576c"}}},function (err, user) {
  console.log(JSON.stringify(user));
  res.send(user);
  });*/
  /*Pour afficher un SNIPPET spécifique : => fonctionne
  userModel.find({_id:"59ef056a865e362e2092aa6e"},{'folders.snippets': 1, 'folders': { $slice: 1 }}*/


//Page de test
var  positionMySnippet  = null;
app.get('/loginPage', function (req, res) {

//Mise à jour des champs d'un snippet
var updateSnippetName = 'script.js';
var updateSnippetDescription = 'Ceci est un test';
var updateSnippetTag = "script"
var updateSnippetContent = "ceci est un script"
var updateLanguageType = 'JS'
     userModel.findOne({_id:"59ef056a865e362e2092aa6e"},{'_id':0,'folders': { $elemMatch: {_id:"59ef05b4728f1218a45977a1"}},'folders.snippets': 1}, function (err, snippets) {
                                            //console.log(snippets);
                                 var snippetCollection = snippets.folders[0].snippets;

                                            for (var i=0; i<snippetCollection.length; i++) {
                                                        //console.log(snippetCollection[i]._id);
                                                        if (snippetCollection[i]._id == '59ef06288f229127c0ae2270') {
                                                              // console.log(snippetCollection[i]._id +" == "+ '59ef06148f229127c0ae226f');
                                                                  //console.log("i", i);
                                                                   //positionMySnippet = snippetCollection[i];
                                                                   //console.log('position '+ positionMySnippet);
                                                                      // console.log(snippets.folders[0].snippets[i].snippetName);

                                                                    let data = {}
                                                                    data["folders.$.snippets." + i + ".snippetName"] = updateSnippetName
                                                                    data["folders.$.snippets." + i + ". snippetDescription"] = updateSnippetDescription
                                                                    data["folders.$.snippets." + i + ".snippetTag"] = updateSnippetTag
                                                                    data["folders.$.snippets." + i + ".snippetContent"] = updateSnippetContent
                                                                    data["folders.$.snippets." + i + ".languageType"] = updateLanguageType

                                                                   console.log(data);
                                                                     userModel.update({'folders':{$elemMatch: {'_id': '59ef05b4728f1218a45977a1'}}},
                                                                    {$set:data}, function (err, snippets) {
                                                                                    console.log(JSON.stringify(snippets));
                                                                                      res.send(snippets);
                                                                                  });
                                                       }
                                                      // break;
                                             }
                             });
});

app.listen(80, function () {
    console.log("Server listening on port 8080");
});
