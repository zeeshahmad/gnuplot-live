import React from 'react';
import './Editor.css';

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


class Editor extends React.Component {

  onChange(newValue) {

    this.props.handleContentChange(newValue);

  }

  render() {
    return(
      <div className="cos-xs-6">
        <div className="card text-white bg-primary text-left" style={{width: '600px'}}>
          <div className="card-header">editor

          </div>
          <div className="card-body p-2">
          <div className="form-check form-check-inline">
          <input onChange={(e)=>{this.props.handleLiveToggle(e)}} className="form-check-input" type="checkbox" checked={this.props.live} id="editorIsLive" />
          <label className="form-check-label" htmlFor="editorIsLive">
            Enable live editing (disable when typing output file name)
          </label></div>
            <AceEditor
              mode="java"
              theme="github"
              onChange={this.onChange.bind(this)}
              name="ace-editor-component"
              editorProps={{ $blockScrolling: true }}
              setOptions ={{wrap: true}}
              value={this.props.filecontent}
              width="570px"
              commands={[{
                name: "save", bindKey: {win: "Ctrl-s", mac: "Cmd-s"}, exec: (e)=>{this.props.handleSaveShortCut()}
              }]} />
          </div>
        </div>

      </div>
    );
  }
}

export default Editor;
