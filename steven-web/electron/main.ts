import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MAIN_WINDOW_OPTIONS, WINDOW_EVENTS } from './const'
import { registerWindowListeners } from './ipc/window'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow: BrowserWindow | null = null

const createMainWindow = async () => {
  const window = new BrowserWindow({
    ...MAIN_WINDOW_OPTIONS,
    show: false,
    title: 'Steven Web',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  mainWindow = window

  const emitMaximizedState = () => {
    if (window.isDestroyed()) {
      return
    }
    window.webContents.send(WINDOW_EVENTS.MAXIMIZED_STATE_CHANGED, window.isMaximized())
  }

  window.on('ready-to-show', () => {
    window.show()
  })
  window.on('maximize', emitMaximizedState)
  window.on('unmaximize', emitMaximizedState)
  window.webContents.on('did-finish-load', emitMaximizedState)

  window.on('closed', () => {
    mainWindow = null
  })

  const devServerUrl = process.env.VITE_DEV_SERVER_URL
  if (devServerUrl) {
    await window.loadURL(devServerUrl)
    window.webContents.openDevTools({ mode: 'detach' })
    return
  }

  await window.loadFile(path.join(__dirname, '../dist/index.html'))
}

app.whenReady().then(async () => {
  registerWindowListeners(() => mainWindow)
  await createMainWindow()

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createMainWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
