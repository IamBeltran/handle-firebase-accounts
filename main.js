/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const electron = require('electron');
const isDev = require('electron-is-dev');
const notifier = require('node-notifier');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const path = require('path');
const url = require('url');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const webcontext = path.join(__dirname, 'system', 'node-integration.js');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { app, BrowserWindow, ipcMain } = electron;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

// SECTION: WORSPACE FOR DEVELOPMENT
if (isDev) {
  // Enable live reload for Electron too
  const electronPath = path.resolve(__dirname, 'node_modules/electron');

  require('electron-reload')(__dirname, {
    electron: require(electronPath),
  });
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
}
// !SECTION

// SECTION: WORSPACE FOR PRODUCTION

// !SECTION

// » Keep a global reference of the window object, if you don't, the window will
// » be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let deleteUserWindow;
let setUserWindow;
let addUserWindow;
let getUsersWindow;

// » html file for mainWindow
const mainUrl = url.format({
  pathname: path.join(__dirname, 'system/windows/index.html'),
  protocol: 'file:',
  slashes: true,
});

// » html file for deleteUserWindow
const deleteUserUrl = url.format({
  pathname: path.join(__dirname, 'system/windows/delete-user.html'),
  protocol: 'file:',
  slashes: true,
});

// » html file for setUserWindow
const setUserUrl = url.format({
  pathname: path.join(__dirname, 'system/windows/set-user.html'),
  protocol: 'file:',
  slashes: true,
});

// » html file for addUserWindow
const addUserUrl = url.format({
  pathname: path.join(__dirname, 'system/windows/add-user.html'),
  protocol: 'file:',
  slashes: true,
});

// » html file for getUsersWindow
const getUsersUrl = url.format({
  pathname: path.join(__dirname, 'system/windows/get-users.html'),
  protocol: 'file:',
  slashes: true,
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
function createWindow() {
  // » Create the mainWindow
  mainWindow = new BrowserWindow({
    width: 400,
    height: 650,
    titleBarStyle: 'hidden',
    show: false,
    icon: path.join(__dirname, 'assets/icons/64x64.png'),
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: false,
      preload: webcontext,
    },
  });

  // » Show the mainWindow when it is loaded and ready to show
  mainWindow.loadURL(mainUrl);

  // » Create the deleteUserWindow
  deleteUserWindow = new BrowserWindow({
    width: 400,
    height: 650,
    titleBarStyle: 'hidden',
    show: false,
    icon: path.join(__dirname, 'assets/icons/64x64.png'),
    resizable: false,
    fullscreenable: false,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: false,
      preload: webcontext,
    },
  });

  // » Show the deleteUserWindow when it is loaded and ready to show
  deleteUserWindow.loadURL(deleteUserUrl);

  // » Create the setUserWindow
  setUserWindow = new BrowserWindow({
    width: 400,
    height: 650,
    titleBarStyle: 'hidden',
    show: false,
    icon: path.join(__dirname, 'assets/icons/64x64.png'),
    resizable: false,
    fullscreenable: false,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: false,
      preload: webcontext,
    },
  });

  // » Show the setUserWindow when it is loaded and ready to show
  setUserWindow.loadURL(setUserUrl);

  // » Create the addUserWindow
  addUserWindow = new BrowserWindow({
    width: 400,
    height: 650,
    titleBarStyle: 'hidden',
    show: false,
    icon: path.join(__dirname, 'assets/icons/64x64.png'),
    resizable: false,
    fullscreenable: false,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: false,
      preload: webcontext,
    },
  });

  // » Show the addUserWindow when it is loaded and ready to show
  addUserWindow.loadURL(addUserUrl);

  // » Create the getUsersWindow
  getUsersWindow = new BrowserWindow({
    width: 400,
    height: 650,
    titleBarStyle: 'hidden',
    show: false,
    icon: path.join(__dirname, 'assets/icons/64x64.png'),
    resizable: false,
    fullscreenable: false,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: false,
      preload: webcontext,
    },
  });

  // » Show the getUsersWindow when it is loaded and ready to show
  getUsersWindow.loadURL(getUsersUrl);

  if (!isDev) {
    mainWindow.removeMenu();
  }

  if (isDev) {
    mainWindow.webContents.once('dom-ready', () => {
      mainWindow.webContents.openDevTools();
    });
  }

  // » Show the mainWindow when it is loaded and ready to show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // » Hide the mainWindow when close window
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // » Hide the deleteUserWindow when close window
  deleteUserWindow.on('close', e => {
    e.preventDefault();
    deleteUserWindow.hide();
  });

  // » Hide the setUserWindow when close window
  setUserWindow.on('close', e => {
    e.preventDefault();
    setUserWindow.hide();
  });

  // » Hide the addUserWindow when close window
  addUserWindow.on('close', e => {
    e.preventDefault();
    addUserWindow.hide();
  });

  // » Hide the getUsersWindow when close window
  getUsersWindow.on('close', e => {
    e.preventDefault();
    getUsersWindow.hide();
  });
}

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ APPLICATION'S EVENT LISTENERS                                                     │
//  └───────────────────────────────────────────────────────────────────────────────────┘
app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ IPC'S EVENT LISTENERS (Inter-Process Communication)                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
ipcMain.on('send-notification', (event, notification) => {
  notifier.notify({
    title: notification.title,
    message: notification.message,
  });
});

// » button with id btn-delete-user
ipcMain.on('show-window-delete-user', () => {
  deleteUserWindow.show();
});

// » button with id btn-set-user
ipcMain.on('show-window-set-user', () => {
  setUserWindow.show();
});

// » button with id btn-add-user
ipcMain.on('show-window-add-user', () => {
  addUserWindow.show();
});

// » button with id btn-get-users
ipcMain.on('show-window-get-users', () => {
  getUsersWindow.show();
});

console.log(app.getPath('userData'));
