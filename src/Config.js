import React from 'react';

class Editor extends React.Component {
  render() {
    return(
      <div className="cos-xs-6">
      <div className="card text-white bg-secondary text-left" style={{minWidth: '600px', height: '300px'}}>
        <div className="card-header">config</div>
        <div className="card-body overflow-auto p-2">
        <div className="form-group row">
          <label className="form-control-label col-sm-4"  htmlFor="gnuplot-exec-input">gnuplot executable</label>
          <div className="col-sm-10">
            <input id="gnuplot-exec-input" type="text" className="form-control" value={this.props.gnuplot} disabled />
            <input type="file" accept=".exe" onChange={(e) => {this.props.handleChooseGnuplot(e.target.files)}} />
          </div>
        </div>
        </div>
      </div>

      </div>
    );
  }

}

export default Editor;
