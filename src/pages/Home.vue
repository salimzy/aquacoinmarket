<script>
import Product from '../Products.vue';
// import Hero from './components/partials/Hero.vue'
import Faq from '@/components/Faqs.vue';

export default {
  components: {
    Faq,
    Product,
  }
};

</script>

<template>

    <!-- <template #hero>
<Hero></Hero>
    </template> -->
    <!--  -->
     <Product :limits="5"></Product>
        <section id="reviews" class="reviews-section">
            <div class="container">
                <h2 class="section-title">What Our Customers Say</h2>
                <div class="reviews-container">
                    <div class="review-card">
                        <p class="review-text">Paying with Aquacoins was incredibly smooth! The transaction was instant and I saved money on fees. This is definitely the future of online shopping.</p>
                        <div class="review-author">
                            <div class="author-avatar">S</div>
                            <div class="author-info">
                                <h4>Sarah Johnson</h4>
                                <div class="stars">★★★★★</div>
                            </div>
                        </div>
                    </div>

                    <div class="review-card">
                        <p class="review-text">I was skeptical about using cryptocurrency for shopping, but Aquacoins made it so easy. The checkout process was faster than traditional payment methods!</p>
                        <div class="review-author">
                            <div class="author-avatar">M</div>
                            <div class="author-info">
                                <h4>Michael Chen</h4>
                                <div class="stars">★★★★★</div>
                            </div>
                        </div>
                    </div>

                    <div class="review-card">
                        <p class="review-text">Great products and even better payment experience. The Aquacoin integration is seamless, and I love the eco-friendly aspect of the blockchain technology.</p>
                        <div class="review-author">
                            <div class="author-avatar">E</div>
                            <div class="author-info">
                                <h4>Emily Rodriguez</h4>
                                <div class="stars">★★★★★</div>
                            </div>
                        </div>
                    </div>

                    <div class="review-card">
                        <p class="review-text">As a tech enthusiast, I appreciate the innovation behind Aquacoins. The security features give me peace of mind when making large purchases online.</p>
                        <div class="review-author">
                            <div class="author-avatar">D</div>
                            <div class="author-info">
                                <h4>David Kim</h4>
                                <div class="stars">★★★★★</div>
                            </div>
                        </div>
                    </div>

                    <div class="review-card">
                        <p class="review-text">The rewards program with Aquacoins is amazing! I earn cashback on every purchase and the rates are better than my credit card. Highly recommended!</p>
                        <div class="review-author">
                            <div class="author-avatar">L</div>
                            <div class="author-info">
                                <h4>Lisa Thompson</h4>
                                <div class="stars">★★★★★</div>
                            </div>
                        </div>
                    </div>

                    <div class="review-card">
                        <p class="review-text">International shipping with Aquacoins saved me so much on currency conversion fees. The process was transparent and the delivery was lightning fast.</p>
                        <div class="review-author">
                            <div class="author-avatar">A</div>
                            <div class="author-info">
                                <h4>Alex Patel</h4>
                                <div class="stars">★★★★★</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" class="features-section">
            <div class="container">
                <h2 class="section-title">Why Choose Aquacoins?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon"  >
<svg fill="blue"  xmlns="http://www.w3.org/2000/svg"id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="30" height="30" style="color:#4f46e5;"><path d="M11.24,24a2.262,2.262,0,0,1-.948-.212,2.18,2.18,0,0,1-1.2-2.622L10.653,16H6.975A3,3,0,0,1,4.1,12.131l3.024-10A2.983,2.983,0,0,1,10,0h3.693a2.6,2.6,0,0,1,2.433,3.511L14.443,8H17a3,3,0,0,1,2.483,4.684l-6.4,10.3A2.2,2.2,0,0,1,11.24,24Z"/></svg>


</div>
                        <h3 class="feature-title">Lightning Fast</h3>
                        <p>Transactions complete in seconds, not minutes. Experience the speed of modern payments.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><svg fill="blue"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="30" height="30">
<g>
	<path d="M405.333,179.712v-30.379C405.333,66.859,338.475,0,256,0S106.667,66.859,106.667,149.333v30.379   c-38.826,16.945-63.944,55.259-64,97.621v128C42.737,464.214,90.452,511.93,149.333,512h213.333   c58.881-0.07,106.596-47.786,106.667-106.667v-128C469.278,234.971,444.159,196.657,405.333,179.712z M277.333,362.667   c0,11.782-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333V320c0-11.782,9.551-21.333,21.333-21.333   c11.782,0,21.333,9.551,21.333,21.333V362.667z M362.667,170.667H149.333v-21.333c0-58.91,47.756-106.667,106.667-106.667   s106.667,47.756,106.667,106.667V170.667z"/>
</g>
</svg>
 </div>
                        <h3 class="feature-title">Ultra Secure</h3>
                        <p>Military-grade encryption and blockchain technology ensure your payments are always protected.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><svg fill="blue"  xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="30" height="30"><path d="M13.053,5.079c.971-.909,2.344-2.36,2.894-3.744,.255-.641-.257-1.335-.947-1.335h-6c-.69,0-1.202,.693-.947,1.335,.55,1.384,1.923,2.835,2.894,3.744C5.569,5.878,1,12.618,1,18c0,3.309,2.691,6,6,6h10c3.309,0,6-2.691,6-6,0-5.382-4.569-12.122-9.947-12.921Zm-2.409,8.682l3.042,.507c1.341,.223,2.315,1.373,2.315,2.733,0,1.654-1.346,3-3,3v1c0,.552-.448,1-1,1s-1-.448-1-1v-1h-.268c-1.068,0-2.063-.574-2.598-1.499-.276-.478-.113-1.089,.365-1.366,.476-.277,1.089-.114,1.366,.365,.178,.308,.511,.5,.867,.5h2.268c.551,0,1-.449,1-1,0-.378-.271-.698-.644-.76l-3.042-.507c-1.341-.223-2.315-1.373-2.315-2.733,0-1.654,1.346-3,3-3v-1c0-.552,.448-1,1-1s1,.448,1,1v1h.268c1.067,0,2.063,.575,2.598,1.5,.276,.478,.113,1.089-.365,1.366-.477,.277-1.089,.114-1.366-.365-.179-.309-.511-.5-.867-.5h-2.268c-.551,0-1,.449-1,1,0,.378,.271,.698,.644,.76Z"/></svg>

</div>
                        <h3 class="feature-title">Low Fees</h3>
                        <p>Save money with minimal transaction fees compared to traditional payment methods.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon"><svg fill="blue" xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="30" height="30"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.5,20.975V19.69A4.19,4.19,0,0,0,8.31,15.5H8.3a3.143,3.143,0,0,1-2.223-.921L3.024,11.524A8.985,8.985,0,0,1,17.016,4.532a1.548,1.548,0,0,1-.913.3H14.669A1.555,1.555,0,0,0,13.114,6.39V7.432a1.555,1.555,0,0,1-1.555,1.555h0A1.555,1.555,0,0,0,10,10.542v1.042a1.555,1.555,0,0,0,1.555,1.555h4.156a1.555,1.555,0,0,1,1.555,1.555v1.52a1.555,1.555,0,0,0,.456,1.1l.833.833A8.964,8.964,0,0,1,12.5,20.975Z"/></svg>

</div>
                        <h3 class="feature-title">Global Reach</h3>
                        <p>Shop from anywhere in the world without worrying about currency conversion fees.</p>
                    </div>
                </div>
            </div>
        </section>

       <Faq/>


</template>