var React = require('react');
var Header   = require('./Header');

class App extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <Header/>
            </div>
        )
    }
}

module.exports = App;
