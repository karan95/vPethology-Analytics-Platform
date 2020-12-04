import React from "react";
import './CaseAnalysisAdminConsole.css';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

import { getAllPendingCases } from '../../../redux/case/case.actions';
import AdminCaseListViewer from './admin-case-list/AdminCaseListViewer';

class CaseAnalysisAdminConsole extends React.Component {
    componentDidMount() {
        if (this.props.userInfo && this.props.userInfo.role === 'admin') {
            this.props.getAllPendingCases(this.props.userInfo._id);
        }
    }

    renderRedirect() {
        if (this.props.userInfo && this.props.userInfo.role !== 'admin') {
            return <Redirect to='/' />
        }
    }

  render() {
    this.renderRedirect()
    return (
      <div className="case-analysis-div">
        <h3 className="darkslategrey">Welcome to Admin console</h3>
        <AdminCaseListViewer caseList={this.props.casePendingList}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    casePendingList: state.caseAnalysisConsole.admin.casePendingList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPendingCases: (uid) => dispatch(getAllPendingCases(uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseAnalysisAdminConsole);
