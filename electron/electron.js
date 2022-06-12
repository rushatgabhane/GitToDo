
const {
    app, BrowserWindow, ipcMain, Tray, globalShortcut,
} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let tray;
let window;

// // Don't show the app in the doc
app.dock.hide();

function createWindow() {
    window = new BrowserWindow({
        height: 600,
        width: 400,
        titleBarStyle: 'hidden',
        frame: false,
        resizable: isDev ? true : false,
        show: false,
        transparent: false,
        webPreferences: {
            // Prevents renderer process code from not running when window is
            backgroundThrottling: false,
        },
    });
    window.setWindowButtonVisibility(false);
    window.setVisibleOnAllWorkspaces(true, {visibleOnFullScreen: true});
    window.setAlwaysOnTop(true, 'floating', 1);

    window.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`,
    );

    // Hide the window when it loses focus
    window.on('blur', () => {
        if (window.webContents.isDevToolsOpened()) {
            return;
        }
        window.hide();
    });

    window.on('closed', () => (window = null));
}

function toggleWindow() {
    window.isVisible() ? window.hide() : showWindow();
}

function createTray() {
    tray = new Tray(path.join(__dirname, '../public/images/ghostTemplate.png'));
    tray.on('right-click', toggleWindow);
    tray.on('double-click', toggleWindow);
    tray.on('click', (event) => {
        toggleWindow();

        // Show devtools when command clicked
        if (window.isVisible() && process.defaultApp && event.metaKey) {
            window.openDevTools({mode: 'detach'});
        }
    });
    tray.setToolTip('GitWatch');
}

function getWindowPosition() {
    const windowBounds = window.getBounds();
    const trayBounds = tray.getBounds();

    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));

    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4);

    return {x, y};
}

function showWindow() {
    const position = getWindowPosition();
    window.setPosition(position.x, position.y, false);
    window.show();
}

app.on('ready', () => {
    createTray();
    createWindow();

    globalShortcut.register('CommandOrControl+L', () => {
        toggleWindow();
    });
});

app.on('window-all-closed', () => {
    globalShortcut.unregisterAll();
    if (process.platform === 'darwin') {
        return;
    }
    app.quit();
});

app.on('activate', () => {
    if (window != null) {
        return;
    }
    createWindow();
});

ipcMain.on('show-window', () => {
    showWindow();
});
