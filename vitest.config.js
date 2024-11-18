import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig as defineVitestConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,       // Giúp sử dụng các hàm như `describe`, `it`, `expect` mà không cần import
        environment: 'jsdom' // Giả lập môi trường DOM cho kiểm thử
    }
});
