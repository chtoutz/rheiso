import Waterline from 'waterline'

export default Waterline.Collection.extend({
  identity: 'network',
  datastore: 'default',
  primaryKey: '_id',

  attributes: {
    _id: {
      type: 'number',
      autoMigrations: {autoIncrement: true}
    },

    _name: {
      type: 'string',
      defaultsTo: '*Réseau sans nom*'
    },

    _type: {
      type: 'string'
      // isIn: ['air-supply', 'air-return', 'air-transfer']
    },

    project: {
      model: 'project'
    }
  }
})
