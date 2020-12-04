import React from "react";
import './Login.css';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { authenticateUser, createUserAccount } from '../redux/user/user.actions';
const BG_IMAGE = 'home-bg-image';

const INIT_STATE = {
    username: '',
    password: '',
    signup_username: '',
    signup_name: '',
    signup_password: '',
    signup_password2: '',
    viewType: 'login'
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = INIT_STATE;

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: target.value
        });
    }

    // toggle btwn login/signup
    toggleSignInScreen() {
        if (this.state.viewType !== 'login') {
            this.setState({
                viewType: 'login'
            });
        } else {
            this.setState({
                viewType: 'signup'
            });
        }
        
    }

    validateUser = () =>  {
        this.props.authenticateUser({ username: this.state.username, password: this.state.password});
    }

    signupUser = () => {
        this.props.createUserAccount({ username: this.state.signup_username, name: this.state.signup_name, password: this.state.signup_password2});
        // reverting state
        this.setState({
            INIT_STATE
        });
    }

    renderRedirect() {
        if (this.props.userInfo) {
            return <Redirect to='/' />
          }
    }

    componentDidMount() {
        // set BG image for login screen
        document.body.classList.add(BG_IMAGE);
    }
    componentWillUnmount() {
        document.body.classList.remove(BG_IMAGE);
    }

    render() {
      let loginBody;
      if (this.state.viewType === 'login') {
        loginBody = <div>
        <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.handleInputChange} placeholder="Enter Username" />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.handleInputChange} placeholder="Enter Password" />
        </div>
        <div className="form-group">
            <p className="text-center">By signing up you accept our Terms Of Use</p>
        </div>
        <div className="col-md-12 text-center ">
            <button type="submit" onClick={() => this.validateUser()} disabled={this.state.username.trim().length < 3 || this.state.password.trim().length < 5} className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
        </div>
      </div>
      } else {
        loginBody = <div>
        <div className="form-group">
            <label>Username</label>
            <input type="text" name="signup_username" className="form-control" value={this.state.signup_username} onChange={this.handleInputChange} placeholder="Enter Username" />
        </div>
        <div className="form-group">
            <label>Name</label>
            <input type="text" name="signup_name" className="form-control" value={this.state.signup_name} onChange={this.handleInputChange} placeholder="Enter Name" />
        </div>
        <div className="form-group">
            <label>Enter Password</label>
            <input type="password" name="signup_password" className="form-control" value={this.state.signup_password} onChange={this.handleInputChange} placeholder="Enter Password" />
        </div>
        <div className="form-group">
            <label>Re-enter Password</label>
            <input type="password" name="signup_password2" className="form-control" value={this.state.signup_password2} onChange={this.handleInputChange} placeholder="Enter Password" />
        </div>
        <div className="form-group">
            <p className="text-center">By signing up you accept our Terms Of Use</p>
        </div>
        <div className="col-md-12 text-center ">
            <button type="submit"
                onClick={() => this.signupUser()}
                disabled={this.state.signup_username.trim().length < 3 || this.state.signup_name.trim().length < 3 || this.state.signup_password.trim().length < 5 || this.state.signup_password2.trim().length < 5 || (this.state.signup_password !== this.state.signup_password2) } 
                className=" btn btn-block mybtn btn-primary tx-tfm">Sign Up</button>
        </div>
      </div>
      }
      
      return (
        <div className="container">
            {this.renderRedirect()}
            <div className="row">
			    <div className="col-md-5 mx-auto">
                    <div className="myform form ">
                        <div className="logo mb-3">
                            <div className="col-md-12 text-center">
                                <h2 className="darkslategrey">Welcome to vPethology Analytics Platform</h2>
                            </div>
                        </div>
                        {loginBody}
                          <div className="col-md-12 ">
                              <div className="login-or">
                                  <span className="span-or">or</span>
                              </div>
                          </div>
                          <div className="form-group">
                                <p className="text-center">
                                    Don't have account?
                                    {this.state.viewType === 'login' ? <span className="sign-in-link" onClick={() => this.toggleSignInScreen()}>Sign up here</span> : <span className="sign-in-link" onClick={() => this.toggleSignInScreen()}>Go back to login</span> }
                                </p>
                          </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
    return {
      userInfo: state.user.userInfo,
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
      authenticateUser: (user) => dispatch(authenticateUser(user)),
      createUserAccount: (newUser) => dispatch(createUserAccount(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
