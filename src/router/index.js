import Vue from 'vue'
import VueRouter from 'vue-router'
const ProjectInfo = () => import('@/pages/Project/ProjectInfo')
const ProjectStructure = () => import('@/pages/Project/ProjectStructure')
const InterNational = () => import('@/pages/Project/InterNational')
const TinymceEditor = () => import('@/pages/Project/TinymceEditor')
const Caculation = () => import('@/pages/TianWen/Caculation')
const AliIconFont = () => import('@/pages/Project/AliIconFont')
const CssUnknown = () => import('@/pages/ReaderBooks/CssUnknown')
const CssPage1 = () => import('@/pages/ReaderBooks/CSS/CssPage1')
const CssPage2 = () => import('@/pages/ReaderBooks/CSS/CssPage2')
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
      path: '/project/richeditor',
      name: 'TinymceEditor',
      component: TinymceEditor
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
    },
    {
      path: '/ReaderBooks/CssUnknown',
      name: 'CssUnknown',
      component: CssUnknown,
      child: [
        {
          path: '/ReaderBooks/CssUnknown/csspage1',
          name: 'CssPage1',
          component: CssPage1,
          meta:{
            index: 0
          }
        },
        {
          path: '/ReaderBooks/CssUnknown/csspage2',
          name: 'CssPage2',
          component: CssPage2,
          meta:{
            index: 1
          }
        }
      ]
    }
  ]
})