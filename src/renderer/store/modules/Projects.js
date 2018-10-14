// const Conf = require('conf')
// const config = new Conf({configName: 'settings'})

let state = {
  active: {}
  // disk: [],
  // saved: []
}

const mutations = {
  setActiveProject (state, project) {
    console.log(project)
    // state.active = {name: project.name}
    state.active = project
    // settings.set('activeProject', project)
  },
  loadActiveProject (state, settings) {
    state.active = settings.get('activeProject')
    // TODO: Check if name has a dot to prevent modifying without a scope (e.g general/plugins...) for security ?
    // config.set(name, value)
    // state.settings = value
  }
  // INCREMENT_MAIN_COUNTER (state) {
  //   state.main++
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
