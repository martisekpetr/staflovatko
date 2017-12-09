import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fileDownload from 'js-file-download';
import * as stafleSelectors from 'modules/stafle/stafleSelectors';
import * as ActionTypes from 'constants/actionTypes';
import buildActionCreators from 'helpers/buildActionCreators';


class FileManagement extends React.Component {

  handleFileUpload = (evt) => {
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
      alert('The File APIs are not fully supported in this browser.');
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      this.props.updateLayout(JSON.parse(fr.result.toString()));
      console.log(fr.result.toString());
    };
    fr.readAsText(evt.target.files[0]);

    // if not nulled, the onChange event won't fire when uploading the same file again
    this.refs.fileInput.value = null;
  };

  handleFileDownload = () => {
    fileDownload(JSON.stringify(this.props.layout), 'getLayout.json');
  };


  render() {
    return (
      <React.Fragment>
        <input ref="fileInput" type="file" accept=".json" onChange={this.handleFileUpload}/>
        <button onClick={this.handleFileDownload}>Download layout</button>
      </React.Fragment>
    )
  }
}


FileManagement.propTypes = {
  layout: PropTypes.shape({}),
  updateLayout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  layout: stafleSelectors.getLayout(state),
});

export default connect(
  mapStateToProps,
  buildActionCreators({
    updateLayout: ActionTypes.UPDATE_LAYOUT,
  })
)(FileManagement);
