import Vue from 'vue'
import VueRouter from 'vue-router'
const ProjectInfo = () => import('@/pages/Project/ProjectInfo')
const ProjectStructure = () => import('@/pages/Project/ProjectStructure')
const InterNational = () => import('@/pages/Project/InterNational')
const Caculation = () => import('@/pages/TianWen/Caculation')
const AliIconFont = () => import('@/pages/Project/AliIconFont')
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
      path: '/project/structure',
      name: 'ProjectStructure',
      component: ProjectStructure
    },
    {
      path: '/project/international',
      name: 'International',
      component: InterNational
    },
    {
      path: '/tianwen/Caculation',
      name: 'Caculation',
      component: Caculation
    },
    {
      path: '/project/iconUse',
      name: 'AliIconFont',
      component: AliIconFont
    }
  ]
})