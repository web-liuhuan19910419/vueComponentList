import Vue from 'vue'
import VueRouter from 'vue-router'
const ProjectInfo = () => import('@/pages/Project/ProjectInfo')
const ProjectStructure = () => import('@/pages/Project/ProjectStructure')
const InterNational = () => import('@/pages/Project/InterNational')
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '*',
      redirect: {
        name: 'ProjectInfo'
      }
    },
    {
      path: '/',
      redirect: {
        name: 'ProjectInfo'
      }
    },
    {
      path: '/project/info',
      name: 'ProjectInfo',
      component: ProjectInfo
    },
    {
      path: '/peoject/structure',
      name: 'ProjectStructure',
      component: ProjectStructure
    },
    {
      path: '/peoject/international',
      name: 'International',
      component: InterNational
    }
  ]
})