import Vue from 'vue'
import VueRouter from 'vue-router'
const ProjectInfo = () => import('@/pages/Project/ProjectInfo')
const ProjectStructure = () => import('@/pages/Project/ProjectStructure')
const InterNational = () => import('@/pages/Project/InterNational')
const TinymceEditor = () => import('@/pages/Project/TinymceEditor')
const Caculation = () => import('@/pages/TianWen/Caculation')
const AliIconFont = () => import('@/pages/Project/AliIconFont')
const CssUnknown = () => import('@/pages/ReaderBooks/CssUnknown')
const ComponentList = () => import('@/pages/ComponentList/ComponentList')
const InputComponent = () => import('@/pages/ComponentList/InputComponent')
const SingleSelect = () => import('@/pages/ComponentList/SingleSelect')
const Cascader = () => import('@/pages/ComponentList/Cascader')
const Checked = () => import('@/pages/ComponentList/Checked')
const PageSwich = () => import('@/pages/ComponentList/PageSwich')
const Search = () => import('@/pages/ComponentList/Search')
const Table = () => import('@/pages/ComponentList/Table')
const Radio = () => import('@/pages/ComponentList/Radio')
const DatePicker = () => import('@/pages/ComponentList/DatePicker')
const FileUpload = () => import('@/pages/ComponentList/FileUpload')
const ImportExcel = () => import('@/pages/ComponentList/ImportExcel')
const ExportExcel = () => import('@/pages/ComponentList/ExportExcel')
const CssPage1 = () => import('@/pages/ReaderBooks/CSS/CssPage1')
const CssPage2 = () => import('@/pages/ReaderBooks/CSS/CssPage2')
const CssPage3 = () => import('@/pages/ReaderBooks/CSS/CssPage3')
const CopyComponent = () => import('@/pages/ComponentList/CopyComponent')
const Lodash = () => import('@/pages/ReaderBooks/Lodash/lodash')
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
      path: '/ComponentList/ComponentList',
      name: 'ComponentList',
      component: ComponentList
    },
    {
      path: '/ComponentList/InputComponent',
      name: 'InputComponent',
      component: InputComponent
    },
    {
      path: '/ComponentList/singleSelect',
      name: 'SingleSelect',
      component: SingleSelect
    },
    {
      path: '/ComponentList/cascader',
      name: 'Cascader',
      component: Cascader
    },
    {
      path: '/ComponentList/Checked',
      name: 'Checked',
      component: Checked
    },
    {
      path: '/ComponentList/radio',
      name: 'Radio',
      component: Radio
    },
    {
      path: '/ComponentList/datePicker',
      name: 'DatePicker',
      component: DatePicker
    },
    {
      path: '/ComponentList/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/ComponentList/importExcel',
      name: 'ImportExcel',
      component: ImportExcel
    },
    {
      path: '/ComponentList/exportExcel',
      name: 'ExportExcel',
      component: ExportExcel
    },
    {
      path: '/ComponentList/fileUpload',
      name: 'FileUpload',
      component: FileUpload
    },
    {
      path: '/ComponentList/pageSwich',
      name: 'PageSwich',
      component: PageSwich
    },
    {
      path: '/ComponentList/tabel',
      name: 'Table',
      component: Table
    },
    {
      path: '/ComponentList/CopyComponent',
      name: 'CopyComponent',
      component: CopyComponent
    },
    {
      path: '/readerBooks/Lodash',
      name: 'Lodash',
      component: Lodash
    },
    {
      path: '/readerBooks/CssUnknown',
      name: 'CssUnknown',
      component: CssUnknown,
      meta: {
        index: 1
      },
      children: [         // 路由嵌套
        {
          path: 'csspage1',
          name: 'CssPage1',
          component: CssPage1,
          meta:{
            index: 1
          }
        },
        // {
        //   path: '*',
        //   redirect: {
        //     name: 'CssPage1'
        //   }
        // },
        // {
        //   path: '/',
        //   redirect: {
        //     name: 'CssPage1'
        //   }
        // },
        {
          path: 'csspage2',
          name: 'CssPage2',
          component: CssPage2,
          meta:{
            index: 2
          }
        },
        {
          path: 'csspage3',
          name: 'CssPage3',
          component: CssPage3,
          meta:{
            index: 3
          }
        }
      ]
    }
  ]
})