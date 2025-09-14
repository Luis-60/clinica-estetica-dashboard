import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => {
    // load .env files based on mode (development, production, etc.)
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        server: {
            host: env.VITE_API_URL || '0.0.0.0',
            port: env.VITE_API_PORT ? parseInt(env.VITE_API_PORT) : 5173,
                strictPort: true,
            cors: true,
            hmr: {
                host: env.VITE_API_URL || '127.0.0.1',
            },
        },
        esbuild: {
            jsx: 'automatic',
        },
        resolve: {
            alias: {
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            },
        },
    };
});
