import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        base: env.NODE_ENV === 'development' ? '/' : '/OMSCS-Review-Analyzer/',
        defines: {
            'process.env': env,
        },
    };
});
