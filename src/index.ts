import { app, BrowserWindow } from 'electron';

// Create window that loads specific file
const createWindow = () : void => {
    const win : BrowserWindow = new BrowserWindow({
        // Allow for node integration on frontend
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 750,
        height: 400
    });

    win.loadFile('../html/index.html');
}

// Create window when app is ready
app.whenReady().then(() : void => {
    createWindow();

    // Create window on mac & linux
    app.on('activate', () : void => {
        if (BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    })
});

// Exit application when all windows are closed
app.on('window-all-closed', () : void => {
    if (process.platform !== 'darwin') app.quit();
});