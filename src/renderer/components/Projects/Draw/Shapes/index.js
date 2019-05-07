/**
 * The file enables `@/components/Draw/Board.vue` to import all Shapes modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

// TODO: Transform each Draw/Shapes/XXX.js into a child class based on parent with default init... methods ?

const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
