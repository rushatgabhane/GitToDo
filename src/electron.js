const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 320,
        height: 320,
        frame: true,
    });
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`,
    );
    mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        return;
    }
    app.quit();
});

app.on('activate', () => {
    if (mainWindow != null) {
        return;
    }
    createWindow();
});
