
<template>
  <div style='padding:200px;'>
    <button v-if="!isConnected" @click="connect">Connect Wallet</button>
    <div v-else>
      Connected: {{ address }}
      <button @click="disconnect">Disconnect</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTonConnect } from '@/composables/useTonConnect';
import { useWalletStore } from '@/stores/wallet';

const { connectWallet, disconnectWallet, getWalletInfo, isConnected } = useTonConnect();
const walletStore = useWalletStore();

const address = ref('');

onMounted(() => {
  if (isConnected()) {
    const info = getWalletInfo();
    address.value = info.account.address;
    walletStore.setWallet(info);
  }
});

const connect = async () => {
  await connectWallet();
  const info = getWalletInfo();
  walletStore.setWallet(info);
  address.value = info.account.address;
};

const disconnect = () => {
  disconnectWallet();
  walletStore.disconnect();
};
</script>
