<template>
  <div class="" id="iso-cube">
    Cube {{ viewPlan }}
  </div>
</template>

<script>
export default {
  props: {
    viewPlan: {
      type: String,
      validator: function (value) {
        return ['iso-left', 'iso-right', 'iso-above', 'ortho', 'free'].includes(value)
      }
    }
  },
  mounted: function () {
    // console.log(this.viewPlan)
    // this.$set(this.viewPlan, 'coco')
  },
  methods: {
    createCube: function (draw) {
      draw.rect(40, 40)
        .fill('blue').opacity(0.3)
        .move(150, 50)
        .transform({rotation: 30})
    }
  },
  name: 'iso-cube'
}
</script>

<style lang="css">
#iso-cube {
  position: absolute;
  top: 50px;
  right: 50px;
}
</style>
