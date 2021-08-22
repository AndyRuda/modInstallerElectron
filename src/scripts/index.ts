const fs = require('fs');
const os = require('os');
const download = require('download');
const fsExtra = require('fs-extra');

// ---CHANGE PROPERTIES OF ELEMENT
const changeElementProperty = (element: string | any, property: string, value: any) => {
    if (typeof element == "string") {
        const button = document.querySelector(element as string) as any
        button[property] = value;
    } else {
        element[property] = value;
    }
}
// ---SET PROGRESS BAR
const setProgres = (hidden: boolean) => {
    const text = hidden ?
        `<div class="progress">
            <div class="indeterminate"></div>
        </div>` : ''
    const progressDiv = document.querySelector('#progress') as HTMLDivElement
    progressDiv.innerHTML = text
}

// ---Installer
const onClickInstallEventHandler = (clear: boolean) => async (event: Event) => {
    setProgres(true)
    changeElementProperty('#install', 'disabled', true);
    changeElementProperty('#cleanInstall', 'disabled', true);
    //User in OS
    const user = os.userInfo().username;
    let isGameInstalled = false;
    // Paths & Urls
    const modsURL = 'https://codeload.github.com/Anucart/Tierra-del-Perreo-24-7-brrr/zip/refs/heads/main';
    const filePath = __dirname + '/../temp';
    //Get all mods
    fs.readdir(`/Users/${user}/AppData/Roaming/`, (err: any, files: any) => {
        isGameInstalled = files.find((file: string) => file === '.minecraft')
        if (isGameInstalled) {
            download(modsURL, filePath, { extract: true })
                .then(() => {
                    //CLear if is clear install
                    if (clear) fsExtra.emptyDirSync(`/Users/${user}/AppData/Roaming/.minecraft/mods`);
                    //Copy files and paste in .minecraft/mods
                    fsExtra.copy(
                        __dirname + '/../temp/Tierra-del-Perreo-24-7-brrr-main/mods',
                        `/Users/${user}/AppData/Roaming/.minecraft/mods`,
                        (err: any) => {
                            fsExtra.emptyDirSync(__dirname + '/../temp')
                            if (err) throw err
                        }
                    )
                    M.toast({ html: 'Mods instalados' })
                }).catch((err: any) => {
                    M.toast({ html: 'No fue lo que dios quiere' })
                    M.toast({ html: "no se pudo instalar los mods re-intentar o instalar forzado" })
                    console.log(err);
                }).finally(() => {
                    setProgres(false);
                    changeElementProperty('#install', 'disabled', false);
                    changeElementProperty('#cleanInstall', 'disabled', false);
                })
        } else {
            setProgres(false);
            changeElementProperty('#install', 'disabled', false);
            changeElementProperty('#cleanInstall', 'disabled', false);
            M.toast({ html: 'Verificar instalacion de minecraft' });
        }
    })
};

// ---ADD EVENT LISTENERS 

//ADD TOOLTIPS
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems);
});
document.querySelector('#install')?.addEventListener('click', onClickInstallEventHandler(false))
document.querySelector('#cleanInstall')?.addEventListener('click', onClickInstallEventHandler(true))
