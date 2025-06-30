<template>

    <section class="faqhead">
<h2 style="display:flex; justify-content:center;padding:20px; font-size: 30px;">Faqs</h2>
  
    <div 
      v-for="(faq, index) in faqs" 
      :key="index" 
      class="faq-item"
      @click="toggle(index)"
    >
      <div class="faq-question">
        <span class="faq-container">{{ faq.question }}</span>
        <span class="">{{ faq.open ? '-' : '+' }}</span>
      </div>
      <div class="faq-answer faq-container" v-show="faq.open" transition>
        <p>{{ faq.answer }}</p>
      </div>
    </div>
  
    </section>
</template>


<script>
export default {
  name: 'FaqAccordion',
  data() {
    return {
      faqs: [
        { question: "What payment methods are accepted on AquaMarket?", answer: "Aquamarket accepts a variety of payment options, including major cryptocurrency such as Bitcoin, Ethereum, and stable coins.", open: false },
        { question: "How do I use the virtual top-up (VTU) services?", answer: "Aquamarket accepts a variety of payment options, including major cryptocurrency such as Bitcoin, Ethereum, and stable coins.", open: false },
        { question: "What is the return and refund policy?", answer: "Aquamarket accepts a variety of payment options, including major cryptocurrency such as Bitcoin, Ethereum, and stable coins.", open: false },
        { question: "Is my personal and payment information secure?", answer: "Technically yes, but it's best to stick to one for consistency.", open: false },
        { question: "Can I track my orders and top-up transactions?", answer: "Aquamarket accepts a variety of payment options, including major cryptocurrencies such as Bitcoin, Ethereum, and stablecoins.", open: false },
        { question: "How do I connect my crypto wallet to Aquamarket?", answer: "Technically yes, but it's best to stick to one for consistency.", open: false }
      ]
    };
  },
  methods: {
    toggle(index) {
      this.faqs[index].open = !this.faqs[index].open;
    }
  }
};
</script>


<style>


.faqhead {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: transform 0.3s;
}

.faqhead:hover {
    transform: translateY(-5px);
}

</style>