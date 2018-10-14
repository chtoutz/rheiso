<template>
  <div id="projects-tasks">
    <nav class="panel">
      <p class="panel-heading">
        Tâches
      </p>
      <div class="panel-block">
        <p class="control has-icons-left">
          <input class="input is-small" type="text" placeholder="Nouvelle note">
          <span class="icon is-small is-left">
            <i class="fa fa-plus"></i>
          </span>
        </p>
      </div>
      <label class="panel-block">
        <input type="checkbox">
        Relancer Fournisseur 1 pour les registres
      </label>
      <label class="panel-block">
        <input type="checkbox">
        Diffuser <strong>Plan d'implantation bloc A</strong>
      </label>
      <div class="panel-block">
        <button class="button is-link is-outlined is-fullwidth is-success">
          C'est fait !
        </button>
      </div>
    </nav>
    <p>Afficher les 5/10 derniers to-dos (ou les plus urgents à terminer si système d'importance et due date), tous projets confondus</p>
  </div>
</template>

<script>
export default {
  name: 'projects-tasks'
}
</script>

<style lang="css">
</style>
