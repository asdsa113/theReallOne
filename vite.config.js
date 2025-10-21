import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	// Base path for GitHub Pages (project pages). Update if your repo name differs.
	base: '/theReallOne/',
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:5000',
				changeOrigin: true
			}
		}
	},
	// Disable sourcemaps in production builds to avoid embedding absolute local paths
		build: {
			sourcemap: false,
			outDir: 'docs'
		}
})

