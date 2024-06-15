import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('../views/UserView.vue')
        },
        {
            path: '/tickets',
            name: 'tickets',
            component: () => import('../views/TicketsView.vue')
        },
        {
            path: '/order',
            name: 'order',
            component: () => import('../views/OrderView.vue')
        },
        {
            path: '/404',
            name: '404',
            component: () => import('../views/404.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/404'
        }

    ]
})

export default router
