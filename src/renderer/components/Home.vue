<template>
<section id="home">
  <article class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <img id="rheiso-logo" src="~@/assets/rheiso-logo.svg" alt="electron-vue">
        <p class="content">
          <span class="is-light">Connecté en tant que </span> <strong class="is-dark">Valentin STUTZ</strong>
          &nbsp;
          <span class="icon is-small"><i title="Fermer la session" class="fa fa-power-off file-label"></i></span>
        </p>
      </div>
    </div>
  </article>

  <article class="section">

    <div class="container is-fluid content">
      <div class="columns">
        <div class="column is-4">
          <p class="subtitle">Projet actif</p>
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <span class="icon">
                    <i class="fa fa-file fa-2x"></i>
                  </span>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ $settings.get('activeProject.name') }}</p>
                </div>
              </div>

              <div class="content">
                <a href="#">#css</a> <a href="#">#responsive</a>
                <!-- <br>
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <span class="subtitle">Todo</span>
          <ul>
            <li>Remove the cards below (projects and tasks)</li>
            <li>Move tasks in navbar, like notifications</li>
            <li>In this page, display infos like in MKV Bot dashboard : logs content, local files that were created/edited/deleted, latests files opened, whatever the project, stats (number of projects, using local or API mode, number of libs (symbols, products...))</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="columns">

      <div class="column">
        <!-- <projects></projects> -->
      </div>

      <div class="column">
        <!-- <tasks></tasks> -->
      </div>
    </div>
  </article>
  <!-- <modal></modal> -->
</section>
</template>

<script>
import Projects from '@/components/Projects/Panel'
import Tasks from '@/components/Projects/Tasks'
import Modal from '@/components/Layout/Modal'

// TODO: Inspire from Plex UI
export default {
  name: 'home',
  components: {
    Projects,
    Modal,
    Tasks
  },
  data () {
    return {
      // project: { projectId: 1789 }
    }
  },
  methods: {
    // open (link) {
    //   this.$electron.shell.openExternal(link)
    // }
  }
}
</script>

<style>
#rheiso-logo {
  max-width: 500px;
  /* transform:scale(0.5);
  -webkit-transform:scale(0.5); */
  padding: 20px 0 30px;
}
</style>
