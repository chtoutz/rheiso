import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: require('@/components/Dashboard').default,
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
      meta: { sidebar: true }
    },
    {
      path: '/project/:projectId',
      name: 'project',
      components: {
        default: require('@/components/Project').default,
        sidebar: require('@/components/Project/ProjectSidebar').default
      },
      meta: {
        // breadcrumb: true,
        sidebar: true
      },
      children: [
        // {
        //   path: 'panel',
        //   name: 'widget-panel',
        //   component: require('@/components/Widget/Panel').default
        // },
        // TODO: for later, allow custom layouts stored in DB looking like example in store/Layouts.db
        // {
        //   path: ':layout',
        //   name: 'project-layout',
        //   component: require('@/components/Layout').default
        // }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
