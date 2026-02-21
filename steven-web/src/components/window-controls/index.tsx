import { useCallback, useEffect, useState } from 'react'
import { WINDOW_CONTROL_TEXT } from './const'
import type { WindowControlsProps } from './types'

function WindowControls({ desktopApi }: WindowControlsProps) {
  const [version, setVersion] = useState<string>(WINDOW_CONTROL_TEXT.VERSION_FALLBACK)
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    const unsubscribe = desktopApi.window.onMaximizedChange((maximized) => {
      setIsMaximized(maximized)
    })

    void desktopApi.app
      .getVersion()
      .then((appVersion) => {
        setVersion(appVersion)
      })
      .catch(() => {
        setVersion(WINDOW_CONTROL_TEXT.VERSION_FALLBACK)
      })

    void desktopApi.window
      .isMaximized()
      .then((maximized) => {
        setIsMaximized(maximized)
      })
      .catch(() => {
        setIsMaximized(false)
      })

    return unsubscribe
  }, [desktopApi])

  const handleToggleMaximize = useCallback(() => {
    if (isMaximized) {
      desktopApi.window.unmaximize()
      return
    }

    desktopApi.window.maximize()
  }, [desktopApi, isMaximized])

  return (
    <section className="desktop-panel">
      <h2>{WINDOW_CONTROL_TEXT.TITLE}</h2>
      <p>
        {WINDOW_CONTROL_TEXT.VERSION_PREFIX}: {version}
      </p>
      <p>{isMaximized ? WINDOW_CONTROL_TEXT.STATE_MAXIMIZED : WINDOW_CONTROL_TEXT.STATE_NORMAL}</p>
      <div className="desktop-actions">
        <button onClick={desktopApi.window.minimize} type="button">
          {WINDOW_CONTROL_TEXT.MINIMIZE}
        </button>
        <button onClick={handleToggleMaximize} type="button">
          {isMaximized ? WINDOW_CONTROL_TEXT.RESTORE : WINDOW_CONTROL_TEXT.MAXIMIZE}
        </button>
        <button onClick={desktopApi.window.close} type="button">
          {WINDOW_CONTROL_TEXT.CLOSE}
        </button>
      </div>
    </section>
  )
}

export default WindowControls
