import React from "react";
import './AdminCaseDetailViewer.css';
import { connect } from "react-redux";
import { changePendingCaseStatus } from '../../../../redux/case/case.actions';

class AdminCaseDetailViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailViewOpen: false
    };
  }

  toggleDetailView = () => {
    const flag = !this.state.isDetailViewOpen;
    this.setState({ 
      isDetailViewOpen: flag
    })
  }
  
  changeCaseStatus = (e, status) => {
      e.stopPropagation(); 
      if (this.props.userInfo && this.props.userInfo.role === 'admin') {
        this.props.changePendingCaseStatus(this.props.userInfo._id, this.props.caseInfo._id, { statusId: status });
      }
  }

  render() {
    return (
      <tr key={this.props.index} onClick={() => this.toggleDetailView()} className="case-detail-raw">
        <th scope="row">
            {this.state.isDetailViewOpen ? <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-right"></i>}
                <span className="case-view-icon">
                    <div className="btn-group btn-group-sm" role="group" aria-label="...">
                        <button type="button" onClick={(e) => this.changeCaseStatus(e, 1)} className="btn btn-outline-primary">Approve</button>
                        <button type="button" onClick={(e) => this.changeCaseStatus(e, -1)} className="btn btn-outline-danger">Reject</button>
                    </div>
                </span>
        </th>
        <td>
          {this.props.caseInfo.casename}

          {this.state.isDetailViewOpen &&
            <div className="card-group case-detail-images">
              {this.props.caseInfo.images.map((img,index) => (
                <div className="card" key={index}>
                  <div className="card-body">
                    <img className="card-img-top" src={img.url} alt="" />
                  </div>
                </div>
              ))}
            </div>
          }
        </td>
        <td>
          {this.props.caseInfo.description}
          <div>images</div>
        </td>
        <td>{this.props.caseInfo.imageNotes}</td>
      </tr>
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
    changePendingCaseStatus: (uid, caseId, status) => dispatch(changePendingCaseStatus(uid, caseId, status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCaseDetailViewer);
