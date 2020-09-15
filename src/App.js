import React from 'react';
import './App.css';
import Editor from './Editor.js';
import Viewer from './Viewer.js';
import Cli from './Cli.js';
import Menubar from './Menubar.js';
import Config from './Config.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HotKeys from 'react-hot-keys';

var fn = require('./AppFunctions.js');


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      filecontent: null,
      gnuplot: fn.getFromStore('gnuplot'),
      clioutput: '',
      viewimage: '',
      watches: [],
      editorIsLive: true
    };
  }

  testmagick() {
    console.log("testmagick");
    fn.testmagick(this)
  }



  render() {
    return (

      <Router>
        <Switch>
          <Route path="/">
            <HotKeys keyName={'ctrl+s'} onKeyDown={()=>{fn.onSaveShortCut(this)}}>
            <div className="App">

              <Menubar
                handleOpenBtn={() => {fn.handleOpenBtn(this)}}
                handleSaveBtn={() => {fn.handleSaveBtn(this)}}
                handleCloseBtn={() => {fn.handleCloseBtn(this)}}
                handleRunBtn={() => {fn.runBufferCode(this)}}
                file={this.state.file} />
              <div className="container mw-100"><div className="row flex-nowrap">
                <Editor filecontent={this.state.filecontent}
                  handleContentChange={(newcontent) => {fn.handleContentChange(newcontent, this)}}
                  handleSaveShortCut={() => {fn.onSaveShortCut(this)}}
                  live={this.state.editorIsLive}
                  handleLiveToggle={(e) => {this.setState({editorIsLive: e.target.checked}) }} />
                <Viewer source={this.state.viewimage} file={this.state.file}
                  filecontent={this.state.filecontent} />
              </div><div className="row flex-nowrap">
                <Cli clioutput={this.state.clioutput} />
                <Config gnuplot={this.state.gnuplot}
                  handleChooseGnuplot={(files)=>{fn.handleChooseGnuplot(this, files)}} />
              </div></div>
            </div>
            </HotKeys>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
