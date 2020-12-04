import React from "react";
import './CaseListViewer.css';
import { connect } from "react-redux";
import CaseDetailViewer from './detail/CaseDetailViewer';
import { getAllCases, getAllCasesByFilter } from '../../../redux/case/case.actions';

 
class CaseListViewer extends React.Component {
    
    filterCasesByStatus = (e) => {
        if (this.props.userInfo && this.props.userInfo._id) {
            if (e.target.value === 'All') {
                this.props.getAllCases(this.props.userInfo._id);
            } else {
                this.props.getAllCasesByFilter(this.props.userInfo._id, {statusId: e.target.value});
            }
        }
    }

    render() {
        let tbody;
        if (this.props?.caseList.length > 0) {
            tbody = <tbody>
                {
                    this.props.caseList.map((caseInfo, index) => (
                        <CaseDetailViewer key={index} caseInfo={caseInfo}/>
                    ))
                }
            </tbody>
        } else {
            // no case records to display
            tbody = <tbody><tr><td></td><td>No case records to display.</td></tr></tbody>
        }
        return (
            <div className="case-list-div">
                <table className="table case-table table-hover">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" className="w-25">
                                Case Name
                            </th>
                            <th scope="col">Description</th>
                            <th scope="col">
                                Case Status
                                <div className="filterDiv">
                                <select className="custom-select" onChange={(e)=> this.filterCasesByStatus(e)} id="inlineFormCustomSelect">
                                    <option value="All" defaultValue>All</option>
                                    <option value="1">Approved</option>
                                    <option value="-1">Rejected</option>
                                    <option value="0">Pending</option>
                                </select>
                            </div>
                            </th>
                            <th scope="col">Image Information</th>
                        </tr>
                    </thead>
                    {tbody}
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllCases: (uid) => dispatch(getAllCases(uid)),
        getAllCasesByFilter: (uid, status) => dispatch(getAllCasesByFilter(uid, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseListViewer);
