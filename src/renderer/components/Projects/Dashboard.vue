<template>
  <div class="section">
    <div class="columns">
      <div class="column is-7">
        <panel></panel>
      </div>

      <div class="column">
        <article class="message is-primary" v-if="!activeProjects || activeProjects.length === 0">
          <div class="message-header">
            <p>Aucun projet sélectionné</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
            <p>N'apparait que lorsqu'aucun projet n'est actif.</p>
            <p>A gauche, un panel avec liste des dossiers présents dans le settings.general.projectsRoot. Les projets créés à partir de ces dossiers sont placés en haut de liste, dans un sous-menu à part. L'autre sous-menu comportant donc les dossiers du root pas encore ajoutés en tant que projet.</p>
            <p>A droite, une card bulma avec les infos du ou des projets sélectionnés (sélectionné != ouvert, pour ça il faut 2 clics ou clic bouton dans propriétés). Props : emplacement, date de création, nombre de tâches à faire, nombre de livrables à finir...</p>
          </div>
        </article>
        <props v-else></props>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '@/components/Projects/Panel'
import Props from '@/components/Projects/Props'

export default {
  name: 'projects-dashboard',
  components: {
    Panel,
    Props
  }
}
</script>

<style lang="css">
</style>
