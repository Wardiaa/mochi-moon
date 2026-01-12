const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readTasks: () => ipcRenderer.invoke('read-tasks'),
  writeTasks: (tasks) => ipcRenderer.invoke('write-tasks', tasks),
  closeApp: () => ipcRenderer.send('close-app'),
  minimizeApp: () => ipcRenderer.send('minimize-app'),
  maximizeApp: () => ipcRenderer.send('maximize-app')
});