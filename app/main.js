
const { app, BrowserWindow } = require('electron'),
      electronReload         = require('electron-reload');

const BUILD_FOLDER = `/build/`;

let win;

electronReload(__dirname + BUILD_FOLDER);

app.on('ready', () => {

  win = new BrowserWindow({
    width: 750,
    height: 500
  });

  win.loadURL(`file://${__dirname}${BUILD_FOLDER}index.html`);

});

app.on('window-all-closed', () => {

  app.quit();

});
