// src/renderer/conf/default.js
// TODO: Use electron userPath, dataPath etc.
export default {
  name: 'rheiso-settings',
  encryptionKey: 'InG€ocachingWeTru$t',
  defaults: {
    activeProject: {
      _id: 1,
      name: '*Projet sans nom*'
    },
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
    // Name and order of rooms columns whn importing from an Excel/CSV/JSON file
    roomsCols: [
      'Bloc',
      'Niveau',
      'N°',
      'Nom',
      'Longueur',
      'largeur',
      'Hauteur'
    ],
    // Base tags when filtering files
    tags: {
      pdf: {
        query: { 'extension': '.pdf' }
      },
      xlsx: {
        query: { 'extension': '.xlsx' }
      },
      folder: {
        query: { 'type': 'folder' }
      }
    },
    plugins: {},
    projects: {}
  }
}
