// import Datastore from 'nedb'
// import path from 'path'
//
// const { app } = require('electron').remote
//
// const DBpaths = {
//   projects: path.join(app.getPath('userData'), 'database', 'projects.db'),
//   libraries: path.join(app.getPath('userData'), 'database', 'libraries.db'),
//   // TODO: Populate the plugins object with all DB available in activated plugins folders
//   plugins: {}
// }

const state = {}

const mutations = {
  // initDatabase () {
  //   state.projects = new Datastore({ filename: DBpaths.projects, autoload: true })
  //   state.libraries = new Datastore({ filename: DBpaths.libraries, autoload: true })
  //   // TODO: Populate the state.plugins object with all DB available in activated plugins folders
  // }
  // initSettings () {
  //   state.projects = new Datastore({ filename: DBpaths.projects, autoload: true })
  //   state.libraries = new Datastore({ filename: DBpaths.libraries, autoload: true })
  //   // TODO: Populate the state.plugins object with all DB available in activated plugins folders
  // }
}

const actions = {
  // someAsyncTask ({ commit }) {
  //   // do something async
  //   commit('INCREMENT_MAIN_COUNTER')
  // }
}

export default {
  state,
  mutations,
  actions
}
