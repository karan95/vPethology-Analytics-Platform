import React from "react";
import './CaseAnalysisContainer.css';
import { connect } from "react-redux";

import {
  Link
} from "react-router-dom";
import { getAllCases, getAllCasesForAdmin } from '../../redux/case/case.actions';
import CaseListViewer from './list-view/CaseListViewer';

class CaseAnalysisContainer extends React.Component {
  fetchAllCases = () => {
    if (this.props.userInfo && this.props.userInfo._id) {
      if (this.props.userInfo.role === 'admin') {
        this.props.getAllCasesForAdmin(this.props.userInfo._id);
      } else {
        this.props.getAllCases(this.props.userInfo._id);
      }
    }
  }

  componentDidMount() {
    // get all case analysis
    this.fetchAllCases();
  }

  render() {
    return (
      <div className="case-analysis-div">
        <h3 className="darkslategrey">Welcome to case management console</h3>
        <Link to="/case-wizard">
          <button type="button" className="btn btn-outline-primary btn-md">Create a new case</button>
        </Link>
        <CaseListViewer caseList={this.props.caseList}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    caseList: state.caseAnalysisConsole.caseListView.caseList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCases: (uid) => dispatch(getAllCases(uid)),
    getAllCasesForAdmin: (uid) => dispatch(getAllCasesForAdmin(uid))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseAnalysisContainer);
