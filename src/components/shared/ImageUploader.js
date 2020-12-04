import React from "react";
import './ImageUploader.css';

class ImageUploader extends React.Component {

  render() {
    const uploadedImages = this.props.images.map((image, index) => (    
        <div className="col-sm-4" key={index}>
          <div className="card">
            <div className="card-body image-card">
              <img className="card-img-top" src={image.url} alt="" />
              <div className="input-group input-group-sm mb-1">
                <input type="text" className="form-control" value={image.tagInputVal} onChange={(e) => this.props.onImageTagInputChange(e, index)} placeholder="Image Tags" aria-label="Image Tag" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary fa fa-plus" disabled={image.tagInputVal.trim().length === 0} onClick={() => this.props.addTagtoImage(index, image.tagInputVal)} type="button"></button>
                </div>
              </div>
              <div className="img-labels-section">
                { image.tags.map((tag, tagIndex) => (
                    <span className="image-label" key={tagIndex}>
                      {tag} <i className="fa fa-times-circle"></i>
                  </span>
                )) }
               
              </div>
              <div className="remove-image-btn">
                <button className="btn btn-sm btn-outline-danger" type="button">Remove</button>
              </div>
            </div>
          </div>
        </div>
    ))

    return (
      <div>
        <div className="custom-file col-md-4 image-upload-btn">
          <input type="file" className="custom-file-input" accept="image/png, image/jpeg" onChange={(e) => this.props.onImagesUpload(e)} multiple/>
          <label className="custom-file-label" htmlFor="inputGroupFile01">Upload Images</label>
        </div>
        <div className="row uploaded-imgs">
          {
            uploadedImages
          }
        </div>
      </div>
    );
  }
}

export default ImageUploader;
