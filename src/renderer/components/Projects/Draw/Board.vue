<template>
  <div>
    <div id="drawing-zone"></div>
    <iso-cube :view-plan="viewPlan"></iso-cube>
    <!-- <grid :view-plan="viewPlan" :draw="draw"></grid> -->
  </div>
</template>

<script>
import SVG from 'svg.js'
// import Grid from './Grid'
import IsoCube from './IsoCube'
import Shapes from './Shapes'

// TODO: npm remove --save svg.draw.js
// require('svg.draw.js')
// require('./svg.draw.js')
// require('svg.select.js')

// SVG.extend(SVG.Shape, {
//   paintRed: function () {
//     return this.fill('red')
//   },
//   snapToAngle: function (angle) {
//     console.log(this)
//     return this.fill('red')
//   }
// })

export default {
  data () {
    return {
      viewPlan: 'iso-left',
      draw: {}
    }
  },
  mounted: function () {
    // TODO: Load data from conf file (or plain SVG ?) if NOT a new draw
    var draw = SVG('drawing-zone').size('100%', '100%')
    var zero = draw.group().attr({id: 'zero'})
    // TODO: Load {options} object depending on context (user prefs, active layer, sub-shape...)
    var options = {}
    // var self = this
    // this.draw = draw
    // Grid.methods.isoLeft(zero)
    IsoCube.methods.createCube(draw)

    /**
     * Listen to Toolbar click OR CLI entry from '../Draw.vue' to start drawing shape
     */
    this.$parent.$on('init-polyline', () => {
      Shapes.Polyline.init(zero, options)
    })
    this.$parent.$on('init-rect', () => {
      Shapes.Rect.init(zero, options)
    })
    // this.$parent.$on('start-select', () => {
    //   // zero.select('.selected').removeClass('selected').selectize(false, {deepSelect: true})
    //   zero.each(function (i, children) {
    //     // Fade all elements
    //     // this.opacity(0.3)
    //     // Handle first click event (select)
    //     // this.selectize(false)
    //     this.click(function () {
    //       self.toggleSelect(this)
    //       // TODO: Move this line to CSS for permanent changes
    //       zero.select('.svg_select_boundingRect').fill('none')
    //     })
    //   }, true)
    // })
    // setTimeout(function () {
    //   self.draw = draw
    //   self.viewPlan = 'free'
    //   console.log(self.draw)
    // }, 1000)
  },
  methods: {
    // toggleSelect (obj) {
    //   if (obj.hasClass('selected')) {
    //     console.log('Unselected ' + obj)
    //     obj.selectize(false, {deepSelect: true}).removeClass('selected')
    //   } else {
    //     console.log('Selected ' + obj)
    //     obj.selectize({deepSelect: true}).addClass('selected')
    //   }
    //   // console.log(obj)
    // }
  },
  name: 'board',
  components: {
    // 'grid': Grid,
    'iso-cube': IsoCube
  }
}
</script>

<style scoped>
  #drawing-zone {
    height: 100%;
    /*margin: 0;
    padding: 0;*/
    background: rgba(21, 159, 27, 0.4)
  }
  /*rect.svg_select_boundingRect {
    fill: 'none';
    fill-opacity: 0
  }*/
</style>
