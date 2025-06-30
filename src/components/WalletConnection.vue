
<template>
  <div style='padding:200px;'>
    <button class="custom-button" v-if="!isConnected" @click="connect">Connect Wallet</button>
    <div v-else>
      Connected: {{ address }}
      <button @click="disconnect">Disconnect</button>
    </div>
  </div>
  </template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'

// --- Constants ---
const TOKENS = { TON: 'TON', AQUA: 'AQUA' }

// --- Reactive State ---
const isConnected = ref(false)
const walletAddress = ref('')
const selectedWallet = ref('')
const showWalletModal = ref(false)
const showConfirmationModal = ref(false)
const activeTab = ref('send')
const isTransactionPending = ref(false)
const isSwapPending = ref(false)

const tonBalance = ref('0.000000')
const aquacoinBalance = ref('0.000000')
const tonPrice = ref(2.45)
const aquacoinPrice = ref(0.12)

const sendForm = reactive({
  token: TOKENS.TON,
  recipient: '',
  amount: '',
  message: ''
})

const swapForm = reactive({
  fromToken: TOKENS.TON,
  toToken: TOKENS.AQUA,
  fromAmount: '',
  toAmount: ''
})

const confirmationData = reactive({
  amount: '',
  token: '',
  recipient: '',
  gasFee: '',
  total: ''
})

const notification = reactive({
  show: false,
  type: 'info',
  message: ''
})

const supportedWallets = ref([
  { name: 'Tonkeeper', icon: 'fas fa-wallet', color: 'text-blue-600', description: 'Most popular TON wallet' },
  { name: 'Telegram Wallet', icon: 'fab fa-telegram', color: 'text-blue-500', description: 'Built into Telegram' },
  { name: 'OpenMask', icon: 'fas fa-mask', color: 'text-orange-600', description: 'Browser extension wallet' },
  { name: 'TON Space', icon: 'fas fa-rocket', color: 'text-purple-600', description: 'Official TON wallet' }
])

const transactionHistory = ref([])

// --- Computed Values ---
const totalPortfolioValue = computed(() => {
  const tonValue = parseFloat(tonBalance.value) * tonPrice.value
  const aquaValue = parseFloat(aquacoinBalance.value) * aquacoinPrice.value
  return tonValue + aquaValue
})

const estimatedGasFee = computed(() => 0.005)

const swapRate = computed(() => {
  if (swapForm.fromToken === TOKENS.TON && swapForm.toToken === TOKENS.AQUA) {
    return (tonPrice.value / aquacoinPrice.value).toFixed(6)
  } else if (swapForm.fromToken === TOKENS.AQUA && swapForm.toToken === TOKENS.TON) {
    return (aquacoinPrice.value / tonPrice.value).toFixed(6)
  }
  return '1.000000'
})

// --- Watchers ---
watch(() => swapForm.fromAmount, (newAmount) => {
  if (newAmount && !isNaN(parseFloat(newAmount))) {
    const rate = parseFloat(swapRate.value)
    swapForm.toAmount = (parseFloat(newAmount) * rate).toFixed(6)
  } else {
    swapForm.toAmount = ''
  }
})

// --- Methods ---
const showNotification = (type, message) => {
  notification.type = type
  notification.message = message
  notification.show = true
  setTimeout(() => {
    notification.show = false
  }, 4000)
}

const truncateAddress = (address) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-6)}`
}

const connectWallet = async (walletName) => {
  try {
    showWalletModal.value = false
    showNotification('info', `Connecting to ${walletName}...`)
    await new Promise(resolve => setTimeout(resolve, 2000))

    isConnected.value = true
    selectedWallet.value = walletName
    walletAddress.value = 'EQD' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    tonBalance.value = (Math.random() * 10 + 1).toFixed(6)
    aquacoinBalance.value = (Math.random() * 1000 + 100).toFixed(6)

    showNotification('success', `Connected to ${walletName} successfully!`)
    activeTab.value = 'send'
  } catch (error) {
    showNotification('error', `Failed to connect to ${walletName}`)
  }
}

const disconnect = () => {
  isConnected.value = false
  walletAddress.value = ''
  selectedWallet.value = ''
  tonBalance.value = '0.000000'
  aquacoinBalance.value = '0.000000'
  showNotification('info', 'Wallet disconnected')
}

const sendTransaction = () => {
  if (!sendForm.recipient || !sendForm.amount) {
    showNotification('error', 'Please fill in all required fields')
    return
  }

  if (isNaN(parseFloat(sendForm.amount))) {
    showNotification('error', 'Amount must be a valid number')
    return
  }

  isTransactionPending.value = true

  setTimeout(() => {
    isTransactionPending.value = false

    transactionHistory.value.unshift({
      hash: '0x' + Math.random().toString(16).substring(2, 10),
      type: 'send',
      amount: sendForm.amount,
      token: sendForm.token,
      recipient: sendForm.recipient,
      timestamp: 'just now',
      status: 'confirmed'
    })

    showNotification('success', 'Transaction sent successfully')

    // Reset form
    sendForm.recipient = ''
    sendForm.amount = ''
    sendForm.message = ''
  }, 3000)
}

onMounted(() => {
  // Example: Auto-fetch balances or saved wallet
})
</script>
