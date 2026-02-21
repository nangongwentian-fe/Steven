import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron'
import { APP_CHANNELS, WINDOW_CHANNELS, WINDOW_EVENTS } from './const'
import type { StevenDesktopAPI } from '../src/electron/types'

const stevenDesktop: StevenDesktopAPI = {
  window: {
    minimize: () => ipcRenderer.send(WINDOW_CHANNELS.MINIMIZE),
    maximize: () => ipcRenderer.send(WINDOW_CHANNELS.MAXIMIZE),
    unmaximize: () => ipcRenderer.send(WINDOW_CHANNELS.UNMAXIMIZE),
    close: () => ipcRenderer.send(WINDOW_CHANNELS.CLOSE),
    isMaximized: () => ipcRenderer.invoke(WINDOW_CHANNELS.IS_MAXIMIZED),
    onMaximizedChange: (callback) => {
      const listener = (_event: IpcRendererEvent, maximized: boolean) => {
        callback(maximized)
      }
      ipcRenderer.on(WINDOW_EVENTS.MAXIMIZED_STATE_CHANGED, listener)
      return () => {
        ipcRenderer.removeListener(WINDOW_EVENTS.MAXIMIZED_STATE_CHANGED, listener)
      }
    },
  },
  app: {
    getVersion: () => ipcRenderer.invoke(APP_CHANNELS.GET_VERSION),
  },
}

contextBridge.exposeInMainWorld('stevenDesktop', stevenDesktop)
