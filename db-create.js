const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the database file at '../resources/data.db'
const dbPath = path.join(__dirname, 'resources', 'data.db');

// Open the database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Database connection established.');

    // SQL Statement to Create the Table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS EXAMPLE (
        MESSAGE TEXT
      )
    `;

    // Run the table creation
    db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table created successfully.');

        // SQL Statement to Insert a Row into the Table
        const insertRowQuery = `
          INSERT INTO EXAMPLE (MESSAGE)
          VALUES ('Example message from the database!');
        `;

        // Run the data insert
        db.run(insertRowQuery, (err) => {
          if (err) {
            console.error('Error inserting row:', err.message);
          } else {
            console.log('Row inserted successfully.');
          }

          // Close the database connection. This should always be done when all statements are finished
          db.close((err) => {
            if (err) {
              console.error('Error closing database:', err.message);
            } else {
              console.log('Database connection closed.');
            }
          });
        });
      }
    });
  }
});
