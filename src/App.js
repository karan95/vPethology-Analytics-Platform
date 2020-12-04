import React from "react";
import './App.css';

import {
  BrowserRouter as Router
} from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import AppRouter from "./router";
import { isUserLoggedIn } from './redux/user/user.actions';

class App extends React.Component {

  isUserAuthIn() {
    // check auth on re-render
    if (!this.props.userInfo) {
      return <Redirect to='/login' />
    }
  }

  componentDidMount() {
    if (!this.props.userInfo) {
      // check for state on hard referesh
      this.props.isUserLoggedIn();
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.isUserAuthIn()}
          <AppRouter />
        </div>
      </Router>
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
    isUserLoggedIn: () => dispatch(isUserLoggedIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
