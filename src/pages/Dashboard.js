import React from "react";
import { connect } from "react-redux";
import './Dashboard.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CaseAnalysisContainer from '../components/case-analysis/CaseAnalysisContainer';
import CaseAnalysisWizard from '../components/case-analysis/wizard/CaseAnalysisWizard';
import CaseAnalysisAdminConsole from '../components/case-analysis/admin/CaseAnalysisAdminConsole';

import { logoutUser } from '../redux/user/user.actions';

class Dashboard extends React.Component {

    render() {
    
      return (
        <Router>
          <div>
            <div className="container-fluid">
              <div className="row">
                  <div className="col-2 bg-dark position-fixed" id="sticky-sidebar">
                      <div className="nav flex-column flex-nowrap vh-100 overflow-auto text-white p-2">
                      <ul className="navbar-nav list-inline mx-auto justify-content-center">
                        <li className="nav-item active">
                          <img src="https://res.cloudinary.com/karanthakor/image/upload/c_scale,w_73/v1606984283/icon_s318jf.png" alt="Avatar" className="image"/>
                        </li>
                        <li className="nav-item active">
                          <i className="fa fa-user user-icon"></i> {this.props.userInfo?.name}
                        </li>
                        <li className="nav-item active">
                          <Link to="/" className="nav-link list-inline-item ">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/case-wizard" className="nav-link list-inline-item">Case Wizard</Link>
                        </li>
                        {
                          (this.props.userInfo?.role === "admin") && <li className="nav-item">
                              <Link to="/admin" className="nav-link list-inline-item">Admin Console</Link>
                            </li>
                        }
                        <li className="nav-item active">
                          <p onClick={this.props.logoutUser} className="nav-link list-inline-item logout-btn">Logout</p>
                        </li>
                        </ul>
                      </div>
                  </div>
                  <div className="col-10 offset-2" id="main">
                      <Switch>
                        <Route exact path="/" component={CaseAnalysisContainer} />
                        <Route exact path="/case-wizard" component={CaseAnalysisWizard} />
                        {
                          (this.props.userInfo?.role === "admin") && <Route exact path="/admin" component={CaseAnalysisAdminConsole} />
                        }
                      </Switch>
                  </div>
              </div>
            </div>
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
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
