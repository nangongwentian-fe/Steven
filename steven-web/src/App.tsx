import WindowHeader from './components/WindowHeader'

function App() {
  const desktopApi = window.stevenDesktop

  return desktopApi ? <WindowHeader desktopApi={desktopApi} /> : null
}

export default App
