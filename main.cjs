const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  const getIconPath = () => {
    const platform = process.platform;
    
    if (platform === 'win32') {
      return path.join(__dirname, 'public', 'favicon.ico');
    } else if (platform === 'darwin') {
      const icnsPath = path.join(__dirname, 'public', 'favicon.icns');
      return fs.existsSync(icnsPath) ? icnsPath : path.join(__dirname, 'public', 'favicon.png');
    } else {
      return path.join(__dirname, 'public', 'favicon.png');
    }
  };

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    transparent: false,
    backgroundColor: '#FFF8F0',
    icon: getIconPath(),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    
    if (!fs.existsSync(indexPath)) {
      console.error('index.html not found:', indexPath);
      return;
    }
    
    mainWindow.loadFile(indexPath).catch(err => {
      console.error('Failed to load index.html:', err);
      const fileUrl = `file://${indexPath}`;
      mainWindow.loadURL(fileUrl).catch(err2 => {
        console.error('Failed to load file URL:', err2);
      });
    });
  }

  mainWindow.setTitle('Mochi Moon Cafe Task Manager');
  
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    return { action: 'deny' };
  });

  // Set Content-Security-Policy to fix the CSP warning
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          isDev
            ? "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' ws://localhost:*"
            : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'"
        ]
      }
    });
  });
}

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    app.setName('Mochi Moon Task Manager');
  }
  
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

const dataPath = path.join(app.getPath('userData'), 'mochi-tasks.json');

ipcMain.handle('read-tasks', async () => {
  try {
    if (!fs.existsSync(dataPath)) {
      const defaultTasks = [
        {
          id: 1,
          title: "Welcome to Mochi Moon!",
          priority: "medium",
          completed: false,
          xp: 10,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Create your first task",
          priority: "low",
          completed: false,
          xp: 5,
          createdAt: new Date().toISOString()
        }
      ];
      fs.writeFileSync(dataPath, JSON.stringify(defaultTasks, null, 2));
      return defaultTasks;
    }
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
});

ipcMain.handle('write-tasks', async (event, tasks) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing tasks:', error);
    return false;
  }
});

ipcMain.on('close-app', () => {
  app.quit();
});

ipcMain.on('minimize-app', () => {
  mainWindow.minimize();
});

ipcMain.on('maximize-app', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});
