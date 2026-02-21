import { execFile } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import pngToIco from 'png-to-ico'
import png2icons from 'png2icons'

const execFileAsync = promisify(execFile)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

const sourceIconPath = path.resolve(projectRoot, '../docs/images/Steven.png')
const buildDir = path.resolve(projectRoot, 'build')
const outputPngPath = path.join(buildDir, 'icon.png')
const outputIcoPath = path.join(buildDir, 'icon.ico')
const outputIcnsPath = path.join(buildDir, 'icon.icns')
const iconSetDir = path.join(buildDir, 'icon.iconset')

const ICONSET_SIZES = [
  ['icon_16x16.png', 16],
  ['icon_16x16@2x.png', 32],
  ['icon_32x32.png', 32],
  ['icon_32x32@2x.png', 64],
  ['icon_128x128.png', 128],
  ['icon_128x128@2x.png', 256],
  ['icon_256x256.png', 256],
  ['icon_256x256@2x.png', 512],
  ['icon_512x512.png', 512],
  ['icon_512x512@2x.png', 1024],
]

const runSips = async (args) => {
  await execFileAsync('sips', args)
}

const copySourcePng = async () => {
  await fs.copyFile(sourceIconPath, outputPngPath)
}

const generatePng = async () => {
  if (process.platform !== 'darwin') {
    await copySourcePng()
    return
  }

  try {
    await runSips(['-z', '1024', '1024', sourceIconPath, '--out', outputPngPath])
  } catch {
    await copySourcePng()
  }
}

const generateIco = async () => {
  const icoBuffer = await pngToIco(outputPngPath)
  await fs.writeFile(outputIcoPath, icoBuffer)
}

const generateIcnsWithIconutil = async () => {
  await fs.rm(iconSetDir, { recursive: true, force: true })
  await fs.mkdir(iconSetDir, { recursive: true })

  for (const [fileName, size] of ICONSET_SIZES) {
    const outputPath = path.join(iconSetDir, fileName)
    await runSips(['-z', String(size), String(size), outputPngPath, '--out', outputPath])
  }

  await execFileAsync('iconutil', ['-c', 'icns', iconSetDir, '-o', outputIcnsPath])
  await fs.rm(iconSetDir, { recursive: true, force: true })
}

const generateIcnsWithPng2icons = async () => {
  const pngBuffer = await fs.readFile(outputPngPath)
  const icnsBuffer = png2icons.createICNS(pngBuffer, png2icons.BICUBIC, 0)

  if (!icnsBuffer) {
    throw new Error('png2icons failed to create .icns file')
  }

  await fs.writeFile(outputIcnsPath, icnsBuffer)
}

const generateIcns = async () => {
  if (process.platform !== 'darwin') {
    return
  }

  try {
    await generateIcnsWithIconutil()
    return
  } catch {
    await fs.rm(iconSetDir, { recursive: true, force: true })
  }

  await generateIcnsWithPng2icons()
}

const generateIcons = async () => {
  await fs.access(sourceIconPath)
  await fs.mkdir(buildDir, { recursive: true })

  await generatePng()
  await generateIco()
  await generateIcns()
}

generateIcons().catch((error) => {
  console.error('[icons:generate] failed:', error)
  process.exitCode = 1
})
