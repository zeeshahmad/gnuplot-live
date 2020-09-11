import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {

  render() {
    return(
      <div className="btn-group navbar-component" role="group">
        <button className="btn btn-outline-primary"
          onClick={this.props.handleOpenBtn}
           disabled={this.props.file != null}>Open</button>
        <button className="btn btn-outline-primary"
          onClick={this.props.handleSaveBtn} disabled={this.props.file == null}>Save</button>
        <button className="btn btn-outline-primary"
          onClick={(e) => {}} disabled={this.props.file == null}>Close</button>
      </div>
    );
  }
}

export default Navbar;
