import React from "react";
import './CaseDetailViewer.css';
import { connect } from "react-redux";
import {
  Redirect
} from "react-router-dom";
import { editSelectedCase } from '../../../../redux/case/case.actions';

class CaseDetailViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailViewOpen: false,
      caseEditInitiated: false,
    };
  }

  toggleDetailView = () => {
    const flag = !this.state.isDetailViewOpen;
    this.setState({ 
      isDetailViewOpen: flag
    })
  }

  EditSelectedCase = (e) => {
    if (this.props.caseInfo.statusId > -1) return;
    e.stopPropagation();
    if (this.props.caseInfo && this.props.caseInfo._id && this.props.caseInfo.statusId === -1) {
      this.props.editSelectedCase(this.props.caseInfo._id);
      this.setState({
        caseEditInitiated: true
      });
    }
  }

  render() {
    // redirect to case edition wizard page
    if (this.state.caseEditInitiated) {
      return <Redirect to="/case-wizard" />
    }
    return (
      <tr key={this.props.index} onClick={() => this.toggleDetailView()} className="case-detail-raw">
        <th scope="row">
          <i className={"fa fa-edit "+ (this.props.caseInfo.statusId > -1 ? "gray": "")} role="button" onClick={(e) => this.EditSelectedCase(e)}></i>
          <span className="case-view-icon">
            {this.state.isDetailViewOpen ? <i className="fa fa-caret-down"></i> : <i className="fa fa-caret-right"></i>}
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
        <td>{this.props.caseInfo.status}</td>
        <td>{this.props.caseInfo.imageNotes}</td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    editSelectedCase: (caseId) => dispatch(editSelectedCase(caseId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseDetailViewer);
