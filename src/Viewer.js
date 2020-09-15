import React from 'react';



class Viewer extends React.Component {


  render() {
    let imagetag;
    if (this.props.file == null && (this.props.filecontent||'').trim().length<1) {
      imagetag = <samp>no code to plot</samp>;
    } else {
      imagetag = <img src={this.props.source} style={{maxWidth: '570px'}} alt="Gnuplot error or other problem showing plot." className="float-right" />

    }
    return(
      <div className="cos-xs-6 mr-auto">
        <div className="card bg-light text-left" style={{width: '600px'}}>
          <div className="card-header">png view</div>
          <div className="card-body">{imagetag}
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;
