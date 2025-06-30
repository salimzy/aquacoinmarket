<style scoped>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .card-hover {
            transition: all 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .wallet-button {
            transition: all 0.2s ease;
        }
        .wallet-button:hover {
            transform: scale(1.02);
        }
        .pulse-animation {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        .loading-spinner {
            border: 2px solid #f3f3f3;
            border-top: 2px solid #3498db;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>

    <template>
            <div id="app">
        <!-- Navigation -->
        <!-- <nav class="gradient-bg shadow-lg">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <i class="fas fa-water text-white text-2xl mr-3"></i>
                        <span class="text-white text-xl font-bold">Aquacoinx</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button v-if="!isConnected" @click="showWalletModal = true" 
                                class="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                            <i class="fas fa-wallet mr-2"></i>Connect Wallet
                        </button>
                        <div v-else class="flex items-center space-x-3">
                            <div class="text-white text-sm">
                                <div class="font-medium">{{ truncateAddress(walletAddress) }}</div>
                                <div class="text-purple-200">{{ selectedWallet }}</div>
                            </div>
                            <button @click="disconnect" 
                                    class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition">
                                <i class="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav> -->

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Hero Section -->
            <div v-if="!isConnected" class="text-center py-16">
                <h1 class="text-5xl font-bold text-gray-900 mb-6">
                    Welcome to <span class="text-purple-600">Aquacoinx</span>
                </h1>
                <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    The next-generation DeFi platform built on TON blockchain. 
                    Swap, stake, and manage your Aquacoin tokens with ease.
                </p>
                <button @click="showWalletModal = true" 
                        class="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-purple-700 transition transform hover:scale-105">
                    <i class="fas fa-rocket mr-2"></i>Get Started
                </button>
            </div>

            <!-- Dashboard -->
            <div v-else>
                <!-- Balance Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white p-6 rounded-xl shadow-lg card-hover">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-800">TON Balance</h3>
                            <i class="fas fa-coins text-blue-500 text-xl"></i>
                        </div>
                        <div class="text-3xl font-bold text-gray-900">{{ tonBalance }}</div>
                        <div class="text-sm text-gray-500 mt-2">≈ ${{ (parseFloat(tonBalance) * tonPrice).toFixed(2) }}</div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-xl shadow-lg card-hover">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-800">Aquacoin Balance</h3>
                            <i class="fas fa-water text-purple-500 text-xl"></i>
                        </div>
                        <div class="text-3xl font-bold text-gray-900">{{ aquacoinBalance }}</div>
                        <div class="text-sm text-gray-500 mt-2">≈ ${{ (parseFloat(aquacoinBalance) * aquacoinPrice).toFixed(2) }}</div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-xl shadow-lg card-hover">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-800">Total Portfolio</h3>
                            <i class="fas fa-chart-line text-green-500 text-xl"></i>
                        </div>
                        <div class="text-3xl font-bold text-gray-900">${{ totalPortfolioValue.toFixed(2) }}</div>
                        <div class="text-sm text-green-500 mt-2">+2.4% (24h)</div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <button @click="activeTab = 'send'" 
                            :class="['p-4 rounded-xl font-medium transition', activeTab === 'send' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50']">
                        <i class="fas fa-paper-plane mb-2 block text-xl"></i>Send
                    </button>
                    <button @click="activeTab = 'receive'" 
                            :class="['p-4 rounded-xl font-medium transition', activeTab === 'receive' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50']">
                        <i class="fas fa-qrcode mb-2 block text-xl"></i>Receive
                    </button>
                    <button @click="activeTab = 'swap'" 
                            :class="['p-4 rounded-xl font-medium transition', activeTab === 'swap' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50']">
                        <i class="fas fa-exchange-alt mb-2 block text-xl"></i>Swap
                    </button>
                    <button @click="activeTab = 'history'" 
                            :class="['p-4 rounded-xl font-medium transition', activeTab === 'history' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50']">
                        <i class="fas fa-history mb-2 block text-xl"></i>History
                    </button>
                </div>

                <!-- Tab Content -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <!-- Send Tab -->
                    <div v-if="activeTab === 'send'">
                        <h3 class="text-xl font-semibold mb-6">Send Tokens</h3>
                        <form @submit.prevent="sendTransaction">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Token</label>
                                    <select v-model="sendForm.token" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                        <option value="TON">TON</option>
                                        <option value="AQUA">Aquacoin</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
                                    <input v-model="sendForm.recipient" type="text" placeholder="EQD..." 
                                           class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                                    <input v-model="sendForm.amount" type="number" step="0.000001" placeholder="0.0" 
                                           class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                                    <input v-model="sendForm.message" type="text" placeholder="Enter message..." 
                                           class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                </div>
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm text-gray-600">Estimated Gas Fee:</span>
                                        <span class="font-medium">{{ estimatedGasFee }} TON</span>
                                    </div>
                                </div>
                                <button type="submit" :disabled="isTransactionPending" 
                                        class="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span v-if="isTransactionPending" class="flex items-center justify-center">
                                        <div class="loading-spinner mr-2"></div>
                                        Sending...
                                    </span>
                                    <span v-else>Send Transaction</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Receive Tab -->
                    <div v-if="activeTab === 'receive'">
                        <h3 class="text-xl font-semibold mb-6">Receive Tokens</h3>
                        <div class="text-center">
                            <div class="bg-gray-100 p-8 rounded-lg inline-block mb-4">
                                <div class="w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-qrcode text-6xl text-gray-400"></i>
                                </div>
                            </div>
                            <p class="text-lg font-medium mb-2">Your Wallet Address</p>
                            <div class="bg-gray-100 p-3 rounded-lg mb-4">
                                <code class="text-sm break-all">{{ walletAddress }}</code>
                            </div>
                            <button @click="copyAddress" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                                <i class="fas fa-copy mr-2"></i>Copy Address
                            </button>
                        </div>
                    </div>

                    <!-- Swap Tab -->
                    <div v-if="activeTab === 'swap'">
                        <h3 class="text-xl font-semibold mb-6">Swap Tokens</h3>
                        <form @submit.prevent="performSwap">
                            <div class="space-y-4">
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">From</label>
                                    <div class="flex space-x-2">
                                        <select v-model="swapForm.fromToken" class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                            <option value="TON">TON</option>
                                            <option value="AQUA">Aquacoin</option>
                                        </select>
                                        <input v-model="swapForm.fromAmount" type="number" step="0.000001" placeholder="0.0" 
                                               class="flex-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                    </div>
                                </div>
                                
                                <div class="text-center">
                                    <button type="button" @click="swapTokens" class="bg-purple-100 text-purple-600 p-2 rounded-full hover:bg-purple-200 transition">
                                        <i class="fas fa-exchange-alt"></i>
                                    </button>
                                </div>
                                
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">To</label>
                                    <div class="flex space-x-2">
                                        <select v-model="swapForm.toToken" class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                            <option value="TON">TON</option>
                                            <option value="AQUA">Aquacoin</option>
                                        </select>
                                        <input v-model="swapForm.toAmount" type="number" step="0.000001" placeholder="0.0" readonly
                                               class="flex-2 p-3 border border-gray-300 rounded-lg bg-gray-100">
                                    </div>
                                </div>
                                
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <div class="flex justify-between text-sm">
                                        <span>Exchange Rate:</span>
                                        <span>1 {{ swapForm.fromToken }} = {{ swapRate }} {{ swapForm.toToken }}</span>
                                    </div>
                                    <div class="flex justify-between text-sm mt-1">
                                        <span>Slippage Tolerance:</span>
                                        <span>0.5%</span>
                                    </div>
                                </div>
                                
                                <button type="submit" :disabled="isSwapPending" 
                                        class="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50">
                                    <span v-if="isSwapPending" class="flex items-center justify-center">
                                        <div class="loading-spinner mr-2"></div>
                                        Swapping...
                                    </span>
                                    <span v-else>Swap Tokens</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- History Tab -->
                    <div v-if="activeTab === 'history'">
                        <h3 class="text-xl font-semibold mb-6">Transaction History</h3>
                        <div class="space-y-3">
                            <div v-for="tx in transactionHistory" :key="tx.hash" 
                                 class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                                <div class="flex items-center space-x-3">
                                    <div :class="['w-10 h-10 rounded-full flex items-center justify-center', 
                                                 tx.type === 'send' ? 'bg-red-100 text-red-600' : 
                                                 tx.type === 'receive' ? 'bg-green-100 text-green-600' : 
                                                 'bg-blue-100 text-blue-600']">
                                        <i :class="['fas', 
                                                   tx.type === 'send' ? 'fa-arrow-up' : 
                                                   tx.type === 'receive' ? 'fa-arrow-down' : 
                                                   'fa-exchange-alt']"></i>
                                    </div>
                                    <div>
                                        <div class="font-medium">{{ tx.type === 'send' ? 'Sent' : tx.type === 'receive' ? 'Received' : 'Swapped' }}</div>
                                        <div class="text-sm text-gray-500">{{ tx.timestamp }}</div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="font-medium">{{ tx.amount }} {{ tx.token }}</div>
                                    <div :class="['text-sm', tx.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600']">
                                        {{ tx.status }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Wallet Connection Modal -->
        <div v-if="showWalletModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-semibold">Connect Wallet</h3>
                    <button @click="showWalletModal = false" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div class="space-y-3">
                    <button v-for="wallet in supportedWallets" :key="wallet.name"
                            @click="connectWallet(wallet.name)" 
                            class="wallet-button w-full flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition">
                        <i :class="wallet.icon + ' text-2xl mr-4 ' + wallet.color"></i>
                        <div class="text-left">
                            <div class="font-medium">{{ wallet.name }}</div>
                            <div class="text-sm text-gray-500">{{ wallet.description }}</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <!-- Confirmation Modal -->
        <div v-if="showConfirmationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                <div class="text-center">
                    <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                    <h3 class="text-xl font-semibold mb-4">Confirm Transaction</h3>
                    <div class="space-y-2 text-left bg-gray-50 p-4 rounded-lg mb-6">
                        <div class="flex justify-between">
                            <span>Amount:</span>
                            <span class="font-medium">{{ confirmationData.amount }} {{ confirmationData.token }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>To:</span>
                            <span class="font-medium">{{ truncateAddress(confirmationData.recipient) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Gas Fee:</span>
                            <span class="font-medium">{{ confirmationData.gasFee }} TON</span>
                        </div>
                        <div class="border-t pt-2 flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>{{ confirmationData.total }} TON</span>
                        </div>
                    </div>
                    <div class="flex space-x-3">
                        <button @click="showConfirmationModal = false" 
                                class="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition">
                            Cancel
                        </button>
                        <button @click="confirmTransaction" 
                                class="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Notification Toast -->
        <div v-if="notification.show" :class="['fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 z-50',
                                              notification.type === 'success' ? 'bg-green-500 text-white' : 
                                              notification.type === 'error' ? 'bg-red-500 text-white' : 
                                              'bg-blue-500 text-white']">
            <div class="flex items-center">
                <i :class="['fas mr-2', 
                           notification.type === 'success' ? 'fa-check-circle' : 
                           notification.type === 'error' ? 'fa-exclamation-circle' : 
                           'fa-info-circle']"></i>
                {{ notification.message }}
            </div>
        </div>
    </div>
    </template>

    <script setup>
   const { ref, reactive, computed, onMounted, watch } = Vue;
  
                // State management
                const isConnected = ref(false);
                const walletAddress = ref('');
                const selectedWallet = ref('');
                const showWalletModal = ref(false);
                const showConfirmationModal = ref(false);
                const activeTab = ref('send');
                const isTransactionPending = ref(false);
                const isSwapPending = ref(false);

                // Balances
                const tonBalance = ref('0.000000');
                const aquacoinBalance = ref('0.000000');
                const tonPrice = ref(2.45);
                const aquacoinPrice = ref(0.12);

                // Forms
                const sendForm = reactive({
                    token: 'TON',
                    recipient: '',
                    amount: '',
                    message: ''
                });

                const swapForm = reactive({
                    fromToken: 'TON',
                    toToken: 'AQUA',
                    fromAmount: '',
                    toAmount: ''
                });

                const confirmationData = reactive({
                    amount: '',
                    token: '',
                    recipient: '',
                    gasFee: '',
                    total: ''
                });

                // Notification system
                const notification = reactive({
                    show: false,
                    type: 'info',
                    message: ''
                });

                // Supported wallets
                const supportedWallets = ref([
                    {
                        name: 'Tonkeeper',
                        icon: 'fas fa-wallet',
                        color: 'text-blue-600',
                        description: 'Most popular TON wallet'
                    },
                    {
                        name: 'Telegram Wallet',
                        icon: 'fab fa-telegram',
                        color: 'text-blue-500',
                        description: 'Built into Telegram'
                    },
                    {
                        name: 'OpenMask',
                        icon: 'fas fa-mask',
                        color: 'text-orange-600',
                        description: 'Browser extension wallet'
                    },
                    {
                        name: 'TON Space',
                        icon: 'fas fa-rocket',
                        color: 'text-purple-600',
                        description: 'Official TON wallet'
                    }
                ]);

                // Transaction history
                const transactionHistory = ref([
                    {
                        hash: '0x123...abc',
                        type: 'send',
                        amount: '1.500000',
                        token: 'TON',
                        timestamp: '2 hours ago',
                        status: 'confirmed'
                    },
                    {
                        hash: '0x456...def',
                        type: 'receive',
                        amount: '250.000000',
                        token: 'AQUA',
                        timestamp: '1 day ago',
                        status: 'confirmed'
                    },
                    {
                        hash: '0x789...ghi',
                        type: 'swap',
                        amount: '5.000000',
                        token: 'TON → AQUA',
                        timestamp: '3 days ago',
                        status: 'confirmed'
                    }
                ]);

                // Computed properties
                const totalPortfolioValue = computed(() => {
                    const tonValue = parseFloat(tonBalance.value) * tonPrice.value;
                    const aquaValue = parseFloat(aquacoinBalance.value) * aquacoinPrice.value;
                    return tonValue + aquaValue;
                });

                const estimatedGasFee = computed(() => {
                    return '0.005000';
                });

                const swapRate = computed(() => {
                    if (swapForm.fromToken === 'TON' && swapForm.toToken === 'AQUA') {
                        return (tonPrice.value / aquacoinPrice.value).toFixed(6);
                    } else if (swapForm.fromToken === 'AQUA' && swapForm.toToken === 'TON') {
                        return (aquacoinPrice.value / tonPrice.value).toFixed(6);
                    }
                    return '1.000000';
                });

                // Watch for swap amount changes
                watch(() => swapForm.fromAmount, (newAmount) => {
                    if (newAmount && !isNaN(parseFloat(newAmount))) {
                        const rate = parseFloat(swapRate.value);
                        swapForm.toAmount = (parseFloat(newAmount) * rate).toFixed(6);
                    } else {
                        swapForm.toAmount = '';
                    }
                });

                // Methods
                const showNotification = (type, message) => {
                    notification.type = type;
                    notification.message = message;
                    notification.show = true;
                    setTimeout(() => {
                        notification.show = false;
                    }, 4000);
                };

                const truncateAddress = (address) => {
                    if (!address) return '';
                    return `${address.slice(0, 6)}...${address.slice(-6)}`;
                };

                const connectWallet = async (walletName) => {
                    try {
                        showWalletModal.value = false;
                        showNotification('info', `Connecting to ${walletName}...`);
                        
                        // Simulate wallet connection
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        
                        // Mock wallet connection
                        isConnected.value = true;
                        selectedWallet.value = walletName;
                        walletAddress.value = 'EQD' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        
                        // Load mock balances
                        tonBalance.value = (Math.random() * 10 + 1).toFixed(6);
                        aquacoinBalance.value = (Math.random() * 1000 + 100).toFixed(6);
                        
                        showNotification('success', `Connected to ${walletName} successfully!`);
                        activeTab.value = 'send';
                    } catch (error) {
                        showNotification('error', `Failed to connect to ${walletName}`);
                    }
                };

                const disconnect = () => {
                    isConnected.value = false;
                    walletAddress.value = '';
                    selectedWallet.value = '';
                    tonBalance.value = '0.000000';
                    aquacoinBalance.value = '0.000000';
                    showNotification('info', 'Wallet disconnected');
                };

                const sendTransaction = () => {
                    if (!sendForm.recipient || !sendForm.amount) {
                        showNotification('error', 'Please fill in all required fields');
                        return;
                    }
                }
           
      
            </script>