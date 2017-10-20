BDD structure

var users =
      {
      username : "jhon",
      firstname : "jhon",
      lastname : "doe",
      email : "john.doe@gmail.com",
      password : "XXX",
      language : "fr",
      folders :
        {
            nameFolder: "default",
            descriptionFolder : "Olivia folder",
            imageFolder : "http://cokodev.com/olivia.jpg",
            statussharedFolder : "public",
            snippet :

             {
              nameSnippet: "snippet.js",
              descriptionSnippet: "my snippet",
              imageSnippet: "http://cokodev.com/olivia.jpg",
              tagSnippet: "js",
              contentSnippet: "text",
              date: 13/10/2017,
              typelanguage : "javascript"
              }
        }
    }

BDD document

  var users =
    [
      {
        username : "jhon",
        firstname : "jhon",
        lastname : "doe",
        email : "john.doe@gmail.com",
        password : "XXX",
        language : "fr",
        folders :
          [
            {
              nameFolder: "default",
              descriptionFolder : "Olivia folder",
              imageFolder : "http://cokodev.com/olivia.jpg",
              statussharedFolder : "public",
              snippet :
                [
                  {
                    nameSnippet: "snippet.js",
                    descriptionSnippet: "my snippet",
                    imageSnippet: "http://cokodev.com/olivia.jpg",
                    tagSnippet: "js",
                    contentSnippet: "text",
                    date: 13/10/2017,
                    typelanguage : "javascript"
                }
              ]
          }
        ]
    }
  ]
