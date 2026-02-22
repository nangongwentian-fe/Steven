import { useCallback, useEffect, useState } from 'react'
import { WINDOW_HEADER } from './const'
import type { WindowHeaderProps } from './types'
import './index.css'

function WindowHeader({ desktopApi }: WindowHeaderProps) {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    const unsubscribe = desktopApi.window.onMaximizedChange((maximized) => {
      setIsMaximized(maximized)
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

  const handleDoubleClick = useCallback(() => {
    if (isMaximized) {
      desktopApi.window.unmaximize()
      return
    }

    desktopApi.window.maximize()
  }, [desktopApi, isMaximized])

  return (
    <header
      className="window-header drag-region"
      onDoubleClick={handleDoubleClick}
      style={{
        height: `${WINDOW_HEADER.HEIGHT}px`,
        paddingLeft: `${WINDOW_HEADER.PADDING_LEFT}px`,
        paddingRight: `${WINDOW_HEADER.PADDING_RIGHT}px`,
      }}
    >
      <p className="window-header__title">{WINDOW_HEADER.TITLE}</p>
    </header>
  )
}

export default WindowHeader
