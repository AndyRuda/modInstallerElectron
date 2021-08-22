import {app, BrowserWindow, Menu}  from 'electron';
import url from 'url';
import path from 'path';

let mainWindow 
app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        title: "Eshuu! Mods Installer",
        icon: "./public/icon.ico",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegrationInWorker: true 
        },
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true,
    }))
    Menu.setApplicationMenu(null)
    // mainWindow.webContents.openDevTools()
})
