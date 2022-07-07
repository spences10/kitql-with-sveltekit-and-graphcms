import watchAndRun from '@kitql/vite-plugin-watch-and-run'
import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    watchAndRun([
      {
        watch: '**/*.(gql|graphql)',
        run: 'npm run gen',
      },
    ]),
  ],
  resolve: {
    alias: {
      $houdini: path.resolve('.', '$houdini'),
      $graphql: path.resolve('src', 'lib', 'graphql'),
    },
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
}

export default config
