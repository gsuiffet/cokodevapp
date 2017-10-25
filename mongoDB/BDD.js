BDD structure


Nouvelle version (Image à rajouter)
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

Exemple :
    [{"_id":"59ef056a865e362e2092aa6e",
        "folders":
        [{"_id":"59ef05b4728f1218a45977a1",
            "folderStatus":"shared",
            "folderDescription":"react",
            "folderName":"react",
            "snippets":
            [{"_id":"59ef06148f229127c0ae226f","languageType":"PHP","snippetContent":"script démarrage","snippetTag":"js","snippetDescription":"script","snippetName":"reeactjs.js"},
            {"_id":"59ef06288f229127c0ae2270","languageType":"CSS","snippetContent":"script ","snippetTag":"css","snippetName":"script.css"},
            {"_id":"59ef44b86473b708e0f392c2","languageType":"JS","date":"2017-10-24T13:48:40.437Z","snippetContent":"index","snippetTag":"index","snippetDescription":"in","snippetName":"index"}]
        }]
    }]

Exemples de requêtes :
[{ item: "journal",
  instock: => folders
      [ { warehouse: "A",
           qty: 5 }, => snippets
        { warehouse: "C",
          qty: 15 }
      ] },
  { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
  { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
  { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }]

db.inventory.find( { 'instock.0.qty': { $lte: 20 } } )
db.inventory.find( { "instock.qty": 5, "instock.warehouse": "A" } )


[{"_id":"59ef056a865e362e2092aa6e",
"folders":
[{"snippets":[{"snippetName":"default","_id":"59ef056a865e362e2092aa70"}]},
{"snippets":[]},
{"snippets":[{"_id":"59ef06148f229127c0ae226f","languageType":"PHP","snippetContent":"script démarrage","snippetTag":"js","snippetDescription":"script","snippetName":"reeactjs.js"},
                    {"_id":"59ef06288f229127c0ae2270","languageType":"CSS","snippetContent":"script ","snippetTag":"css","snippetName":"script.css"},
                    {"_id":"59ef44b86473b708e0f392c2","languageType":"JS","date":"2017-10-24T13:48:40.437Z","snippetContent":"index","snippetTag":"index","snippetDescription":"in","snippetName":"index"}]}]}]
userModel.find({_id:"59ef056a865e362e2092aa6e"},{'folders.snippets': 1, 'folders': { $slice: 3 }}


[{"_id":"59ef056a865e362e2092aa6e",
  "folders":[{"_id":"59ef05b4728f1218a45977a1",
                  "folderStatus":"shared",
                  "folderDescription":"react",
                  "folderName":"react",
                   "snippets":[{"_id":"59ef06148f229127c0ae226f","languageType":"PHP","snippetContent":"script démarrage","snippetTag":"js","snippetDescription":"script","snippetName":"reeactjs.js"},
                                     {"_id":"59ef06288f229127c0ae2270","languageType":"CSS","snippetContent":"script ","snippetTag":"css","snippetName":"script.css"},
                                     {"_id":"59ef44b86473b708e0f392c2","languageType":"JS","date":"2017-10-24T13:48:40.437Z","snippetContent":"index","snippetTag":"index","snippetDescription":"in","snippetName":"index"}]}]}]
userModel.find({_id:"59ef056a865e362e2092aa6e"},{'folders.snippets': 1, 'folders': { $elemMatch: {_id:"59ef05b4728f1218a45977a1"}}}

[{"_id":"59ef056a865e362e2092aa6e",
  "folders":[{"snippets":[
                  {"_id":"59ef06148f229127c0ae226f","languageType":"Ruby","snippetContent":"script démarrage","snippetTag":"js","snippetDescription":"script","snippetName":"reeactjs.js"},
                  {"_id":"59ef06288f229127c0ae2270","languageType":"CSS","snippetContent":"script ","snippetTag":"css","snippetName":"script.css"},
                  {"_id":"59ef44b86473b708e0f392c2","languageType":"JS","date":"2017-10-24T13:48:40.437Z","snippetContent":"index","snippetTag":"index","snippetDescription":"in","snippetName":"index"}]}]}]
userModel.find({_id:"59ef056a865e362e2092aa6e"},{'folders': { $elemMatch: {_id:"59ef05b4728f1218a45977a1"}},'folders.snippets': 1}


[{"_id":"59ef056a865e362e2092aa6e",
  "folders":[{"_id":"59ef05b4728f1218a45977a1",
                 "folderStatus":"shared",
                 "folderDescription":"react",
                 "folderName":"react",
                 "snippets":[{"_id":"59ef06148f229127c0ae226f","languageType":"PHP","snippetContent":"script démarrage","snippetTag":"js","snippetDescription":"script","snippetName":"reeactjs.js"},
                 {"_id":"59ef06288f229127c0ae2270","languageType":"CSS","snippetContent":"script ","snippetTag":"css","snippetName":"script.css"}]}]}]
userModel.find({_id:"59ef056a865e362e2092aa6e"},{'folders.snippets': 1,'folders.snippets': { $slice: 2 }, 'folders': { $elemMatch: {_id:"59ef05b4728f1218a45977a1"}}}


[{"_id":"59ef056a865e362e2092aa6e",
 "folders":[{"_id":"59ef05b4728f1218a45977a1",
 "folderStatus":"shared",
 "folderDescription":"react",
 "folderName":"react",
 "snippets":[{},
                   {}]}]}]
userModel.find({_id:"59ef056a865e362e2092aa6e"},{'folders.snippets.snippetsName': 1,'folders.snippets': { $slice: 2 }, 'folders': { $elemMatch: {_id:"59ef05b4728f1218a45977a1"}}}
userModel.find({_id:"59ef056a865e362e2092aa6e"},{'folders.snippets': 1, 'folders': { $slice: 1 }}

How to update snippets :
Given how MongoDB doesn't appear to provide a good mechanism for this,
I find it prudent to use mongoose to simply extract the element from the mongo collection
using .findOne(...), run a for-loop search on its relevant subelements (seeking by say ObjectID),
modify that JSON, then do Schema.markModified('your.subdocument');
Schema.save(); It's probably not efficient, but it is very simple and works fine.

var snipppetCollection =  userModel.find({_id:"59ef056a865e362e2092aa6e"},{'folders': { $elemMatch: {_id:"59ef05b4728f1218a45977a1"}},'folders.snippets': 1}
   , function (err, folder) {
                        console.log(err);
                        console.log(JSON.stringify(folder));
                        res.send(folder);
        });
        snippetCollection.forEach(function(collectionDocument) {
            var snippetArray = collectionDocument.snippetArray;
              for (var i=0; i<snippetArray.length; i++) {

              }
        }
