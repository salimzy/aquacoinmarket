import { createMemoryHistory, createRouter } from 'vue-router'
import ProductView from '../Products.vue'
import HomeView from '../pages/Home.vue'
import SpinView from '../Spin.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/products', component: ProductView },
  { path: '/spin2win', component: SpinView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
