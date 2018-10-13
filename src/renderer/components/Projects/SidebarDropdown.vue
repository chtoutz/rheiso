<template>
  <ul class="menu-list">
    <li>
      <div class="dropdown is-hoverable" id="projects-dropdown">
        <div class="dropdown-trigger">
          <a class="button is-fullwidth is-rounded" aria-haspopup="true" aria-controls="projects-list">
            <span>Sélectionner un projet</span>
            <span class="icon is-small">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </div>
        <div class="dropdown-menu" id="projects-list" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item">
              Overview
            </a>
            <a href="#" class="dropdown-item">
              Modifiers
            </a>
            <a href="#" class="dropdown-item">
              Grid
            </a>
            <a href="#" class="dropdown-item">
              Form
            </a>
            <a href="#" class="dropdown-item">
              Elements
            </a>
            <a href="#" class="dropdown-item">
              Components
            </a>
            <a href="#" class="dropdown-item">
              Layout
            </a>
            <hr class="dropdown-divider">
            <a href="#" class="dropdown-item">
              More
            </a>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'project-sidebar-dropdown'
}
</script>

<style lang="css">
</style>
