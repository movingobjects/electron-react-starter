
const { app, BrowserWindow } = require('electron'),
      electronReload         = require('electron-reload');

let win,
    pathBuild = `${__dirname}/build/`;

electronReload(pathBuild);

app.on('ready', () => {

  win = new BrowserWindow({
    width: 750,
    height: 500
  });

  win.loadURL(`file://${pathBuild}index.html`);

});

app.on('window-all-closed', () => {

  app.quit();

});
