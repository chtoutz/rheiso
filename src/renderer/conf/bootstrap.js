// src/renderer/conf/bootstrap.js
import Waterline from 'waterline'
import models from '@/models'
import conf from '@/conf/datastore'
const { app } = require('electron').remote

let initDatabase = (next) => {
  let waterline = new Waterline()
  waterline.registerModel(models.File)
  waterline.registerModel(models.Project)
  waterline.registerModel(models.Fileset)
  waterline.registerModel(models.Room)

  waterline.initialize(conf, (err, ontology) => {
    return next(err, ontology)
  })
}

let _init = async function (done) {
  console.log('Start bootstrap...', app.getPath('exe'))

  // TODO: Use async to execute each potential other action in waterfall or parallel
  initDatabase((err, ontology) => {
    // if (err) {
    //   console.log(err)
    // }
    return done(err, ontology)
  })
}

export default {
  _init,
  initDatabase
}
