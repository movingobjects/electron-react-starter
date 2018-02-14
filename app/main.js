
const { app, BrowserWindow } = require('electron'),
      electronReload         = require('electron-reload');

let win;

electronReload(__dirname + '/app/build/');

app.on('ready', () => {

  win = new BrowserWindow({
    width: 750,
    height: 500
  });

  win.loadURL(`file://${__dirname}/app/build/index.html`);

});

app.on('window-all-closed', () => {

  app.quit();

});
