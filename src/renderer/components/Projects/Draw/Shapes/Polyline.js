/****************************
 * POLYLINE Shape component *
 ****************************/

const shapeDefs = {
  'fill': 'none',
  'fill-opacity': 0.5,
  'stroke': 'black',
  'stroke-width': 1
}

/**
 * Init shape using SVG.js draw plugin
 * @param  {Object} draw    The SVG.js instance
 * @param  {Object} attr    Custom attributes to merge with defaults
 * @return {Object}         this
 */
const init = function (drawing, attr) {
  const _this = this
  attr = Object.assign(shapeDefs, attr)

  return drawing.polyline().draw({viewPlan: 'iso-left'}).attr(attr)
    .on('drawstart', _this.drawstart)
    .on('drawstop', _this.drawstop)
    .on('drawupdate', _this.drawupdate)
    .on('drawpoint', _this.drawpoint)
    .on('drawdone', _this.drawdone)
    .on('drawcancel', _this.drawcancel)
}

const drawstart = function (event) {
  const _this = this
  // console.log(this.draw('param', 'viewPlan'))

  document.addEventListener('keydown', function (e) {
    // _this.draw('param', 'viewPlan', 'iso-left')
    // Enter key
    if (e.keyCode === 13) {
      _this.draw('done')
      _this.off('drawstart')
    }
    // Ctrl key
    if (e.keyCode === 17) {
      _this.draw('param', 'snapToGrid', 20)
    }
  })

  document.addEventListener('keyup', function (e) {
    _this.draw('param', 'snapToGrid', 1)
  })
}

const drawstop = function () {
  // TODO: Context menu to insert equipment or continue line
  // TODO: Use active drawing plan (left/right/above) value to set skew value, etc.
  // remove listener
}

const drawupdate = function (event) {
  // const _this = this
  // console.log(this.draw.params('viewPlan'))
  // this.params('viewPlan')
  // console.log(this._array.value.length)
  // if (this.array().valueOf().length > 1) {
  //   // console.log('ok')
  //   this.draw('param', 'viewPlan', 'iso-left')
  // }
}

const drawpoint = function (event) {
  // this.draw('param', 'viewPlan', 'iso-left')
  // const _this = this
  // console.log(this.array().valueOf().length)
  // if (this.array().valueOf().length > 0) {
  //   // console.log('ok')
  //   this.draw('param', 'viewPlan', 'iso-left')
  // }
}

const drawdone = function (event) {
  // const _this = this
}

const drawcancel = function (event) {
  // console.log(this)
}

export default {
  shapeDefs,
  init,
  drawstart,
  drawstop,
  drawupdate,
  drawpoint,
  drawdone,
  drawcancel
}
