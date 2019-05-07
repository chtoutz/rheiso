<template>
  <nav class="navbar is-transparnt">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{ name: 'landing-page' }">
        <span class="icon" style="color: #333;">
          <i class="fa fa-lg fa-home fa-2x"></i>
        </span>
      </router-link>

      <div class="navbar-burger burger" data-target="navMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navMenu" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item " title="Sélectionner" @click="$emit('select')">
          <span class="icon">
            <i class="fa fa-mouse-pointer"></i>
          </span>
        </a>
        <a class="navbar-item" title="Ligne"  @click="$emit('draw', 'polyline')">
          <span class="icon">
            <i class="fa fa-pencil"></i>
          </span>
        </a>
        <a class="navbar-item" title="Rectangle"  @click="$emit('draw', 'rect')">
          <span class="icon">
            <i class="fa fa-square-o"></i>
          </span>
        </a>
        <a class="navbar-item" title="Cercle">
          <span class="icon">
            <i class="fa fa-circle-o"></i>
          </span>
        </a>
      </div>

      <div class="navbar-end">
        <a class="navbar-item" href="#" target="_blank">
          <span class="icon" style="color: #333;">
            <i class="fa fa-lg fa-github"></i>
          </span>
        </a>
        <a class="navbar-item" href="#" target="_blank">
          <span class="icon" style="color: #333;">
            <i class="fa fa-lg fa-github"></i>
          </span>
        </a>
      </div>
    </div>

    <!-- <div class="tabs is-small is-centered" id="bottom">
      <ul>
        <li class="is-active"><a>Pictures</a></li>
        <li><a>Music</a></li>
        <li><a>Videos</a></li>
        <li><a>Documents</a></li>
      </ul>
    </div> -->
  </nav>
</template>

<script>
export default {
  name: 'top-toolbar'
}
</script>

<style lang="css">
/*#bottom {
  position: fixed;
  bottom: 0
}*/
</style>
