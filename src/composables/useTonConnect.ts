// src/composables/useTonConnect.ts
import { TonConnect } from '@tonconnect/sdk';
import { ref, computed } from 'vue';

const connector = new TonConnect();
const wallet = ref(connector.wallet);
const connected = ref(connector.connected);

// Keep it reactive on change
connector.onStatusChange((walletInfo) => {
  wallet.value = walletInfo;
  connected.value = !!walletInfo;
});

export function useTonConnect() {
  const connectWallet = async () => {
    await connector.getWallets();
    wallet.value = connector.wallet;
    connected.value = connector.connected;
  };

  const disconnectWallet = () => {
    connector.disconnect();
    wallet.value = null;
    connected.value = false;
  };

  const getWalletInfo = computed(() => wallet.value);
  const isConnected = computed(() => connected.value);

  return {
    connector,
    connectWallet,
    disconnectWallet,
    getWalletInfo,
    isConnected,
  };
}
