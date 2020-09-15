var electron,dialog,fs,childProcess,path, electronStore,isDev;


try {
  electron = window.require("electron");
  isDev = window.require("electron-is-dev");
  dialog = electron.remote.dialog;
  fs = window.require('fs');
  childProcess = window.require('child_process');
  path = window.require('path');
  electronStore = window.require('electron-store');
} catch(e) {

}

const store = new electronStore();

module.exports = {
  handleOpenBtn: (this_) => {
    dialog.showOpenDialog({
      properties: ['openFile'], filters: [{ name: 'gnuplot file', extensions: ['plt'] }]
    }).then(result => {
      if (!result.canceled) {
        var filepath = result.filePaths[0];
        fs.readFile(filepath, 'utf-8', (err,data)=>{
          if (err) console.log(err);
          this_.setState({file: filepath});
          module.exports.handleContentChange(data, this_);
        });

      }
    }).catch(err => { console.log(err); });
  },

  handleCloseBtn: (this_) => {
    this_.setState({filecontent:"", file: null, viewimage: '', clioutput: 'file closed'});
  },

  onSaveShortCut: (this_) => {
    if (this_.state.file) module.exports.handleSaveBtn(this_);
  },

  handleSaveBtn: (this_) => {
    fs.writeFile(this_.state.file, this_.state.filecontent, 'utf-8', (err) => {
      if (err) console.log(err);
    });
  },


  handleContentChange: (newcontent, this_) => {

    this_.setState({filecontent: newcontent});

    if (!this_.state.editorIsLive) return;

    this_.state.watches.map((watcherfile)=>{
      fs.unwatchFile(watcherfile);
      return watcherfile;
    });


    var rawoutput = path.resolve('./gnuplotview.png');
    var lines = newcontent.split('\n');
    var newwatches = [];
    for (var i=lines.length-1; i>= 0; i--) {
      //parse #@watch comments
      if (this_.state.file && lines[i].search('#@watch')>-1) {
        var newwatch = lines[i].trim();
        var newwatchMatched = newwatch.match(/#@watch +['"](.+)['"]/);
        if (newwatchMatched == null) continue;
        newwatch = newwatchMatched[1];
        let watchpath = path.join(path.dirname(this_.state.file), newwatch);
        fs.stat(watchpath, (err)=> {
          if (err) console.log(err);
          else {
            fs.watchFile(watchpath, (curr,prev) => {
              module.exports.handleContentChange(this_.state.filecontent, this_);
            });
            newwatches.push(watchpath);
          }
        });
      }

      var precomment = lines[i].split('#')[0];
      if (precomment.search(/(?<!un)(set) +(out)/) > -1) {
        var matched = precomment.match(/(?<!un)(set) +(out[\S]*) +['"](.+)['"]/);
        if (matched) {
          rawoutput = (path.resolve(path.dirname(this_.state.file), matched[3]) );
        }
      }

    }



    this_.setState({watches: newwatches});
    if (this_.state.file== null) lines[0] = "set term png; set output 'gnuplotview.png';"+lines[0];
    var contentforbuffer = lines.join('\n');


    fs.writeFile('gnuplotbuffer.temp', contentforbuffer, 'utf-8', (err) => {
      if (err) console.log(err);
      module.exports.runBufferCode(this_, rawoutput);
    });

  },

  convertviewfile: (rawoutputimage, this_,callback) => {
    const magickexe = path.resolve('./', isDev ? '': 'resources', 'extraResources','image_magick/magick.exe');
    var cmd = magickexe + ' convert '+ rawoutputimage+ ' '+ path.resolve('./')+'/gnuplotview.png';
    module.exports.runCommand(cmd, this_).then(callback).catch((e) => {
      console.log(e);
    });
  },


  runCommand: (cmd, this_, initialOutputtext="") => {
    return new Promise(function (resolve, reject) {
      childProcess.exec(cmd, (error, stdout, stderr) => {
          var outputtext = initialOutputtext;
          if (error) {
              console.log(`error: ${error.message}`);
              outputtext += '\n' + stderr;
              reject(error);
          }
          /*if (stderr) {
              console.log(`stderr: ${stderr}`);
              outputtext += '\n' + stderr;
          }*/
          if (stdout) {
            console.log(`stdout: ${stdout}`);
            outputtext+= '\n' + stdout;
          }

          this_.setState({clioutput: outputtext});
          resolve(outputtext);
      });
    });

  },

  runBufferCode: (this_, rawoutput) => {
    var cmd = '';
    var workingdir;
    if (this_.state.file) {
      workingdir = path.dirname(this_.state.file);
    } else {
      workingdir = path.dirname('gnuplotbuffer.temp');
    }

    cmd = 'cd /d "'+workingdir+'" ';
    cmd += '&& "'+this_.state.gnuplot+'" "'+path.resolve('gnuplotbuffer.temp')+'"';
    module.exports.runCommand(cmd, this_).then(()=>{

      module.exports.convertviewfile(rawoutput, this_, () => {
        var imagepath = path.resolve('./gnuplotview.png');
        imagepath = imagepath.split('\\').join('/');
        this_.setState({viewimage: ''});
        this_.setState({viewimage: imagepath+'?'+Date.now()});

      });
    }).catch((e) => {
      this_.setState({viewimage: ''});
    });

  },

  handleChooseGnuplot: (this_, files) => {
    if (files[0]) {
      store.set('gnuplot', files[0].path);
      this_.setState({gnuplot: files[0].path});
    }
  },

  getFromStore: (key) => {
    return store.get(key);
  }/*,

  handleExportBtn: (this_) => {
    var cmd = '';
    var workingdir = path.dirname(this_.state.file);
    cmd = 'cd /d "'+workingdir+'" ';
    cmd += '&& "'+this_.state.gnuplot+'" "'+this_.state.file+'"';
    module.exports.runCommand(cmd, this_);
  }*/
};
