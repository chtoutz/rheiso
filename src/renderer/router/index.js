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
    // {
    //   path: '/drawing',
    //   name: 'drawing',
    //   component: require('@/components/Drawing').default
    // },
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
      path: '/projects/:id',
      name: 'projects',
      component: require('@/components/Projects').default,
      children: [
        {
          path: 'rooms',
          name: 'projects.rooms',
          component: require('@/components/Projects/Rooms').default,
          meta: { showTopBar: true }
        },
        // {
        //   path: 'networks',
        //   name: 'projects.networks',
        //   component: require('@/components/Projects/Networks').default,
        //   meta: { showTopBar: true }
        // },
        {
          path: 'explore',
          name: 'projects.explore',
          component: require('@/components/Projects/Explore').default
        },
        {
          path: 'filesets',
          name: 'projects.filesets',
          component: require('@/components/Projects/Filesets').default
        },
        {
          path: 'files',
          name: 'projects.files',
          component: require('@/components/Projects/Files').default
        }
        // {
        //   path: 'heat-balance',
        //   name: 'projects.heat-balance',
        //   component: require('@/components/Projects/HeatBalance').default
        // }
      ]
    },
    {
      path: 'drawing',
      name: 'drawing',
      component: require('@/components/Projects/Drawing').default
      // component: require('@/components/Drawing').default
    },
    {
      path: '/rheo-balances',
      name: 'rheo-balances',
      component: require('@/components/RheoBalance').default
    },
    {
      path: '/rheo-balance/:balanceId',
      name: 'rheo-balance',
      component: require('@/components/RheoBalance').default
    },
    {
      path: '/liraries',
      name: 'libraries',
      component: require('@/components/Projects').default,
      children: [
        {
          path: 'symbols',
          name: 'libraries.symbols',
          component: require('@/components/Projects/Rooms').default,
          meta: { showBottomBar: true, showTopBar: true }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
