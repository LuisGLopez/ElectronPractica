const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname, { 
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}

let mainWindow;
let newProductWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true,
    }));

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => {
        app.quit();
    })
});

const createNewProductWindow = () => {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Agregar producto nuevo',
        webPreferences: {
            nodeIntegration: true
        },
    });
    //newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/newProduct.html'),
        protocol: 'file',
        slashes: true,
    }));

    newProductWindow.on('closed', () => {
        newProductWindow = null;
    });
}

ipcMain.on('productToAdd', (e, newProduct) => {
    mainWindow.webContents.send('productToAdd', newProduct);
    newProductWindow.close();
});

const templateMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Producto nuevo',
                accelerator: 'Ctrl+N',
                click() {
                    createNewProductWindow();
                },
            },
            {
                label: 'Eliminar todos los productos',
                click() {
                    mainWindow.webContents.send('productsRemoveAll');
                }
            },
            {
                label: 'Salir',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
];

if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName()

    });
}

if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Mostrar/Ocultar DevTools',
                accelerator: 'Ctr+D',
                accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
                click(item, focusedWindow) {
                  focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
            }
        ]
    })
}