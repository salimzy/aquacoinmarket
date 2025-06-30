
<template>
  <div class="p-6">
    <WalletConnect />
    <div v-if="wallet.isConnected" class="mt-4">
      <p>Address: {{ wallet.address }}</p>
      <input v-model="recipient" placeholder="Recipient address" class="input" />
      <input v-model.number="amount" placeholder="Amount (TON)" type="number" class="input" />
      <!-- <button @click="send">Send TON</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import WalletConnect from '@/components/WalletConnect.vue';
import { ref } from 'vue';
// import { sendTon } from '@/composables/useTransaction';
import { useWalletStore } from '@/stores/wallet';

const wallet = useWalletStore();
const recipient = ref('');
const amount = ref(0);

// const send = async () => {
//   await sendTon(recipient.value, amount.value);
//   alert('Transaction sent');
// };
</script>