var React = require('react');
var Header   = require('./header');
var Snippet   = require('./snippet');
var Folder   = require('./folder')
class App extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <Snippet/>
            </div>
        )
    }
}

module.exports = App;
