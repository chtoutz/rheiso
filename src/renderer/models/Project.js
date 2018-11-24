import Waterline from 'waterline'

export default Waterline.Collection.extend({
  identity: 'project',
  datastore: 'default',
  primaryKey: '_id',

  attributes: {
    _id: {
      type: 'number',
      autoMigrations: {autoIncrement: true}
    },
    path: {
      type: 'string',
      required: true
      // unique: true
    },
    name: { type: 'string' },
    reference: { type: 'string' },
    lastOpened: { type: 'string' },

    files: {
      collection: 'file',
      via: 'project'
    },
    filesets: {
      collection: 'fileset',
      via: 'project'
    },
    rooms: {
      collection: 'room',
      via: 'project'
    }
  }
})
