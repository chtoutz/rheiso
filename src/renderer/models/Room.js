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

    _building: { type: 'string' },
    _floor: { type: 'string' },
    _number: {
      type: 'string',
      required: true
    },
    _name: {
      type: 'string',
      defaultsTo: '*Local sans nom*'
    },

    _length: { type: 'number' },
    _width: { type: 'number' },
    _surface: { type: 'number' },
    _height: { type: 'number' },

    project: {
      model: 'project'
    }
  }
})
