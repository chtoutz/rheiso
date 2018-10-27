import Waterline from 'waterline'
// TODO: Read the $settings.get('activeProject.name') to chose chich database file to load.
// TODO: Somewhere, make a "loadDatabase" function to load needed DB; Call it on app load and after changing active project
export default Waterline.Collection.extend({
  identity: 'file',
  datastore: 'default',
  primaryKey: 'id',

  attributes: {
    id: {
      type: 'number',
      autoMigrations: {autoIncrement: true}
    },
    path: {
      type: 'string',
      required: true,
      unique: true
    },
    name: { type: 'string' },
    size: { type: 'number' },
    type: { type: 'string' },
    mtime: { type: 'string' },
    birthdate: { type: 'string' }

    // Add a reference to Pets
    // pets: {
    //   collection: 'pet',
    //   via: 'owner'
    // }
  }
})
