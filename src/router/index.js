import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/Home/HomeView.vue";
import CartView from "../views/Cart/CartView.vue";
import SigninView from "../container/singn/SigninView.vue";
const routes = [

  {
    path: '/',
    name: 'home',
    component: <HomeView />
  },
  {
    path: '/cart',
    name: 'cart',
    component: <CartView />
  },
  {
    path: '/perfume/:id',
    name: 'perfume',
    component: () => import('../views/perfume/ProductView.vue'),
    params: true
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => <SigninView />
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
