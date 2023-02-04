import {createRouter, createWebHistory} from "vue-router"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            component: () => import('./views/Index.vue'),
            path: '/'
        },
        {
            name: 'product.index',
            component: () => import('./views/Product/Index.vue'),
            path: '/product/index'
        },
        {
            name: 'user.login',
            component: () => import('./views/User/Login.vue'),
            path: '/user/login'
        }
        ,
        {
            name: 'user.signup',
            component: () => import('./views/User/SignUp.vue'),
            path: '/user/sign-up'
        }
    ]
})

const freeToVisit = ['home']
const forbidForAuth = ['user.login', 'user.signup']
router.beforeEach((to, from) => {
    const accessToken = localStorage.getItem('access_token')
    const nextPageName = to.name;

    if (!accessToken) {
        if (!freeToVisit.includes(nextPageName) && !forbidForAuth.includes(nextPageName)) {
            return {name: 'user.login'}
        }
    } else if (accessToken && forbidForAuth.includes(nextPageName)) {
        return {name: 'home'}
    }
})

export default router
