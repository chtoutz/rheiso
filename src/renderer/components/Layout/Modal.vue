<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <nav class="panel">
          <div class="panel-block">
            <p class="control has-icons-left">
              <input class="input is-small" type="text" placeholder="Filtrer par numéro, nom...">
              <span class="icon is-small is-left">
                <i class="fa fa-search"></i>
              </span>
            </p>
          </div>
          <p class="panel-tabs">
            <a class="is-active">tous</a>
            <a>actifs</a>
            <a>électricité</a>
            <a>ventilation</a>
            <a>photovoltaïque</a>
            <a>archives</a>
          </p>
          <router-link class="panel-block is-active has-text-link" :to="{name: 'projects', params: { projectId: 1789 }}">
            <span class="panel-icon">
              <i class="fa fa-bolt"></i>
            </span>
            <span class="">300054-EKIUM BAT 228</span>
          </router-link>
          <router-link class="panel-block" :to="{name: 'drawing', params: { }}">
            <span class="panel-icon">
              <!-- <i class="fa fa-bolt"></i> -->
            </span>
            300067-MARCOULE BAT 017
          </router-link>
          <a class="panel-block">
            <span class="panel-icon">
              <!-- <i class="fa fa-sun-o"></i> -->
            </span>
            400001-NARBONNE
          </a>
          <a class="panel-block">
            <span class="panel-icon">
              <!-- <i class="fa fa-exchange"></i> -->
            </span>
            400013-GREEN PEACE
          </a>
        </nav>
      </div>

    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
export default {
  name: 'modal'
}
</script>

<style lang="css">
</style>
