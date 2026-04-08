import { createHash } from 'crypto'
import { existsSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceSvg = join(root, 'icon.svg')
const fingerprintPath = join(root, 'public/app/icon.svg.sha256')

if (!existsSync(sourceSvg)) {
	console.error('Missing icon.svg at repo root.')
	process.exit(1)
}
if (!existsSync(fingerprintPath)) {
	console.error('Run `npm run icons` once and commit public/app/ (including icon.svg.sha256).')
	process.exit(1)
}

const buf = readFileSync(sourceSvg)
const hash = createHash('sha256').update(buf).digest('hex')
const expected = readFileSync(fingerprintPath, 'utf8').trim()

if (hash !== expected) {
	console.error(
		'Source `icon.svg` changed since last `npm run icons`. Run `npm run icons` and commit `public/app/`.',
	)
	process.exit(1)
}
