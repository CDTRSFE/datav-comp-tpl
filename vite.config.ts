import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createHtmlPlugin } from 'vite-plugin-html';
import externalGlobals from 'rollup-plugin-external-globals';
import Components from 'unplugin-vue-components/vite';
import ComponentsRollup from 'unplugin-vue-components/rollup';
import injectCss from 'vite-plugin-vue-injectcss';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import AutoImportRollup from 'unplugin-auto-import/rollup';

const basePath = 'smart-design-lib';
const globals = externalGlobals({
    'vue': 'Vue',
    'vue-demi': 'Vue',
});

export default defineConfig({
    base: `/${basePath}/`,
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@p': resolve(__dirname, './public'),
        },
    },
    server: {
        port: 8033,
        host: '0.0.0.0',
    },
    preview: {
        port: 8033,
        host: '0.0.0.0',
    },
    plugins: [
        vue(),
        vueJsx(),
        createHtmlPlugin({
            minify: true,
            entry: './src/main.ts',
            template: './index.html',
            inject: {
                data: {
                    title: basePath,
                },
            },
        }),
        injectCss(),
        AutoImport({
            include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
            imports: [
                'vue',
            ],
            dts: './types/auto-imports.d.ts',
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
            },
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            dirs: [],
            resolvers: [ElementPlusResolver()],
        }),
    ],
    css: {
        preprocessorOptions: {
            css: {
                charset: false,
            },
            less: {
                charset: false,
                modifyVars: {
                    hack: `true; @import (reference) "${resolve('src/style/variables.less')}";`,
                },
                javascriptEnabled: true,
            },
        },
    },
    build: {
        outDir: basePath,
        cssCodeSplit: true,
        lib: {
            entry: resolve(__dirname, 'src/export.ts'),
            name: 'smart-design-lib',
            fileName: format => `smart-design-lib.${format}.js`,
            formats: ['es'],
        },
        rollupOptions: {
            external: ['vue'],
            plugins: [
                AutoImportRollup({
                    include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
                    imports: ['vue'],
                    resolvers: [ElementPlusResolver()],
                }),
                ComponentsRollup({
                    dirs: [],
                    resolvers: [ElementPlusResolver()],
                }),
                globals,
            ],
            output: {
                chunkFileNames: '[name].js',
            },
            input: './src/export.ts',
        },
    },
});
