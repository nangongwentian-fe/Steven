import WindowHeader from './components/WindowHeader'
import WindowControls from './components/window-controls'
import './App.css'

function App() {
  const desktopApi = window.stevenDesktop
  const isDesktop = Boolean(desktopApi)

  return (
    <>
      {desktopApi ? <WindowHeader desktopApi={desktopApi} /> : null}

      <main className={`app-shell${isDesktop ? ' app-shell-desktop' : ''}`}>
        <h1>Steven Web Desktop</h1>
        <p className="description">
          当前运行模式：<strong>{isDesktop ? 'Electron Desktop' : 'Web Browser'}</strong>
        </p>

        {desktopApi ? (
          <WindowControls desktopApi={desktopApi} />
        ) : (
          <section className="desktop-panel">
            <h2>桌面能力未启用</h2>
            <p>
              运行 <code>bun run dev:desktop</code> 以启用 Electron 外壳和窗口控制 API。
            </p>
          </section>
        )}

        <section className="commands">
          <h2>常用命令</h2>
          <p>
            <code>bun run dev:web</code> / <code>bun run dev:desktop</code> /{' '}
            <code>bun run build:desktop</code>
          </p>
        </section>
      </main>
    </>
  )
}

export default App
