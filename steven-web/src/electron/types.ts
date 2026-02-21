export interface StevenDesktopAPI {
  window: {
    minimize: () => void
    maximize: () => void
    unmaximize: () => void
    close: () => void
    isMaximized: () => Promise<boolean>
    onMaximizedChange: (callback: (isMaximized: boolean) => void) => () => void
  }
  app: {
    getVersion: () => Promise<string>
  }
}
