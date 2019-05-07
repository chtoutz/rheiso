/*****************************
 * RECTANGLE Shape component *
 *****************************/

const shapeDefs = {
  'fill': 'none',
  'fill-opacity': 0.5,
  'stroke': 'black',
  'stroke-width': 1
}

/**
 * Init shape using SVG.js draw plugin
 * @param  {Object} draw    The SVG.js instance
 * @param  {Object} options Custom options to merge with defaults
 * @return {Object}         this
 */
const init = function (draw, options) {
  const self = this
  options = Object.assign(shapeDefs, options)

  return draw.rect().draw().attr(options)
    .on('drawstart', self.drawstart)
    .on('drawstop', self.drawstop)
}

const drawstart = function () {
  var self = this
  setTimeout(function () {
    self.attr({fill: 'red'})
  }, 1000)
  document.addEventListener('keydown', function (e) {
    // Enter key
    if (e.keyCode === 13) {
      self.draw('done')
      self.off('drawstart')
    }
    // Ctrl key
    if (e.keyCode === 17) {
      self.draw('param', 'snapToGrid', 20)
    }
  })

  document.addEventListener('keyup', function (e) {
    self.draw('param', 'snapToGrid', 1)
  })
}

const drawstop = function () {
  // TODO: Context menu to insert equipment or continue line
  // TODO: Use active drawing plan (left/right/above) value to set skew value, etc.
  // remove listener
}

export default {
  shapeDefs,
  init,
  drawstart,
  drawstop
}
