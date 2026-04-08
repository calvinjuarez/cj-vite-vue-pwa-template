import { createHash } from 'crypto'
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceSvg = join(root, 'icon.svg')
const appDir = join(root, 'public/app')
const stagedSvg = join(appDir, 'icon.svg')

const targets = [
	{ file: 'icon-192.png', size: 192 },
	{ file: 'icon-512.png', size: 512 },
	{ file: 'apple-touch-icon.png', size: 180 },
]

try {
	mkdirSync(appDir, { recursive: true })
	copyFileSync(sourceSvg, stagedSvg)
	for (const { file, size } of targets) {
		await sharp(stagedSvg).resize(size, size).png().toFile(join(appDir, file))
	}
	const buf = readFileSync(sourceSvg)
	const hash = createHash('sha256').update(buf).digest('hex')
	writeFileSync(join(appDir, 'icon.svg.sha256'), `${hash}\n`)
} catch (err) {
	console.error(err)
	process.exit(1)
}
