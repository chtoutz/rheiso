// src/renderer/conf/default.js
// TODO: Use electron userPath, dataPath etc.
export default {
  name: 'rheiso-settings',
  encryptionKey: 'InG€ocachingWeTru$t',
  defaults: {
    notifications: {
      title: '',
      message: '',
      type: 'primary',
      direction: 'Down',
      duration: 4500,
      container: '.notifications'
    },
    modal: {
      title: '',
      message: '',
      duration: 0,
      container: '.modal-container'
    },
    general: {
      projectsSource: '',
      projectsSaving: '',
      outputFiles: ''
    },
    plugins: {},
    projects: {}
  }
}
