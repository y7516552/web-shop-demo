import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '塔可餅車車'
    }
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: '後臺登入'
    }
  },
  {
    path: '/dashboard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/ProductList.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/OrderList.vue')
      },
      {
        path: 'vouchers',
        component: () => import('../views/VoucherList.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/ArticleList.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../views/UserBoard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckout.vue')
      },
      {
        path: 'story',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: 'news',
        component: () => import('../views/NewsView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
