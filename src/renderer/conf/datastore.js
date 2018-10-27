// src/renderer/conf/datastore.js
import sailsDiskAdapter from 'sails-disk'

// TODO:

export default {
  adapters: {
    'disk': sailsDiskAdapter
    // 'server': sailsDiskAdapter
  },
  // ...
  // Override the default datastore settings in production.
  datastores: {
    default: {
      adapter: 'disk'
      // No need to set `adapter` again, because we already configured it in `config/datastores.js`.
      // url: 'mysql://lkjdsf4a23d9xf4:kkwer4l8adsfasd@u23jrsdfsdf0sad.aasdfsdfsafd.us-west-2.ere.amazonaws.com:3306/ke9944a4x23423g',
    }
  }
  // ...
}
