<!-- <script>
// import { productImage } from "/images/background.jpg";
import ProductView  from './components/partials/Product.vue'
 export default {
    components: {
      ProductView
    }
  };
</script>
<template>
     <section id="products" class="products-section" style="padding: 100px;">
            <div class="container">
                <h2 class="section-title">Featured Products</h2>
                <div class="products-grid">
                <ProductView @buy="handleBuyMethod"
  :imageSrc="'/path/to/image.jpg'"
  :title="'New Product'"
  :description="'Product description'"
  :price="'$999'"
  :aquacoinAmount="'200'"></ProductView>
                </div>
            </div>
        </section>

</template>

 -->
<template>
  <section id="products" class="products-section" style="padding: 40px;">
    <h2 class="section-title">Featured Products</h2>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading products...</p>
    </div>

    <!-- Error state -->
    <div v-if="error" class="error-message">
      <p>Error: {{ error }}</p>
      <button @click="fetchProducts" class="retry-button">Retry</button>
    </div>

    <!-- Content state -->
    <div v-if="!isLoading && !error" class="product-list">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :imageSrc="product.image"
        :title="product.title"
        :description="product.description"
        :price="product.price"
        :aquacoinAmount="product.aquacoinPrice"
        @buy="handleBuy"
      />
    </div>
  </section>
</template>

<script>
import ProductCard from './components/partials/Product.vue';
import { useRoute } from 'vue-router';
export default {
  name: 'ProductList',
  components: {
    ProductCard
  
  },
  data() {
    return {
      products: [], // This will store our products
      isLoading: false,
      error: null,
    
    }
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      // const route = useRoute();
      const limit = 8;
      
      try {
        // Using a sample API - you can replace with your actual API endpoint
        const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        // Transform the API data to match our ProductCard component's props
        this.products = data.map(product => ({
          id: product.id,
          image: product.image,
          title: product.title,
          description: product.description,
          price: `$${product.price}`,
          aquacoinPrice: Math.round(product.price * 0.15) // Example conversion to AQCNX
        }));
      } catch (err) {
        this.error = err.message;
        console.error('Error fetching products:', err);
      } finally {
        this.isLoading = false;
      }
    },
    handleBuy(productId) {
      console.log(`Buying product with ID: ${productId}`);

    }
  }
}
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #e74c3c;
  text-align: center;
  padding: 20px;
  background-color: #f8d7da;
  border-radius: 5px;
  margin: 20px 0;
}

.retry-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-button:hover {
  background-color: #c0392b;
}
</style>