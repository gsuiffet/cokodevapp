var React = require('react');
var Header= require('./header');
var SignupXForm   = require('./signupForm');
var {Route, Redirect} = require('react-router');

class Signup extends React.Component {
    constructor() {
        super();
            this.submit = this.submit.bind(this);
                this.state = {islog: false};
    }
    submit(values){ // pouvait être plus facilement fait avec Fetch
             var componentSignup =  this;
        $.ajax({
            type: 'POST',
            url: "./signup",
            data: values,
            success: function (data) {
                if (data == "signed") {
                     componentSignup.setState({islog: true});;
                }
                console.log("signup",data);
            },
            error: function (error) {
                //alert('Error connecting to the server.');
                $(err).html("Error connecting to the server.");
            }
        });
    };
    render() {
        var redirectComponent;
        if (this.state.islog) {
            redirectComponent = <Redirect  to="/login"/>
        }
        return (
            <div>
            {redirectComponent}
                  <Header/>
                  <div id='err' color=""></div>
                <SignupXForm onSubmit={this.submit}/>
            </div>
        )
    }
}

module.exports = Signup;
