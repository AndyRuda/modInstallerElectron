"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const url_1 = __importDefault(require("url"));
const path_1 = __importDefault(require("path"));
let mainWindow;
electron_1.app.on('ready', () => {
    mainWindow = new electron_1.BrowserWindow({
        title: "Eshuu! Mods Installer",
        icon: "./public/icon.jpg",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegrationInWorker: true
        },
    });
    mainWindow.loadURL(url_1.default.format({
        pathname: path_1.default.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true,
    }));
    electron_1.Menu.setApplicationMenu(null);
});
