import Waterline from 'waterline'

export default Waterline.Collection.extend({
  identity: 'fileset',
  datastore: 'default',
  primaryKey: '_id',

  attributes: {
    _id: {
      type: 'number',
      autoMigrations: {autoIncrement: true}
    },
    name: {
      type: 'string',
      defaultsTo: 'Jeu de fichier'
    },
    // nbItems: {
    //   type: 'number',
    //   defaultsTo: 0
    // },
    /**
     * Query is an object defining a Waterline query, filtering files and documents (by extension, name containing a string, excluding some paths, ...)
     * @type {Object}
     */
    // TODO: In components, add query.project = $settings.get('activeProject.id')
    query: {
      type: 'json'
    },

    // Add a reference to Pets
    project: {
      model: 'project'
    }
  }
})
