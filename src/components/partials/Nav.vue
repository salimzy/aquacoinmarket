<script>
// import myButton from './components/button.vue'
import { ref } from 'vue'
const open = ref(false)


</script>
<template>

<nav class="container" >
    <div style="display:flex; position:relative;"class="" >
                <div class="logo">
                    <div class="aquacoin-icon">A</div>
                    quaCoinX 
            
        </div>   
       
    </div>
    
    <div class="gap: 1rem;" style="display: flex;gap: 1rem;"  x-data="{open:false}">
          <ul  class="nav-links">
             
                    <li  class="p"><RouterLink to="/products">Products</RouterLink></li>
                    <li class="p"><a href="#reviews">Reviews</a></li>
                    <li class="p"><a href="#features">Features</a></li>
                    <li class="p"><a href="#contact">Contact</a></li>
                    <li  class="p"><RouterLink to="/spin2win">win an iphone</RouterLink></li>
                    <!-- <li  class="p"><RouterLink to="/wallet">wallet</RouterLink></li> -->
                    <!-- <li  class="p"><RouterLink to="/gas"> Gas</RouterLink></li> -->
                    <!-- <li  class="p"><RouterLink to="/walletConnect"> connect</RouterLink></li> -->
                    <li class="p"><router-link to="/signup">Sign up</router-link></li>
                    <li class="p"><router-link to="/login">Login</router-link></li>
                </ul>
           <div style="display: flex; justify-content: flex-end;gap: 1rem;">
                    
                

                 <button  type="button" class="custom-button">connect wallet</button>
                    <button  type="button" class="harmbuger"  @click="open =!open" style="overlay: none;border: none;">
                        <svg style="height:40px;font-weight:20px;" color="" class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button> 
                    </div>
                    
              <ul   transition class="nav-li mobile" x-show="open" @@click.outside="open=false">
                    <li  class="p"><RouterLink to="/products">Products</RouterLink></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#features">Features</a></li>
                     <li><a href="#contact">Contact</a></li>
                     <li><RouterLink to="/spin2win">win an iphone</RouterLink></li>
                     <!-- <li><RouterLink to="/gas">Gas</RouterLink></li> -->
                     <!-- <li><RouterLink to="/wallet">wallet</RouterLink></li> -->
                  <!-- <li  class="p"><RouterLink to="/walletconnection"> connect</RouterLink></li> -->
                      <li><router-link to="/signup">Sign up</router-link></li>
                    <li><router-link to="/login">Login</router-link></li>
                </ul> 
       
                </div>
                
                 
            </nav>
</template>