import React from "react";
import './CaseAnalysisWizard.css';
import { connect } from "react-redux";

import ImageUploader from '../../shared/ImageUploader';
import { createNewCase, editCase, clearCaseUpdateNotification, caseEditDiscarded } from '../../../redux/case/case.actions';
import { getCaseAnalysis } from '../../../api/cases';

const API_URL = 'https://caseanalysisserver.karanthakor.repl.co';

const initialState =  {
  caseId: '',
  casename: '',
  description: '',
  images: [],
  imageNotes: ''
};

class CaseAnalysisWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.userInfo && this.props.userInfo._id && this.props.caseEditId) {
      this.initEditCaseMode(this.props.userInfo._id, this.props.caseEditId);
      
    }
  }

  initEditCaseMode(uid, caseId) {
    // init edit case mode
    getCaseAnalysis(uid, caseId)
        .then(res => res.json())
        .then(data => {
          const { casename, description, imageNotes, images, _id } = data;
          this.setState({
            caseId: _id,
            casename: casename,
            description: description,
            images: images,
            imageNotes: imageNotes
          })
        });
  }

  componentWillUnmount() {
    // discard edit case mode
    if (this.props.caseEditId) {
      this.props.caseEditDiscarded();
      this.props.clearCaseUpdateNotification();
    }
  }

  onFormInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // images upload related handlers
  onImagesUpload = e => {
    const files = Array.from(e.target.files)
    const formData = new FormData()
    files.forEach((file, i) => {
      formData.append(i, file)
    })

    fetch(`${API_URL}/image-upload`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      images.map((img) => img.tagInputVal = '');
      let imgs = this.state.images;
      imgs = [...imgs, ...images];
      this.setState({ 
        images: imgs
      })
    })
  }

  // onImageRemove = index => {
    
  // }

  onImageTagInputChange = (e, index) => {
    let imgs = [...this.state.images];
    // updating input tag value of selected image card
    this.setState({ 
      images: [
        ...imgs.slice(0, index),
        {
          ...imgs[index],
          tagInputVal: e.target.value,
        },
        ...imgs.slice(index + 1)
      ]
    });
  }

  addTagtoImage = (index, tagStr) => {
    let imgs = [...this.state.images];
    let imgObj = {...imgs[index]};
    imgObj.tags.push(tagStr);
    imgObj.tagInputVal = '';
    this.setState({ 
      images: [
        ...imgs.slice(0, index),
        imgObj,
        ...imgs.slice(index + 1)
      ]
    });
  }
  
  onNewCaseFormSubmit = () => {
    if (this.validateUserInput()) {
      if (this.props.caseEditId) {
        // edit case mode
        this.props.editCase({ userId: this.props.userInfo._id, caseId: this.state.caseId, data: this.state });
        this.props.caseEditDiscarded();
      } else {
        // create case mode
        this.props.createNewCase({ userId: this.props.userInfo._id, data: this.state });
      }
    }
    // reset form
    this.resetCaseForm();
  }

  resetCaseForm = () => {
    this.setState(initialState);
    this.props.clearCaseUpdateNotification();
  }

  onCancelFormEdit = () => {
    if (this.props.caseEditId) {
      this.props.caseEditDiscarded();
    }
    this.resetCaseForm();
  }

  validateUserInput = () => {
    if (this.state.casename.trim().length > 2 && this.state.description.trim().length > 2 && this.state.images.length > 0) return true;
    return false;
  }

  render() {
    const isCaseFormValid = this.validateUserInput();

    return (
      <div className="case-wizard-div">
        <h3 className="darkslategrey">Welcome to case creation wizard</h3>
        {this.props.caseEditId && <h5 className="darkgoldenrod">Case Edit Mode:</h5>}
        <p>Please fill out all the information required to submit a case.</p>
        <div className="border">
          <div className="case-wizard-elements">
            <div className="input-group mb-2 col-md-6">
              <input type="text" className="form-control" name='casename' value={this.state.casename} onChange={(e) => this.onFormInputChange(e)} placeholder="Case Name" aria-label="casename" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-2 col-md-6">
              <textarea type="text" className="form-control" name='description' value={this.state.description} onChange={(e) => this.onFormInputChange(e)} placeholder="Case Description" aria-label="description" aria-describedby="basic-addon1" />
            </div>
            <div className="col-md-12 mb-1">
              <ImageUploader 
                images={this.state.images}
                onImagesUpload={this.onImagesUpload}
                onImageTagInputChange={this.onImageTagInputChange}
                addTagtoImage={this.addTagtoImage} 
              />
            </div>
            <div className="input-group mb-2 col-md-6">
              <input type="text" className="form-control" name='imageNotes' value={this.state.imageNotes} onChange={(e) => this.onFormInputChange(e)} placeholder="General notes about images" aria-label="imagenotes" aria-describedby="basic-addon1" />
            </div>
            { this.props.status && <p className="darkgreen">{ this.props.status }</p> }
          </div>
          <div className="wizard-controls-group">
            <button type="button" disabled={!isCaseFormValid} onClick={() => this.onNewCaseFormSubmit()} className="btn btn-primary">Submit</button>
            <button type="button" onClick={() => this.onCancelFormEdit()} className="btn btn-outline-primary">Cancel</button>
            <button type="button" onClick={() => this.resetCaseForm()} className={"btn btn-outline-danger "+(this.props.caseEditId ? 'hidden': '')}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.userInfo,
    status: state.caseAnalysisConsole.caseWizard.status,
    caseEditId: state.caseAnalysisConsole.caseWizard.caseEditInProgressId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewCase: (data) => dispatch(createNewCase(data)),
    clearCaseUpdateNotification: () => dispatch(clearCaseUpdateNotification()),
    editCase: (data) => dispatch(editCase(data)),
    caseEditDiscarded: () => dispatch(caseEditDiscarded())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseAnalysisWizard);
