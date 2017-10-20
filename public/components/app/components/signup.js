var React = require('react');
var connect   = require('react-redux').connect;
var Field = require('redux-form').Field;
var reduxForm = require('redux-form').reduxForm;

class Signup extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={ this.props.handleSubmit }>
                        <Field type="text" placeholder="username" name="username" component="input"/>
                        <Field type="text" placeholder="firstname" name="firstname" component="input"/>
                        <Field type="text" placeholder="lastname" name="lastname" component="input"/>
                        <Field type="text" placeholder="email" name="email" component="input"/>
                        <Field type="password" placeholder="password" name="password" component="input"/>
                        <button type="submit">Valider</button>
                    </form>
                </div>
            </div>
        )
    }
}

var SignupXForm = reduxForm({
    form: 'signup'
})(Signup);

module.exports = SignupXForm;
