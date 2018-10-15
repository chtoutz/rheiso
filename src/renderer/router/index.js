import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/drawing',
      name: 'drawing',
      component: require('@/components/Drawing').default
    },
    {
      path: '/settings',
      component: require('@/components/Settings').default,
      children: [
        {
          path: '',
          name: 'settings',
          component: require('@/components/Settings/GeneralSettings').default
        },
        {
          path: 'projects',
          name: 'settings.projects',
          component: require('@/components/Settings/ProjectsSettings').default
        }
      ]
    },
    {
      path: '/projects',
      name: 'projects',
      component: require('@/components/Projects').default,
      children: [
        // TODO: for later, allow custom layouts stored in DB looking like example in store/Layouts.db
        {
          path: 'rooms',
          name: 'projects.rooms',
          component: require('@/components/Projects/Rooms').default
        },
        {
          path: 'explore',
          name: 'projects.explore',
          component: require('@/components/Projects/Explore').default
        },
        {
          path: 'filetree/:filetree',
          name: 'projects.filetree',
          component: require('@/components/Projects/Filetree').default
        },
        {
          path: 'drawing',
          name: 'projects.drawing',
          component: require('@/components/Projects/Drawing').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
