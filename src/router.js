import Vue from 'vue'
import Router from 'vue-router'
import home from './views/Home.vue'
import login from './views/login.vue'
import users from './views/users/user.vue'
import goods from './views/goods/goods.vue'
import add from './views/goods/add.vue'
import add1 from './views/goods/add1.vue'
import params from './views/goods/params.vue'
import params1 from './views/goods/params1.vue'
import updata from './views/goods/updata.vue'
import categories from './views/goods/cate.vue'
import roles from './views/quanxian/roles.vue'
import roles1 from './views/quanxian/roles1.vue'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            children: [{
                    path: '/users',
                    name: 'users',
                    component: users,
                },

                {
                    path: '/goods',
                    name: 'goods',
                    component: goods,

                },
                {
                    path: '/categories',
                    name: 'categories',
                    component: categories,

                },

                {
                    path: '/goods/add',
                    name: 'add',
                    component: add,

                },
                {
                    path: '/goods/add1',
                    name: 'add1',
                    component: add1,

                },
                {
                    path: '/params',
                    name: 'params',
                    component: params,

                },
                {
                    path: '/params1',
                    name: 'params1',
                    component: params1,

                },
                {
                    path: '/goods/updata/:id',
                    name: 'updata',
                    component: updata,

                },
                {
                    path: '/roles1',
                    name: 'roles1',
                    component: roles1,
                },
                {
                    path: '/roles',
                    name: 'roles',
                    component: roles,
                },
            ]
        },

        {
            path: '/login',
            name: 'login',
            component: login
        },
    ]
})