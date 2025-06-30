

import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';

import ProductView from '@/Products.vue'
import HomeView from '@/pages/Home.vue'
import SpinView from '@/Spin.vue'
import WalletView from '@/views/wallet.vue'
import WalletConnView from '@/components/WalletConnection.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: { requiresGuest: true }
  },
    { path: '/',
         name: 'HomeView',
          component: HomeView },
    { path: '/products', 
         name: 'ProductView',
        component: ProductView },
    { path: '/spin2win',
         name: 'SpinView',
          component: SpinView },
    { path: '/wallet',
          name: 'WalletView',
        component: WalletView },
    { path: '/walletConnect',
         name: 'WalletConnView',
          component: WalletConnView },
   

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
