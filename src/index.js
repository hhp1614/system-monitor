import { app, BrowserWindow } from 'electron';

// 安装/卸载时处理在 Windows 上创建/删除快捷方式
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// 保留窗口对象的全局引用，否则，当 JavaScript 对象被垃圾回收时，窗口将自动关闭
let mainWindow;

const createWindow = () => {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    transparent: true,
  });

  // 加载应用程序的渲染进程
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // 开启调试模式
  mainWindow.webContents.openDevTools();

  // 监听窗口关闭
  mainWindow.on('closed', () => {
    // 取消引用窗口对象，如果应用程序支持多窗口，通常会将窗口存储在数组中，这里删除相应元素
    mainWindow = null;
  });
};

// 当 Electron 完成初始化并准备创建浏览器窗口时，将调用此方法。某些API只能在此事件发生后使用
app.on('ready', createWindow);

// 关闭所有窗户后退出
app.on('window-all-closed', () => {
  // 在 OS X 上，应用程序及其菜单栏通常保持活动状态，直到用户使用 Cmd + Q 显式退出
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在 OS X 上，当单击停靠图标并且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});
