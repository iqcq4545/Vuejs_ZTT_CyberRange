import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import ScenesList from '@/pages/faculty/scenes/List'
import Configuration from '@/pages/admin/Configuration'
import Index from '@/pages/index/Index'
import Scenes from '@/pages/faculty/Scenes'
import WeaponTest from '@/pages/faculty/WeaponTest'
import System from '@/pages/instructor/System'
import Software from '@/pages/instructor/Software'
import Battle from '@/pages/instructor/Battle'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/faculty/scenes',
      name: 'facultyScenes',
      component: ScenesList,
      title: "场景",
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/admin/configuration',
      name: 'Configuration',
      component: Configuration
    },
    {
      path: '/faculty/scenes',
      name: 'FacultyScenes',
      component: Scenes
    },
    {
      path: '/faculty/weapontest',
      name: 'WeaponTest',
      component: WeaponTest
    },
    {
      path: '/instructor/system',
      name: 'System',
      component: System
    },
    {
      path: '/instructor/software',
      name: 'software',
      component: Software
    },
    {
      path: '/instructor/battle',
      name: 'battle',
      component: Battle
    }
  ]
})
