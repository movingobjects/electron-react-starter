
const { app, BrowserWindow } = require('electron'),
      electronReload         = require('electron-reload');

let win,
    pathBuild = `${__dirname}/build/`;

electronReload(pathBuild);

app.on('ready', () => {

  win = new BrowserWindow({
    width: 750,
    height: 700,
    frame: false,
    titleBarStyle: 'hidden-inset',
    fullscreenable: true
  });

  win.loadURL(`file://${pathBuild}index.html`);

});

app.on('window-all-closed', () => {

  app.quit();

});
