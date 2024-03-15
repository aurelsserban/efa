const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // win.loadURL('https://hg.hubgets.com/');
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    ipcMain.handle('ping', () => 'pong');

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
});

// when all windows are closed, close the app if the user is not on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { 
        app.quit()
    }
});