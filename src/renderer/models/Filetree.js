import Waterline from 'waterline'

export default Waterline.Collection.extend({
  identity: 'filetree',
  datastore: 'default',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      autoMigrations: {autoIncrement: true}
    },
    /**
     * Query is an object defining a Waterline query, filtering files and documents (by extension, name containing a string, excluding some paths, ...)
     * @type {Object}
     */
    query: {
      type: 'json'
    },

    // Add a reference to Pets
    project: {
      model: 'project'
    }
  }
})
