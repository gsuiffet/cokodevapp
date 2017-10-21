var React = require('react');
var reduxForm = require('redux-form').reduxForm;
var Field = require('redux-form').Field;

class LoginForm extends React.Component {

    constructor() {
        super();
    }

      render() {
        return (

                <div className="form-signin">
                          <form onSubmit={ this.props.handleSubmit }>
                            <div>
                             <Field component="input" className="form-control" type="email" name="email" placeholder="Email" />
                             </div>
                             <div>
                              <Field component="input" className="form-control" type="password" name="password"  placeholder="Password" />
                              </div>
                             <button type="submit" >Submit</button>
                           </form>
                     </div>

      );
   }
}
//-----Conteneur
var LoginXForm = reduxForm({
  form: 'login'
})(LoginForm);

 module.exports = LoginXForm;
