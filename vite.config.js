import { copyFileSync } from 'fs'
import { join } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import {
	APP_APPLE_TOUCH_ICON_PATH,
	APP_BACKGROUND_COLOR,
	APP_DESCRIPTION,
	APP_DISPLAY,
	APP_ICON_PATH,
	APP_LANG,
	APP_MANIFEST_ICONS,
	APP_NAME,
	APP_SHORT_NAME,
	APP_START_URL,
	APP_THEME_COLOR,
} from './src/app.meta.js'

function appHtmlMetaPlugin() {
	const tokenMap = [
		['%APP_NAME%', APP_NAME],
		['%APP_SHORT_NAME%', APP_SHORT_NAME],
		['%APP_DESCRIPTION%', APP_DESCRIPTION],
		['%APP_LANG%', APP_LANG],
		['%APP_THEME_COLOR%', APP_THEME_COLOR],
		['%APP_ICON_HREF%', APP_ICON_PATH],
		['%APP_APPLE_TOUCH_ICON_HREF%', APP_APPLE_TOUCH_ICON_PATH],
	]

	return {
		name: 'app-html-meta',
		transformIndexHtml(html) {
			let out = html
			for (const [token, value] of tokenMap) {
				out = out.replaceAll(token, value)
			}
			return out
		},
	}
}

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode ?? 'development', process.cwd(), 'VITE_')
	const base = env.VITE_BASE_PATH ?? '/'

	return {
		base,
		plugins: [
			vue(),
			appHtmlMetaPlugin(),
			VitePWA({
				manifest: {
					name: APP_NAME,
					short_name: APP_SHORT_NAME,
					description: APP_DESCRIPTION,
					lang: APP_LANG,
					start_url: APP_START_URL,
					display: APP_DISPLAY,
					background_color: APP_BACKGROUND_COLOR,
					theme_color: APP_THEME_COLOR,
					icons: APP_MANIFEST_ICONS,
				},
				workbox: {
					globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
					maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
					navigateFallback: base.endsWith('/') ? `${base}index.html` : `${base}/index.html`,
					navigateFallbackAllowlist: [/./],
					navigateFallbackDenylist: [],
				},
				registerType: 'autoUpdate',
			}),
			{
				name: 'github-pages-404',
				closeBundle() {
					const outDir = join(process.cwd(), 'dist')
					copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'))
				},
			},
		],
		test: {
			include: ['src/**/*.test.js'],
			environment: 'happy-dom',
		},
		server: {
			port: 7566,
			watch: {
				usePolling: true,
			},
		},
	}
})
