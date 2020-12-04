import React from "react";
import './AdminCaseListViewer.css';
import { connect } from "react-redux";
import AdminCaseDetailViewer from '../admin-detail-view/AdminCaseDetailViewer';
import { changeAllPendingCaseStatus } from '../../../../redux/case/case.actions';

class AdminCaseListViewer extends React.Component {

    changeAllCaseStatus = (status) => {
        if (this.props.userInfo && this.props.userInfo.role === 'admin') {
          this.props.changeAllPendingCaseStatus(this.props.userInfo._id, { statusId: status });
        }
    }

    render() {
        let table;
        if (this.props?.caseList.length > 0) {
            table = <table className="table case-table table-hover">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                                <button type="button" onClick={() => this.changeAllCaseStatus(1)} className="btn btn-outline-primary">Approve All</button>
                                <button type="button" onClick={() => this.changeAllCaseStatus(-1)} className="btn btn-outline-danger">Reject All</button>
                            </div>
                        </th>
                        <th scope="col" className="w-25">Case Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Image Information</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.caseList.map((caseInfo, index) => (
                            <AdminCaseDetailViewer key={index} caseInfo={caseInfo} />
                        ))
                    }
                </tbody>
            </table>
        } else {
            table = <p>No case records to display.</p>
        }
        return (
            <div className="case-list-div">
                {table}
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
        changeAllPendingCaseStatus: (uid, status) => dispatch(changeAllPendingCaseStatus(uid, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCaseListViewer);
