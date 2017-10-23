var React = require('react');
var reduxForm = require('redux-form').reduxForm;
var Field = require('redux-form').Field;

class SnippetForm extends React.Component {

    constructor() {
        super();
    }

      render() {
        return (

                <div>
                          <form onSubmit={ this.props.handleSubmit }>
                          Snippet:
                          <div>
                              <Field type="text" placeholder="Nom du snippet" name="snippetName" component="input"/>
                                      </div>
                                      <div>
                              <Field type="text" placeholder="Description" name="snippetDescription" component="textarea"/>
                                      </div>
                                      <div>
                                      <Field type="text" placeholder="Tag" name="snippetTag" component="input"/>
                                              </div>
                                              <div>
                                          <Field type="text" placeholder="Contenu" name="snippetContent" component="input"/>
                                                  </div>
                                                  <div>
                                          <Field type="date" placeholder="Date" name="date" component="input"/>
                                                  </div>
                                                  <div>
                                          <Field type="text" placeholder="Type de langage" name="languageType" component="select">
                                                  <option></option>
                                                      <option value="JS">Javascript</option>
                                                      <option value="HTML">HTML</option>
                                                      <option value="CSS">CSS</option>
                                                          <option value="C">C</option>
                                                          <option value="C++">C++</option>
                                                          <option value="PHP">PHP</option>
                                                          <option value="OC">Objective C</option>
                                                          <option value="Python">Python</option>
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
var SnippetXForm = reduxForm({
  form: 'snippet'
})(SnippetForm);

 module.exports = SnippetXForm;
