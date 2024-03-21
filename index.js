// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载 index.html
    mainWindow.loadURL('https://sponsor.huicanzhan.cn');
    // 2. 创建一个菜单数组
    const template =
        [
            {
                label: '&惠注册',
                submenu: [
                    {
                        label: '&打开',
                        accelerator: 'Ctrl+O'
                    },
                    {
                        label: '&关闭',
                        accelerator: 'Ctrl+W',
                        click: () => {
                            mainWindow.close();
                        }
                    }
                ]
            },
            {
                label: '&窗口',
                submenu:
                    [
                        {
                            label: mainWindow.isFullScreen() ? '退出全屏模式' : '进入全屏模式',
                            accelerator: 'F11',
                            click: () => {
                                mainWindow.setFullScreen(!mainWindow.isFullScreen());
                            }
                        },
                        {
                            label: '&Reload',
                            accelerator: 'Ctrl+R',
                            click: () => {
                                mainWindow.webContents.reload();
                            }
                        },
                        {
                            label: 'Toggle &Developer Tools',
                            accelerator: 'Alt+Ctrl+I',
                            click: () => {
                                mainWindow.webContents.toggleDevTools();
                            }
                        }
                    ]
            },
            {
                label: '帮助',
                submenu: [
                    {
                        label: '帮助中心',
                        click() {
                            shell.openExternal('https://sponsor.huicanzhan.cn/help');
                        }
                    }
                ]
            }
        ]

    let menuBuilder = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menuBuilder);

    // 打开开发工具
    // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


