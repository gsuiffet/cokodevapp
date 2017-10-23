var React = require('react');
var reduxForm = require('redux-form').reduxForm;
var Field = require('redux-form').Field;

class FolderForm extends React.Component {

    constructor() {
        super();
    }

      render() {
        return (

                <div>
                          <form onSubmit={ this.props.handleSubmit }>
                          Folder :
                          <div>
                              <Field type="text" placeholder="Nom du dossier" name="folderName" component="input"/>
                                      </div>
                                      <div>
                              <Field type="text" placeholder="Description" name="folderDescription" component="textarea"/>
                                      </div>
                                      <div>
                              <Field type="text" name="Status du dossier" component="select">
                              <option></option>
                                  <option value="shared">shared</option>
                                  <option value="private">private</option>
                                  </Field>
                                          </div>
                                          <div>
                             <button type="submit" >Submit</button>
                             </div>
                           </form>
                     </div>
      );
   }
}
//-----Conteneur
var FolderXForm = reduxForm({
  form: 'folder'
})(FolderForm);

 module.exports = FolderXForm;
