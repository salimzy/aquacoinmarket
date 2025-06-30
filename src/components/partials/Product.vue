<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="imageSrc" alt="Product image">
    </div>
    <div class="product-info">
      <h3 class="product-title">{{ title }}</h3>
      <p class="product-description">{{ description }}</p>
      <div class="product-price">
        <span class="price">{{ price }}</span>
        <span class="aquacoin-price">
          <div class="aquacoin-icon">A</div>
          {{ aquacoinAmount }} AQCNX
        </span>
      </div>
      <button class="buy-button" @click="handleBuy">Buy with Aquacoins</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    imageSrc: {
      type: String,
      default: 'images/background.jpeg'
    },
    title: {
      type: String,
      default: 'Latest Smartphone'
    },
    description: {
      type: String,
      default: '5G-enabled smartphone with professional camera system and all-day battery.'
    },
    price: {
      type: String,
      default: '$899'
    },
    aquacoinAmount: {
      type: String,
      default: '135'
    }
  },
  methods: {
    handleBuy() {
      this.$emit('buy');
    }
  }
}
</script>