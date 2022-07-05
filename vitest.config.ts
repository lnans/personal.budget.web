import * as path from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@models': path.resolve(__dirname, './src/models'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  esbuild: {
    jsxInject: 'import React from "react"',
  },
  test: {
    environment: 'jsdom',
    watch: false,
    threads: false,
    reporters: 'default',
    setupFiles: './src/setupTests.ts',
    include: ['**/*.spec.tsx'],
    exclude: [...configDefaults.exclude, '.vs', '.yarn', 'coverage', 'public'],
    coverage: {
      all: true,
      reporter: ['text', 'text-summary', 'html'],
      include: ['src/components/**/*.tsx'],
      exclude: ['src/**/*.{spec,stories}.tsx'],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
})
