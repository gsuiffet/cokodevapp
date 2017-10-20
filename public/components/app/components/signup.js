var React = require('react');
var Field = require('redux-form').Field;
var reduxForm = require('redux-form').reduxForm;


class Signup extends React.Component {
    constructor() {
        super();
    }
    submit(values){ // pouvait être plus facilement fait avec Fetch
        $.ajax({
            type: 'POST',
            url: "./signup",
            data: values,
            success: function (data) {
                console.log("signup",data);
            },
            error: function (error) {
                //alert('Error connecting to the server.');
                $(err).html("Error connecting to the server.");
            }
        });
    };
    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.submit}>
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