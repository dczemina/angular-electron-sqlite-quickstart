const { app } = require('electron');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const appPath = app.getAppPath();
const dbPath = getDatabasePath();

// Function to open the database connection (promisified version)
function openDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        reject(err);
      } else {
        console.log('Database opened successfully');
        resolve(db);
      }
    });
  });
}

// Function to query the Example table
async function queryDatabaseExampleTable() {
  try {
    const db = await openDatabase();
    const query = 'SELECT MESSAGE FROM EXAMPLE';
    const rows = await promisify(db.all).bind(db)(query, []);
    db.close();
    return rows;
  } catch (err) {
    console.error('Error querying database:', err.message);
    throw err;
  }
}

// Export functions to make them accessible in other code files.
module.exports = { queryDatabaseExampleTable };

// Determine if the application is running production or development mode
// to obtain the proper path to the data.db file
function getDatabasePath() {
  let prodPath = path.join(appPath, '..', 'data.db');
  let devPath = path.join(appPath, 'resources', 'data.db');
  if (isPathValid(prodPath)) {
    return prodPath;
  }
  if (isPathValid(devPath)) {
    return devPath;
  }
  throw new Error('Could not resolve the database file');
}

// Determine if provided path is valid
function isPathValid(filePath) {
  const absolutePath = path.resolve(filePath);
  return fs.existsSync(absolutePath);
}