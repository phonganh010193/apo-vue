import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/Home/HomeView.vue";
import CartView from "../views/Cart/CartView.vue";
import SigninView from "../container/singn/SigninView.vue";
import DetailView from "../views/DetailProduct/DetailProduct.vue";
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
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/perfume/ProductView.vue'),
    params: true
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => <SigninView />
  },
  {
    path: '/product-detail/:id',
    name: 'detail',
    component: () => <DetailView />,
    params: true
  },
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


