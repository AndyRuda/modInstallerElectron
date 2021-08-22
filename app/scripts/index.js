"use strict";
var _a, _b;
const fs = require('fs');
const os = require('os');
const download = require('download');
const fsExtra = require('fs-extra');
const changeElementProperty = (element, property, value) => {
    if (typeof element == "string") {
        const button = document.querySelector(element);
        button[property] = value;
    }
    else {
        element[property] = value;
    }
};
const setProgres = (hidden) => {
    const text = hidden ?
        `<div class="progress">
            <div class="indeterminate"></div>
        </div>` : '';
    const progressDiv = document.querySelector('#progress');
    progressDiv.innerHTML = text;
};
const onClickInstallEventHandler = (clear) => async (event) => {
    setProgres(true);
    changeElementProperty('#install', 'disabled', true);
    changeElementProperty('#cleanInstall', 'disabled', true);
    const user = os.userInfo().username;
    let isGameInstalled = false;
    const modsURL = 'https://codeload.github.com/Anucart/Tierra-del-Perreo-24-7-brrr/zip/refs/heads/main';
    const filePath = __dirname + '/../temp';
    fs.readdir(`/Users/${user}/AppData/Roaming/`, (err, files) => {
        isGameInstalled = files.find((file) => file === '.minecraft');
        if (isGameInstalled) {
            download(modsURL, filePath, { extract: true })
                .then(() => {
                if (clear)
                    fsExtra.emptyDirSync(`/Users/${user}/AppData/Roaming/.minecraft/mods`);
                fsExtra.copy(__dirname + '/../temp/Tierra-del-Perreo-24-7-brrr-main/mods', `/Users/${user}/AppData/Roaming/.minecraft/mods`, (err) => {
                    fsExtra.emptyDirSync(__dirname + '/../temp');
                    if (err)
                        throw err;
                });
                M.toast({ html: 'Mods instalados' });
            }).catch((err) => {
                M.toast({ html: 'No fue lo que dios quiere' });
                M.toast({ html: "no se pudo instalar los mods re-intentar o instalar forzado" });
                console.log(err);
            }).finally(() => {
                setProgres(false);
                changeElementProperty('#install', 'disabled', false);
                changeElementProperty('#cleanInstall', 'disabled', false);
            });
        }
        else {
            setProgres(false);
            changeElementProperty('#install', 'disabled', false);
            changeElementProperty('#cleanInstall', 'disabled', false);
            M.toast({ html: 'Verificar instalacion de minecraft' });
        }
    });
};
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems);
});
(_a = document.querySelector('#install')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', onClickInstallEventHandler(false));
(_b = document.querySelector('#cleanInstall')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', onClickInstallEventHandler(true));
