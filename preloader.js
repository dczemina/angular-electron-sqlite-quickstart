const { contextBridge, ipcRenderer } = require('electron')

// Here we are only allowing certain functionality to be exposed to the front-end for security reasons
contextBridge.exposeInMainWorld('electronAPI', {
  // Create a "queryDatabaseExampleTable()" function available in Angular as window.electronAPI.queryDatabaseExampleTable()
  queryDatabaseExampleTable: () => {
    return new Promise((resolve, reject) => {
      // listen for the response and return the data once resolved
      ipcRenderer.once('query-example-table-response', (event, data) => {
        resolve(data);
      });

      // Send a message to the ipcMain using the name we put into electron.js in the previous step
      ipcRenderer.send('query-example-table');
    });
  }
})

