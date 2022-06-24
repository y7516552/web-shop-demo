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
    meta: {
      title: '後臺'
    },
    children: [
      {
        path: 'products',
        component: () => import('../views/ProductList.vue'),
        meta: {
          title: '後臺 - 產品列表'
        }
      },
      {
        path: 'orders',
        component: () => import('../views/OrderList.vue'),
        meta: {
          title: '後臺 - 訂單列表'
        }
      },
      {
        path: 'vouchers',
        component: () => import('../views/VoucherList.vue'),
        meta: {
          title: '後臺 - 優惠券列表'
        }
      },
      {
        path: 'articles',
        component: () => import('../views/ArticleList.vue'),
        meta: {
          title: '後臺 - 最新消息列表'
        }
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../views/UserBoard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue'),
        meta: {
          title: '塔可餅車車 - 購物車'
        }
      },
      {
        path: 'product',
        component: () => import('../views/UserProductList.vue'),
        meta: {
          title: '塔可餅車車 - 美味精選'
        }
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue'),
        meta: {
          title: '塔可餅車車 - 美味精選'
        }
      },
      {
        path: 'orders',
        component: () => import('../views/UserOrders.vue'),
        meta: {
          title: '塔可餅車車 - 訂單查詢'
        }
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckout.vue'),
        meta: {
          title: '塔可餅車車 - 結帳頁'
        }
      },
      {
        path: 'story',
        component: () => import('../views/AboutView.vue'),
        meta: {
          title: '塔可餅車車 - 車車故事'
        }
      },
      {
        path: 'news',
        component: () => import('../views/NewsView.vue'),
        meta: {
          title: '塔可餅車車 - 最新消息'
        }
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
