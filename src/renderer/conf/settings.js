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
    general: {
      projectsSource: '',
      projectsSaving: '',
      outputFiles: ''
    },
    filesets: [
      {
        id: 'local',
        name: 'Fichiers locaux',
        query: {}
      }
    ],
    tags: {
      pdf: {
        query: { 'extension': '.pdf' }
      },
      folder: {
        query: { 'type': 'folder' }
      },
      outputFiles: ''
    },
    plugins: {},
    projects: {}
  }
}
