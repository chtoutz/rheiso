import Waterline from 'waterline'
// TODO: Read the $settings.get('activeProject.name') to chose chich database file to load.
// TODO: Somewhere, make a "loadDatabase" function to load needed DB; Call it on app load and after changing active project
export default Waterline.Collection.extend({
  identity: 'project',
  datastore: 'default',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      autoMigrations: {autoIncrement: true}
    },
    path: {
      type: 'string',
      required: true
      // TODO: Add this unique attribute when using MongoDB in prod PI
      // unique: true
    },
    roomsFile: {
      type: 'string'
    },
    name: { type: 'string' },
    reference: { type: 'string' },

    // files: {
    //   collection: 'file',
    //   via: 'project'
    // }
    filetrees: {
      collection: 'fileset',
      via: 'project'
    }
  }
})
