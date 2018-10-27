// src/renderer/conf/index.js
// TODO: For all files in this folder, set local config only. If using the Pi (for laaaaaaaater), all files will be stored on the Pi storage using a Sails.js app and obtained with a HTTP call to the pi adress

/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default modules
