// src/renderer/conf/bootstrap.js
import Waterline from 'waterline'
import models from '@/models'
const { app } = require('electron').remote

export default async function (done) {
  console.log('Start bootstrap...', app.getPath('exe'))

  let waterline = new Waterline()
  waterline.registerModel(models.File)
  return done()
}
