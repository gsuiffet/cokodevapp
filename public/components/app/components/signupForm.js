var React = require('react');
var Field = require('redux-form').Field;
var reduxForm = require('redux-form').reduxForm;

class SignupForm extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (

                <div>
                    <form onSubmit={ this.props.handleSubmit }>
                        <div>
                        <Field type="text" placeholder="Pseudo" name="userName" component="input"/>
                        </div>
                        <div>
                        <Field type="text" placeholder="Nom" name="lastName" component="input"/>
                        </div>
                        <div>
                        <Field type="text" placeholder="Prénom" name="firstName" component="input"/>
                        </div>
                        <div>
                        <Field type="text" placeholder="email" name="email" component="input"/>
                        </div>
                        <div>
                        <Field type="password" placeholder="Mot de passe" name="password" component="input"/>
                        </div>
                        <div>
                             <button type="submit">Valider</button>
                                     </div>
                    </form>
                </div>

        )
    }
}

var SignupXForm = reduxForm({
    form: 'signup'
})(SignupForm);

module.exports = SignupXForm;
