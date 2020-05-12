import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import DemoList from '@/pages/faculty/List'
import Index from '@/pages/index/Index'
import ScenesList from '@/pages/faculty/scenes/ScenesList'
import StudentsList from '@/pages/faculty/students/StudentsList'
import TeamsList from '@/pages/faculty/teams/TeamsList'

import DevicesList from '@/pages/faculty/devices/DevicesList'
import SoftwareList from '@/pages/faculty/software/SoftwareList'

import Topology from '@/pages/faculty/topology/Topology'

import Configuration from '@/pages/admin/Configuration'
import WeaponTest from '@/pages/faculty/WeaponTest'
import WeaponManagement from '@/pages/faculty/WeaponManagement'
import Imitatescenes from '@/pages/instructor/Imitatescenes'
import Addchapter from '@/pages/instructor/Addchapter'
import Flag from '@/pages/instructor/flag'
import Setplay from '@/pages/instructor/setplay'

// import System from '@/pages/instructor/System'
// import Software from '@/pages/instructor/Software'
import Battle from '@/pages/instructor/Battle'
import BattleList from '@/pages/instructor/BattleList'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [{
        path: '/faculty/demo',
        name: 'facultyScenes',
        component: DemoList,
        meta: {
            title: "场景", //Luxiaonan
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: "登录", //Luxiaonan
        },
    },
    {
        path: '/index',
        name: 'Index',
        component: Index,
        meta: {
            title: "首页", //Luxiaonan
        },
    },
    {
        path: '/faculty/topology',
        name: 'topology',
        component: Topology,
        meta: {
            title: "拓扑管理", //Luxiaonan
        },
    },
    {
        path: '/faculty/scenes',
        name: 'scenes',
        component: ScenesList,
        meta: {
            title: "场景管理", //Miaoyan
        },
    },
    {
        path: '/faculty/students',
        name: 'students',
        component: StudentsList,
        meta: {
            title: "学员管理", //Miaoyan
        },
    },
    {
        path: '/faculty/teams',
        name: 'TeamsList',
        component: TeamsList,
        meta: {
            title: "战队管理", //Luxiaonan
        }
    },
    {
        path: '/faculty/devices',
        name: 'devices',
        component: DevicesList,
        meta: {
            title: "设备分配", //Miaoyan
        },
    },
    {
        path: '/faculty/software',
        name: 'SoftwareList',
        component: SoftwareList,
        meta: {
            title: "软件库管理", //Maxiaoran
        }
    },

    {
        path: '/admin/configuration',
        name: 'Configuration',
        component: Configuration
    },
    {
        path: '/faculty/weapontest',
        name: 'WeaponTest',
        component: WeaponTest,
        title: "武器测试",
    },
    {
        path: '/faculty/weaponmanagement',
        name: 'WeaponManagement',
        component: WeaponManagement
    },

    {
        path: '/instructor/addchapter',
        name: 'Addchapter',
        component: Addchapter //Miaoyan
    },
    {
        path: '/instructor/imitatescenes',
        name: 'Imitatescenes',
        component: Imitatescenes //Miaoyan
    },
    {
        path: '/instructor/flag',
        name: 'Flag',
        component: Flag //Miaoyan
    },
    {
        path: '/instructor/battle',
        name: 'battle',
        component: Battle //Miaoyan
    },
    {
        path: '/instructor/battlelist',
        name: 'battlelist',
        component: BattleList //Miaoyan
    },
    {
        path: '/instructor/setplay',
        name: 'setplay',
        component: Setplay, //Miaoyan
        title: "展示设置",
    },
    ]
})