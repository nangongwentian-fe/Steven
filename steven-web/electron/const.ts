export const WINDOW_CHANNELS = {
  MINIMIZE: 'window:minimize',
  MAXIMIZE: 'window:maximize',
  UNMAXIMIZE: 'window:unmaximize',
  CLOSE: 'window:close',
  IS_MAXIMIZED: 'window:is-maximized',
} as const

export const WINDOW_EVENTS = {
  MAXIMIZED_STATE_CHANGED: 'window:maximized-state-changed',
} as const

export const APP_CHANNELS = {
  GET_VERSION: 'app:get-version',
} as const

export const MAIN_WINDOW_OPTIONS = {
  width: 1200,
  height: 760,
  minWidth: 960,
  minHeight: 640,
} as const
