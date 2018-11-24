import Waterline from 'waterline'

export default Waterline.Collection.extend({
  identity: 'room',
  datastore: 'default',
  primaryKey: '_id',

  attributes: {
    _id: {
      type: 'number',
      autoMigrations: {autoIncrement: true}
    },

    reference: {
      type: 'string',
      required: true
    },
    building: { type: 'string' },
    floor: { type: 'string' },
    name: {
      type: 'string',
      defaultsTo: '*Local sans nom*'
    },

    surface: { type: 'number' },
    height: { type: 'number' },
    length: { type: 'number' },
    width: { type: 'number' },

    project: {
      model: 'project'
    }
  }
})
