import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import alias from '@rollup/plugin-alias';
import fs from 'fs';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// @ts-ignore
import { flowPlugin, esbuildFlowPlugin } from '@bunchtogether/vite-plugin-flow';

const moduleAlias = {
  // this alias hack is need to trick witejs into importing files
  // outside node_modules
  // 'vitejs-alias': './web/alias',

  // alias all lodash
  lodash: 'lodash-es',
  'lodash._reinterpolate': 'lodash-es/_reInterpolate',
  'lodash.assign': 'lodash-es/assign',
  'lodash.clonedeep': 'lodash-es/cloneDeep',
  'lodash.debounce': 'lodash-es/debounce',
  'lodash.frompairs': 'lodash-es/fromPairs',
  'lodash.get': 'lodash-es/get',
  'lodash.isempty': 'lodash-es/isEmpty',
  'lodash.isequal': 'lodash-es/isEqual',
  'lodash.isnil': 'lodash-es/isNil',
  'lodash.isstring': 'lodash-es/isString',
  'lodash.memoize': 'lodash-es/memoize',
  'lodash.merge': 'lodash-es/merge',
  'lodash.mergewith': 'lodash-es/mergeWith',
  'lodash.omit': 'lodash-es/omit',
  'lodash.omitby': 'lodash-es/omitBy',
  'lodash.pick': 'lodash-es/pick',
  'lodash.template': 'lodash-es/template',
  'lodash.templatesettings': 'lodash-es/templateSettings',
  'lodash.throttle': 'lodash-es/throttle',
  'lodash.truncate': 'lodash-es/truncate',
  'lodash.uniq': 'lodash-es/uniq',

  // '@react-navigation': process.cwd() + '/vendors/@react-navigation',

  'native-base': process.cwd() + '/vendors/native-base/src',
  '@react-navigation/stack':
    process.cwd() + '/vendors/@react-navigation/native-stack/src',
  '@react-navigation/core':
    process.cwd() + '/vendors/@react-navigation/core/src',
  '@react-navigation/elements':
    process.cwd() + '/vendors/@react-navigation/elements/src',
  '@react-navigation/routers':
    process.cwd() + '/vendors/@react-navigation/routers/src',
  '@react-navigation/native':
    process.cwd() + '/vendors/@react-navigation/native/src',
  '@react-navigation/native-stack':
    process.cwd() + '/vendors/@react-navigation/native-stack/src',
  // 'native-base': 'vitejs-alias/native-base',
  'react-native': 'react-native-web',
  'react-native-svg': 'react-native-svg-web',
  'react-native-linear-gradient': 'react-native-web-linear-gradient',

  // vite converts cjs to esm if only there is np import statment.
  // the issue with styled-components is that there is a require in a esm file
  // this alias forces it to use de cjs version and then vite cam convert it to esm
  'styled-components/native':
    'styled-components/native/dist/styled-components.native.cjs.js',
};

// import path from 'path';

// const prodPlugins =
//   process.env.NODE_ENV === 'production'
//     ? [
//         [
//           alias({
//             entries: [
//               {
//                 find: 'vitejs-alias',
//                 replacement: `${process.cwd()}/web/alias`,
//               },
//             ],
//           }),
//         ],
//       ]
//     : [[]];

export default defineConfig({
  publicDir: './assets',
  plugins: [reactRefresh(), flowPlugin()].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[hash].js',
        chunkFileNames: 'assets/[hash].js',
      },
    },
    outDir: '../server/public',
    emptyOutDir: true,
    sourcemap: true,
    // brotliSize: true,
    chunkSizeWarningLimit: 4000,
    terserOptions: {
      ecma: 2016,
      compress: {
        drop_console: true,
        // drop_debugger: true,
        module: true,
        passes: 2,
        pure_funcs: [
          'console',
          'console.log',
          'console.warn',
          'console.error',
          'console.info',
          'window.console',
          'window.console.log',
          'window.console.warn',
          'window.console.error',
          'window.console.info',
          'global.console',
          'global.console.log',
          'global.console.warn',
          'global.console.error',
          'global.console.info',
        ],
      },
      format: {
        comments: false,
      },
    },
  },
  resolve: {
    alias: moduleAlias,
  },
  server: {
    // https: {
    //   key: fs.readFileSync('./certs/localhost-key.pem', { encoding: 'utf8' }),
    //   cert: fs.readFileSync('./certs/localhost.pem', { encoding: 'utf8' }),
    // },
    proxy: {
      '/api': 'http://localhost:8000',
      '/account': 'http://localhost:8000',
      '/dashboard': 'http://localhost:8000',
      '/sign-in': 'http://localhost:8000',
      '/sign-up': 'http://localhost:8000',
      '/sign-out': 'http://localhost:8000',
    },
    fs: {
      strict: false,
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },

  optimizeDeps: {
    esbuildOptions: {
      // chunkNames: 'chunks/[name]-[hash]',
      plugins: [esbuildFlowPlugin(/\.jsx?$/)],
    },
  },
});
