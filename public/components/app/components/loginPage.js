var React = require('react');
var Header   = require('./Header');


class LoginPage extends React.Component {
    constructor() {
        super();
    }

    render() {


        return (
            <div>
            <Header/>
     Bienvenue sur votre espace privé coKoDev
            </div>
        )
    }
}

module.exports = LoginPage;
