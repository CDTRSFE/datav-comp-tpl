import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import externalGlobals from 'rollup-plugin-external-globals';
import Components from 'unplugin-vue-components/vite';
import ComponentsRollup from 'unplugin-vue-components/rollup';
import injectCss from 'vite-plugin-vue-injectcss';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import AutoImportRollup from 'unplugin-auto-import/rollup';
import Unocss from 'unocss/vite';
import { presetAttributify, presetWind, transformerDirectives } from 'unocss';

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
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            dirs: [],
            resolvers: [ElementPlusResolver()],
        }),
        Unocss({
            mode: 'vue-scoped',
            shortcuts: {
                'flex-center': 'flex items-center justify-center',
            },
            theme: {
                colors: {
                    primary: '#1F76E5',
                },
            },
            presets: [
                presetAttributify(),
                presetWind(),
            ],
            transformers: [
                transformerDirectives(),
            ],
            rules: [
                [/^scrollbar-([^-]+)(-(.+))?$/, ([, d,, value], { rawSelector }) => {
                    let p = '';
                    if (!value) {
                        p = `width: ${d}; height: ${d}`;
                    }
                    if (d === 'w') {
                        p = `width: ${value}`;
                    } else if (p === 'h') {
                        p = `height: ${value}`;
                    }
                    return `.${rawSelector}::-webkit-scrollbar {
                        ${p}
                    }`;
                }],
                // 文本超出省略
                // usage: class="ellipsis ellipsis-2 ellipsis-3"
                [/^ellipsis(-(\d*))?$/, ([,, d], { rawSelector }) => {
                    return `.${rawSelector} {${
                        Number(d) > 1
                            ? `overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: ${d}; -webkit-box-orient: vertical;`
                            : 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'
                    }}`;
                }],
            ],
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
