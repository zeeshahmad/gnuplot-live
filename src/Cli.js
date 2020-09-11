import React from 'react';

import './Cli.css';

class Cli extends React.Component {



  render() {
    return(
      <div className="cos-xs-6">
      <div className="card text-white bg-dark text-left" style={{width: '600px', height: '300px'}}>
        <div className="card-header">cmd output</div>
        <div className="card-body p-2 overflow-auto">
          <small><samp>{this.props.clioutput}</samp></small>
        </div>
      </div>
      </div>
    );
  }
}

export default Cli;
