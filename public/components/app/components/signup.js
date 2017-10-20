var React = require('react');
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
                    User :
                        <Field type="text" placeholder="username" name="username" component="input"/>
                        <Field type="text" placeholder="lastname" name="lastname" component="input"/>
                        <Field type="text" placeholder="firstname" name="firstname" component="input"/>
                        <Field type="text" placeholder="email" name="email" component="input"/>
                        <Field type="password" placeholder="password" name="password" component="input"/>
                        <br/>
                        Folder :
                            <Field type="text" placeholder="name" name="nameFolder" component="input"/>
                            <Field type="text" placeholder="description" name="descriptionFolder" component="input"/>
                            <Field type="text" placeholder="shared or private" name="statussharedFolder" component="input"/>
                            <br/>
                            Snippet :
                                <Field type="text" placeholder="name" name="nameSnippet" component="input"/>
                                <Field type="text" placeholder="description" name="descriptionSnippet" component="input"/>
                                <Field type="text" placeholder="tag" name="tagSnippet" component="input"/>
                                    <Field type="text" placeholder="content" name="contentSnippet" component="input"/>
                                    <Field type="date" placeholder="date" name="date" component="input"/>
                                    <Field type="text" placeholder="type of language" name="typelanguage" component="input"/>
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
