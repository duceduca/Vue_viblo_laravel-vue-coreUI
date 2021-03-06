import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '../containers/Full'

// Views
import Login from '../views/auth/login'
import Dashboard from '../views/Dashboard'
import User from '../views/user/index'
import UserEdit from '../views/user/edit'
import UserAdd from '../views/user/add'
import Markdown from '../views/markdown/index'
import FileManager from '../views/file-manager/index'

Vue.use(Router)

const router =    new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            component: Full,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                },
                {
                    name: 'User',
                    path: '/user',
                    redirect: 'user/page/1',
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'page/:page?/:search?',
                            name: 'User list',
                            component: User
                        },
                        {
                            path: 'add',
                            name: 'User add',
                            component: UserAdd
                        },
                        {
                            path: 'edit/:id',
                            name: 'User edit',
                            component: UserEdit
                        },
                        {
                            path: 'search/page/:page'
                        }
                    ]
                },
                {
                    path: '/markdown',
                    name: 'Markdown',
                    component: Markdown
                },
                {
                    path: '/file-manager',
                    name: 'FileManager',
                    component: FileManager
                }

            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let token = null;
        try {
            token = JSON.parse(localStorage.getItem('token'));
        } catch (error) {
            localStorage.removeItem('token');
            console.log('v??o');
            
        }
        if (!token) {

            return next({
                path: '/login',
                query: {
                    redirect: to.fullPath,
                },
            });
        }

        return next();
    }

    return next();

})

export default router
