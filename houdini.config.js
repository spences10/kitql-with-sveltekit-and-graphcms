/* file: houdini.config.js */

/** @type {import('houdini').ConfigFile} */
const config = {
  schemaPath: 'src/lib/graphql/schema.json',
  sourceGlob: 'src/**/*.{svelte,gql}',
  scalars: {
    Date: {
      type: 'Date',
    },
  },
}

export default config
