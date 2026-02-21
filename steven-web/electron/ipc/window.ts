import { app, ipcMain } from 'electron'
import type { BrowserWindow } from 'electron'
import { APP_CHANNELS, WINDOW_CHANNELS } from '../const'

const registerWindowListeners = (getWindow: () => BrowserWindow | null) => {
  ipcMain.removeAllListeners(WINDOW_CHANNELS.MINIMIZE)
  ipcMain.removeAllListeners(WINDOW_CHANNELS.MAXIMIZE)
  ipcMain.removeAllListeners(WINDOW_CHANNELS.UNMAXIMIZE)
  ipcMain.removeAllListeners(WINDOW_CHANNELS.CLOSE)
  ipcMain.removeHandler(WINDOW_CHANNELS.IS_MAXIMIZED)
  ipcMain.removeHandler(APP_CHANNELS.GET_VERSION)

  ipcMain.on(WINDOW_CHANNELS.MINIMIZE, () => {
    const window = getWindow()
    window?.minimize()
  })

  ipcMain.on(WINDOW_CHANNELS.MAXIMIZE, () => {
    const window = getWindow()
    if (window && !window.isMaximized()) {
      window.maximize()
    }
  })

  ipcMain.on(WINDOW_CHANNELS.UNMAXIMIZE, () => {
    const window = getWindow()
    if (window?.isMaximized()) {
      window.unmaximize()
    }
  })

  ipcMain.on(WINDOW_CHANNELS.CLOSE, () => {
    const window = getWindow()
    window?.close()
  })

  ipcMain.handle(WINDOW_CHANNELS.IS_MAXIMIZED, () => {
    const window = getWindow()
    return window?.isMaximized() ?? false
  })

  ipcMain.handle(APP_CHANNELS.GET_VERSION, () => app.getVersion())
}

export { registerWindowListeners }
