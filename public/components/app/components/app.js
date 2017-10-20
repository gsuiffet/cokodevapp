var React = require('react');
var SignupXForm   = require('./signup');

class App extends React.Component {
    constructor() {
        super();
            this.submit = this.submit.bind(this);
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
                <SignupXForm onSubmit={this.submit}/>
            </div>
        )
    }
}

module.exports = App;
