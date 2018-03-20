
const { app, BrowserWindow } = require('electron'),
      path                   = require('path'),
      electronReload         = require('electron-reload');

const pathBuild    = path.join(__dirname, 'build'),
      pathElectron = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');

let win;

electronReload(pathBuild, {
  electron: pathElectron
});

app.on('ready', () => {

  win = new BrowserWindow({
    width: 750,
    height: 700,
    frame: false,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#ffffff',
    fullscreenable: true
  });

  win.loadURL(`file://${pathBuild}/index.html`);

});

app.on('window-all-closed', () => {

  app.quit();

});
