var React = require('react');
var SignupXForm   = require('./signup');

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <SignupXForm/>
            </div>
        )
    }
}

module.exports = App;