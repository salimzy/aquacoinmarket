
import { defineStore } from 'pinia';

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    address: '',
    isConnected: false,
    walletInfo: null as any
  }),
  actions: {
    setWallet(info: any) {
      this.walletInfo = info;
      this.address = info?.account?.address || '';
      this.isConnected = true;
    },
    disconnect() {
      this.walletInfo = null;
      this.address = '';
      this.isConnected = false;
    }
  }
});

