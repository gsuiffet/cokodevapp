var React = require('react');
var Header= require('./header');
var FolderXForm= require('./folderForm');
var {Route, Redirect} = require('react-router');

class Folder extends React.Component {
    constructor() {
        super();
            this.submit = this.submit.bind(this);
                this.state = {islog: false};
    }
    submit(values){
         var componentSignup =  this;
        //Ajax Jquery
          $.ajax({
                 type: "POST",
                 url: "/folder",
                 // The key needs to match your method's input parameter (case-sensitive).
                 data: values,
                 success: function(data){
                     if (data == "recorded") {
                          componentSignup.setState({islog: true});;
                     }
                 },
                 failure: function(errMsg) {
                    console.log("not Ok"+errMsg);
                      $(err).html( data.error );
                  $("#err").html( "<p> erreur d'enregistrement</p>" );;
                 }
         });

     console.log(values);

    }
    render() {
        var redirectComponent;
        if (this.state.islog) {
            redirectComponent = <Redirect  to="/loginPage"/>
        }
      return (
          <div>
            {redirectComponent}
                  <Header/>
                  <div id='err' color=""></div>
              <FolderXForm onSubmit={this.submit}/>
          </div>
    );
 }
}

module.exports = Folder;
