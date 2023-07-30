 
// Required Imports from Electron library
const { app, BrowserWindow, ipcMain } = require('electron');
// Additional Utility Imports
const path = require('path');
const url = require('url');

// Database API
const { queryDatabaseExampleTable } = require('./db-api');

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preloader.js'),
      contentSecurityPolicy: "default-src 'self';"
    }
  })

  if (process.argv.includes('electron.js' && process.argv.includes('electron.exe'))) {
    // Development mode, load Angular app from ng serve URL
    mainWindow.loadURL('http://localhost:4200/');
  } else {
    const indexPath = url.format({
      protocol: 'file',
      pathname: path.join(__dirname, 'dist/angular-electron-sqlite-quickstart', 'index.html'),
      slashes: true,
    });
  
    mainWindow.loadURL(indexPath);
  }
}

// Create the main application window when ready
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit application if all windows are closed
// except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('query-example-table', async (event) => {
  try {
    // Call the queryDatabaseExampleTable function from db-api.js
    // which was imported into this file
    const data = await queryDatabaseExampleTable();

    // Check if the event.sender (BrowserWindow) is still available
    if (!event.sender.isDestroyed()) {
      // Send the result
      event.reply('query-example-table-response', data);
    }

  } catch (error) {
    console.error('Error retrieving data: ', error);
  }
});

