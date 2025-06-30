 <script setup>
import Nav from './components/partials/Nav.vue'
import Footer from './components/partials/Footer.vue'
 import Hero from './components/partials/Hero.vue'


import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const auth = useAuthStore();

onMounted(() => {
  // Initialize axios headers if token exists
  if (auth.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
  }
});
</script>

<template>


     <header>
<div v-if="$route.path !=='/login' && $route.path !=='/signup'">
       <Nav></Nav>
      </div>
    </header>
<div v-if="$route.path ==='/'"> 

  
  <Hero/>
</div>

    <main :class="$route.path ==='/' && $route.path !=='/login'?'':'class'" >
     
    
      
      <RouterView />
    </main>
    <div v-if="$route.path !=='/login' && $route.path !=='/signup'">

      <Footer></Footer>
    </div>
  </template>
<style>
.class{
  padding-top: 100px;
}
</style> 

