# gnuplot-live
live editor for gnuplot when one is too lazy to switch windows

[download installer](https://github.com/zeeshahmad/gnuplot-live/releases/download/v0.1.1/gnuplot-live.Setup.0.1.0.exe)

![gnuplot live demo](gnuplot-live-demo.gif)

# development 
clone repository

`npm install`

`npm run electron-dev` (for development)

# building

clone repository

`npm install`

`npm run build`

copy `electron.js` from `src` into `build` (yet to find a neat way to omit this step)

`npm run electron-pack`

# usage

0. install gnuplot
1. point to `gnuplot.exe` in `config` area
2. open `.plt` file or type gnuplot code in editor
3. use


# other features
- Monitor data files for changes to automatically update plot by adding "`#@watch`" comment to gnuplot file e.g. `#@watch 'myplotdata.dat'`

