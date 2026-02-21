# Steven Web (Vite + React + Electron)

`steven-web` 现在同时支持浏览器模式和 Electron 桌面模式。

## 环境要求

- Node.js `>=22`
- Bun `>=1.3`
- macOS 下生成 `.icns` 需要系统自带 `sips` 与 `iconutil`

## 开发命令

- `bun run dev:web`：仅启动 Vite（浏览器模式）
- `bun run dev:desktop`：启动 Vite + Electron（桌面模式）
- `bun run lint`：执行 ESLint

## 构建命令

- `bun run build:web`：构建浏览器产物到 `dist`
- `bun run build:desktop`：构建浏览器 + Electron 产物到 `dist` 和 `dist-electron`
- `bun run icons:generate`：从 `../docs/images/Steven.png` 生成应用图标

## 发行命令（未签名）

- `bun run dist:mac`：输出 macOS `.dmg`
- `bun run dist:win`：输出 Windows NSIS `.exe`
- `bun run dist:linux`：输出 Linux `.AppImage`
- `bun run dist:all`：尝试一次构建三平台（建议在 CI 或对应系统执行）

安装包输出目录：`release/`

## Electron 安全基线

- `contextIsolation: true`
- `nodeIntegration: false`
- 仅通过 `preload` 暴露白名单 API：`window.stevenDesktop`
