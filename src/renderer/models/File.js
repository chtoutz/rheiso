import Waterline from 'waterline'

export default Waterline.Collection.extend({
  identity: 'file',
  datastore: 'default',
  primaryKey: '_id',

  attributes: {
    _id: {
      type: 'number',
      autoMigrations: {autoIncrement: true}
    },
    path: {
      type: 'string',
      required: false
      // unique: true
    },
    name: { type: 'string' },
    size: { type: 'number' },
    depth: { type: 'number' },
    type: { type: 'string' },
    mtime: { type: 'string' },
    extension: { type: 'string' },
    // project: { type: 'string' }

    // Add a reference to Pets
    project: {
      model: 'project'
    }
  }
})
