var React = require('react');
var Field = require('redux-form').Field;
var reduxForm = require('redux-form').reduxForm;

class SignupForm extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={ this.props.handleSubmit }>
                    User :
                        <div>
                        <Field type="text" placeholder="username" name="username" component="input"/>
                        </div>
                        <div>
                        <Field type="text" placeholder="lastname" name="lastname" component="input"/>
                        </div>
                        <div>
                        <Field type="text" placeholder="firstname" name="firstname" component="input"/>
                        </div>
                        <div>
                        <Field type="text" placeholder="email" name="email" component="input"/>
                        </div>
                        <div>
                        <Field type="password" placeholder="password" name="password" component="input"/>
                        </div>

                        <br/>
                        Folder :
                        <div>
                            <Field type="text" placeholder="name" name="nameFolder" component="input"/>
                                    </div>
                                    <div>
                            <Field type="text" placeholder="description" name="descriptionFolder" component="textarea"/>
                                    </div>
                                    <div>
                            <Field type="text" name="statussharedFolder" component="select">
                            <option></option>
                                <option value="shared">shared</option>
                                <option value="private">private</option>
                                </Field>
                                        </div>
                            <br/>
                            Snippet :
                            <div>
                                <Field type="text" placeholder="name" name="nameSnippet" component="input"/>
                                        </div>
                                        <div>
                                <Field type="text" placeholder="description" name="descriptionSnippet" component="textarea"/>
                                        </div>
                                        <div>
                                <Field type="text" placeholder="tag" name="tagSnippet" component="input"/>
                                        </div>
                                        <div>
                                    <Field type="text" placeholder="content" name="contentSnippet" component="input"/>
                                            </div>
                                            <div>
                                    <Field type="date" placeholder="date" name="date" component="input"/>
                                            </div>
                                            <div>
                                    <Field type="text" placeholder="type of language" name="typelanguage" component="select">
                                            <option></option>
                                                <option value="JS">Javascript</option>
                                                <option value="HTML">HTML</option>
                                                <option value="CSS">CSS</option>
                                                    <option value="C">C</option>
                                                    <option value="C++">C++</option>
                                                    <option value="PHP">PHP</option>
                                                    <option value="OC">Objective C</option>
                                                    <option value="Python">Python</option>
                                                </Field>
                                                        </div>
                                                        <div>
                             <button type="submit">Valider</button>
                                     </div>
                    </form>
                </div>
            </div>
        )
    }
}

var SignupXForm = reduxForm({
    form: 'signup'
})(SignupForm);

module.exports = SignupXForm;
