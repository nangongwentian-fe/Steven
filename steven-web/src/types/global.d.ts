import type { StevenDesktopAPI } from '../electron/types'

declare global {
  interface Window {
    stevenDesktop?: StevenDesktopAPI
  }
}

export {}
