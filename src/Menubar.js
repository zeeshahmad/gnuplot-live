import React from 'react';



class Menubar extends React.Component {


  render() {
    return(
      <div className="text-left">
        <div className="btn-group" role="group">
          <button className="btn btn-primary"
            onClick={this.props.handleOpenBtn}
            disabled={this.props.file != null}>Open</button>
          <button className="btn btn-light"
            onClick={this.props.handleSaveBtn}
            disabled={this.props.file==null}>Save</button>
          <button className="btn btn-dark"
            onClick={this.props.handleCloseBtn}
            disabled={this.props.file==null}>Close</button>
          <button className="btn btn-info"
            onClick={this.props.handleRunBtn}>Run</button>
          {/*<button className="btn btn-outline-success" disabled={this.props.file==null}
            onClick={this.props.handleExportBtn}>Export</button>*/}
        </div>
        <samp className="d-inline-flex ml-2">current file: {this.props.file}</samp>
      </div>
    );
  }
}

export default Menubar;
