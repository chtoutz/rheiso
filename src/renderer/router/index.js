import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default,
      meta: { sidebar: false, header: true }
    },
    {
      path: '/drawing',
      name: 'drawing',
      component: require('@/components/Drawing').default
    },
    {
      path: '/settings',
      name: 'settings',
      components: {
        default: require('@/components/Settings').default,
        sidebar: require('@/components/Settings/SettingsSidebar').default
      },
      meta: { sidebar: true },
      children: [
        // {
        //   path:
        // }
      ]
    },
    {
      path: '/projects',
      name: 'projects',
      component: require('@/components/Projects').default,
      children: [
        // TODO: for later, allow custom layouts stored in DB looking like example in store/Layouts.db
        {
          path: ':projectId',
          meta: { sidebar: true, breadcrumb: true },
          components: {
            default: require('@/components/Projects/Explore').default,
            sidebar: require('@/components/Projects/ProjectSidebar').default,
            breadcrumb: require('@/components/Projects/ProjectBreadcrumb').default
          }
        }
      ]
    },
    // {
    //   path: '/project/:projectId',
    //   name: 'project',
    //   meta: { sidebar: true, breadcrumb: true },
    //   components: {
    //     default: require('@/components/Projects/Explore').default,
    //     sidebar: require('@/components/Projects/ProjectSidebar').default,
    //     breadcrumb: require('@/components/Projects/ProjectBreadcrumb').default
    //   }
    // },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
