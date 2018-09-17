const Conf = require('conf')
const settings = new Conf({configName: 'rheiso-settings'})

const state = settings

const mutations = {
  // EDIT_SETTING (name, value) {
  //   // TODO: Check if name has a dot to prevent modifying without a scope (e.g general/plugins...) for security ?
  //   config.set(name, value)
  //   // state.settings = value
  // }
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
