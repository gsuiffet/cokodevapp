var React = require('react');
var Link = require('react-router-dom').Link

class Header extends React.Component {

      render() {

        return (
            <div>
                 <nav className="navbar navbar-default">
                                     <div className="container-fluid">
                                         <div className="navbar-header">
                                             <a className="navbar-brand" href="/">Home</a>
                                 </div>
                                 <div>
                                             <ul className="nav navbar-nav navbar-right">
                                                 <li><Link to="/signup">Sign up</Link></li>
                                                 <li><Link to="/login">Login</Link></li>
                                             </ul>
                                 </div>
                             </div>
                         </nav>
                     </div>

                    );
                  }
          }

    module.exports = Header;
