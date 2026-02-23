import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import electron from 'vite-plugin-electron/simple'

// https://vite.dev/config/
export default defineConfig(() => {
  const isDesktop = process.env.STEVEN_DESKTOP === 'true'
  const plugins: PluginOption[] = [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ]

  if (isDesktop) {
    plugins.push(
      electron({
        main: {
          entry: 'electron/main.ts',
        },
        preload: {
          input: 'electron/preload.ts',
        },
      }),
    )
  }

  return {
    plugins,
  }
})
