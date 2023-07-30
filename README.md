# AngularElectronSqliteQuickstart

A basic project configured for Angular 16, SQLite, and Electron.

## Description

This project is a starting point for creating an application with Angular, SQLite, and Electron. It is already configured so that all three libraries are communicating with each other. When you start Electron either in development mode or from the compiled exe, open up View --> Toggle Developer Tools to see the console log of data coming from the database.

See the Files section below for a description about important files in the project.

I built this because I was tasked with building a desktop application and was free to choose the technologies. I had never used Electron nor SQLite, and wanted to try them out. I didn't see anything recent that was pre-configured for these libraries so decided to make my own. I had to piece a lot of this together from various sources so hopefully it helps someone else out there.

It has only been tested on Windows.

## Installation

- Clone repository
- Run `npm install`
- Run `node db-create.js`

## Development server

Run `npm run dev` to start web server and Electron. The application will automatically reload if you change any of the Angular source files. A restart is needed if changing any of the Electron or db source files.

## Build

Run `npm run prod` to compile the application.

## Files

### electron.js`

The main Electron entry-point. Contains the code to create the application window, and handle the (example) messages between Angular and Electron via the ipcMain.

### preloader.js

Exposes functionality from Electron to the Angular front-end. Anything not specified in here cannot be referenced on the Angular side.

### electron.d.ts

Type definitions for the functionality exposed to Angular from the preloader.js.

### db-create.js

Contains logic to create a SQLite database with a single table and single row.

### db-api.js

Contains logic to communicate with the database

### src/

A standard Angular cli generated project. Only contains minor changes to `app.component.ts` and `angular.json` necessary for integration with Electron.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)