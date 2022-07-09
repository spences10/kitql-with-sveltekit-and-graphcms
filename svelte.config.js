import adapter from '@sveltejs/adapter-auto'
import houdini from 'houdini/preprocess'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
    houdini(),
  ],

  kit: {
    adapter: adapter(),
  },
}

export default config
