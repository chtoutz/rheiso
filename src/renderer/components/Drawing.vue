<template>
  <section class="section">
    <div class="">
      okok drawing.vue
    </div>
    <svg>
      <defs>
        <filter id="blobby" color-interpolation-filters="sRGB">
          <!-- Convert to greyscale -->
          <feColorMatrix type="saturate" values="0"/>
          <!-- Threshhold to black or white -->
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 0 0 0 0 1"/>
            <feFuncG type="discrete" tableValues="0 0 0 0 0 1"/>
            <feFuncB type="discrete" tableValues="0 0 0 0 0 1"/>
          </feComponentTransfer>
          <!-- Morphology filter to "erode" (shrink) the white areas -->
          <feMorphology operator="erode" radius="8"/>
          <!-- Blur to cause image to "spread" -->
          <feGaussianBlur stdDeviation="10"/>
          <!-- High contrast to threshhold again -->
          <!-- But this time we switch black and white as we -->
          <!-- will use this as an alpha mask in the next steps -->
          <!-- We only need one channel here -->
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="1 1 1 1 1 0"/>
          </feComponentTransfer>
          <!-- Convert the the red channel of this to an alpha channel -->
          <!-- The result is a black shape with an alpha mask of the right shape -->
          <feColorMatrix type="matrix" result="alpha-mask" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0 1 0 0 0 0"/>
          <!-- Create a blank white rectangle -->
          <feFlood flood-color="white" result="white-flood"/>
          <!-- Layer 1: Mask the blank white fill with the alpha mask we created earlier -->
          <feComposite in="white-flood" in2="alpha-mask" operator="in" result="masked-white"/>
          <!-- Layer 2: Grow the black shape to create our black outline "stroke" -->
          <feMorphology in="alpha-mask" operator="dilate" radius="1" result="black-stroke"/>
          <!-- Layer 3: Create a shadow to go at the back -->
          <feGaussianBlur in="alpha-mask" stdDeviation="10"/>
          <feOffset dx="5" dy="5" result="offset-blur"/>
          <feFlood flood-color="#000" flood-opacity="0.6"/>  <!-- Lighten the shadow a little -->
          <feComposite in2="offset-blur" operator="in" result="shadow"/>
          <!-- Merge the three layers together -->
          <feMerge>
            <feMergeNode in="shadow"/>
            <feMergeNode in="black-stroke"/>
            <feMergeNode in="masked-white"/>
          </feMerge>
        </filter>
      </defs>
      <g>
        <img src="http://www.moldfun.net/wp-content/uploads/2017/05/construction-de-maison-simple-immo-construction-plan-de-maison-simple-et-moderne-plan-des-maison-simple.png"/>
        <br>
        <div class="blob">
          <img src="http://www.moldfun.net/wp-content/uploads/2017/05/construction-de-maison-simple-immo-construction-plan-de-maison-simple-et-moderne-plan-des-maison-simple.png"/>
        </div>
      </g>
    </svg>
  </section>
</template>

<script>
export default {
  name: 'drawing',
  mounted () {
    console.log('drawing ok')
  }
}
</script>

<style lang="css">
img {
  width: 400px;

}

.blob {
  background-color: white;
  padding: 40px;
  filter: url(#blobby);
}

/* Hide the SVG element */
svg {
  width: 0px;
  height: 0px;
  position: absolute;
  left: -999px;
}
</style>
