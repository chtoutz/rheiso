<template></template>

<script>
  export default {
    props: {
      draw: {
        type: Object
      },
      viewPlan: {
        type: String,
        validator: function (value) {
          return ['iso-left', 'iso-right', 'iso-above', 'ortho', 'free'].includes(value)
        }
      }
    },
    mounted: function () {
      // this.draw = SVG('drawing').size('100%', '100%')
      // console.log(this.draw)
      // var self = this
      // setTimeout(function () {
      //   console.log(self.draw)
      // }, 1500)
      // this.draw.rect(50, 50).attr({ fill: '#f06' })
    },
    methods: {
      test: function (draw) {
        // console.log(draw)
        draw.line(0, 100, 100, 0).stroke({width: 1})
      },
      isoLeft: (draw) => {
        var de = draw.line(0, 100, 100, 100).stroke({width: 0.5}).rotate(-30)
        de.clone().y(200)
        de.clone().y(300)
      }
    }
  }
</script>
