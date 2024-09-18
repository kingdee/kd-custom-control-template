import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let entryFile = ''
  if (mode === 'development') {
    entryFile = resolve(__dirname, 'src/devIndex.ts') // 开发环境入口
  } else if (mode === 'production') {
    entryFile = resolve(__dirname, 'src/prodIndex.ts') // 生产环境入口
  }
  return {
    build: {
      rollupOptions: {
        input: entryFile,
        output: {
          entryFileNames: 'index.js', // 自定义入口文件的输出名称
          // 对 CSS 文件以及其他静态资源的命名
          assetFileNames: ({ name }) => {
            if (name && name.endsWith('.css')) {
              return 'css/index.css'
            }
            return 'assets/[name].[ext]'
          },
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
