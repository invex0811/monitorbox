import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        // meta: {layout:'Navbar'},
        component: Home
    },
    {
        path: '/salary',
        name: 'Salary',
        // meta: {layout:'Navbar'},
        component: () => import('@/pages/Salary.vue')
    },
    {
        path: '/Gap&Unloading',
        name: 'Gap&Unloading',
        // meta: {layout:'Navbar'},
        component: () => import('@/pages/Gap&Unloading.vue')
    },
    // {
    //     path: '/AuditSpeed',
    //     name: 'AuditSpeed',
    //     // meta: {layout:'Navbar'},
    //     component: () => import('@/views/AuditSpeed.vue')
    // },
    // {
    //     path: '/test',
    //     name: 'test',
    //     // meta: {layout:'Navbar'},
    //     component: () => import('@/views/test.vue')
    // },

//   {
//     path: '/gapDateTime',
//     name: 'gapDateTime',
//     meta: {layout:'MainLayout'},
//     component: () => import('@/views/GapDateTime.vue')
//   },

]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

export default router