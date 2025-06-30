<!-- <style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: linear-gradient(135deg, #667eea 0%, #2076f7 100%);
        font-family: 'Arial', sans-serif;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
    }

    .spin-container {
        text-align: center;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(10px);
        max-width: 500px;
        width: 90%;
    }

    .title {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 10px;
        background: linear-gradient(45deg, #2076f7, #221eeb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .subtitle {
        color: #666;
        margin-bottom: 30px;
        font-size: 1.1rem;
    }

    .wheel-container {
        position: relative;
        width: 300px;
        height: 300px;
        margin: 0 auto 30px;
    }

    .wheel {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        border: 8px solid #fff;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transition: transform 4s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .segment {
        position: fixed;
        width: 50%;
        height: 50%;
        transform-origin: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        color: white;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        text-align: center;
        padding: 20px 10px;
    }

    .segment:nth-child(1) { transform: rotate(0deg); }
    .segment:nth-child(2) { transform: rotate(45deg); }
    .segment:nth-child(3) { transform: rotate(90deg); }
    .segment:nth-child(4) { transform: rotate(135deg); }
    .segment:nth-child(5) { transform: rotate(180deg); }
    .segment:nth-child(6) { transform: rotate(225deg); }
    .segment:nth-child(7) { transform: rotate(270deg); }
    .segment:nth-child(8) { transform: rotate(315deg); }

    .pointer {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 30px solid #2076f7;
        z-index: 10;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }

    .spin-button {
        background: linear-gradient(45deg, #2076f7, #221eeb);
        color: white;
        border: none;
        padding: 15px 40px;
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    .spin-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
    }

    .spin-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    .result-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .result-modal.show {
        opacity: 1;
        visibility: visible;
    }

    .result-content {
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }

    .result-modal.show .result-content {
        transform: scale(1);
    }

    .result-icon {
        font-size: 4rem;
        margin-bottom: 20px;
    }

    .result-title {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 15px;
        color: #333;
    }

    .result-description {
        color: #666;
        margin-bottom: 25px;
        line-height: 1.5;
    }

    .voucher-code {
        background: #f8f9fa;
        border: 2px dashed #dee2e6;
        padding: 15px;
        border-radius: 10px;
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        font-weight: bold;
        color: #495057;
        margin: 20px 0;
    }

    .close-button {
        background: #6c757d;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.3s ease;
    }

    .close-button:hover {
        background: #5a6268;
    }

    .prize-display {
        margin-top: 20px;
        font-size: 1.1rem;
        color: #666;
    }

    @keyframes celebrate {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .celebrating {
        animation: celebrate 0.6s ease-in-out;
    }
</style>

<template>


    
        <div class="spin-container" >
            <h1 class="title">🎉 Spin to Win!</h1>
            <p class="subtitle">Try your luck and win amazing prizes!</p>
            
            <div class="wheel-container">
                <div class="pointer"></div>
                <div class="wheel"  >
                    <div class="segment" v-for="(prize, index) in prizes" :key="index">
                        <div>{{ prize.display }}</div>
                        <div v-if="prize.icon" class="">
                          <img :src="prize.icon" alt="">

                        </div>
                    </div>
                </div>
            </div>

            <button 
                class="spin-button" 
                @click="spin" 
                :disabled="isSpinning"
                :class="{ celebrating: isSpinning }"
            >
                {{ isSpinning ? 'Spinning...' : 'SPIN NOW!' }}
            </button>

            <div class="prize-display" v-if="lastWinnerPrize">
                Last winner: <strong>{{ lastWinnerPrize }}</strong>
            </div>
        </div>

        <!-- Result Modal -->
        <!-- <div class="result-modal" :class="{ show: showResult }" @click="closeModal">
            <div class="result-content" @click.stop>
                <div class="result-icon">{{ currentPrize.icon }}</div>
                <h2 class="result-title">{{ currentPrize.title }}</h2>
                <p class="result-description">{{ currentPrize.description }}</p>
                
                <div v-if="currentPrize.isVoucher" class="voucher-code">
                    Voucher Code: {{ voucherCode }}
                </div>
                
                <button class="close-button" @click="closeModal">Claim Prize</button>
            </div>
        </div>
    
</template> -->
<!-- <script>
    export default {
        data() {
            return {
                rotation: 0,
                isSpinning: false,
                showResult: false,
                currentPrize: {},
                lastWinnerPrize: '',
                voucherCode: '',
                prizes: [
                    {
                        display: 'iPhone 16',
                        title: 'iPhone 16 Voucher!',
                        description: 'Congratulations! Use this voucher to get an iPhone 16 from our store.',
                        icon: '📱',
                        isVoucher: true,
                        value: 'iPhone 16'
                    },
                    {
                        display: '10 AQC ',
                        title: '10 Aquacoin !',
                        description: 'You won 10AQC! This will be credited to your account.',
                        icon: '💵',
                        isVoucher: false,
                        value: '10 AQC'
                    },
                    {
                        display: '20 AQC',
                        title: '20AQC  Prize!',
                        description: 'Amazing! You won 20AQC! This will be credited to your account.',
                        icon: '💰',
                        isVoucher: false,
                        value: '20AQC'
                    },
                    {
                        display: '50 AQC',
                        title: '50 AQC Cash Prize!',
                        description: 'Nice! You won $1! This will be credited to your account.',
                        icon: '💳',
                        isVoucher: false,
                        value: '50 AQC'
                    },
                    {
                        display: '1000 AQC',
                        title: '1000 AQC Cash Prize!',
                        description: 'Great! You won 1000 AQC! This will be credited to your account.',
                        icon: '🪙',
                        isVoucher: false,
                        value: '1000AQC'
                    },
                    {
                        display: '0.2 Ton',
                        title: '0.2 Ton Cash Prize!',
                        description: 'Great! You won 0.2Ton! This will be credited to your account.',
                        icon: '🪙',
                        isVoucher: false,
                        value: '0.2Ton'
                    },
                    {
                        display: '0.3 Ton',
                        title: '0.3 Ton Cash Prize!',
                        description: 'Great! You won 0.3 Ton! This will be credited to your account.',
                        icon: '🪙',
                        isVoucher: false,
                        value: '0.3Ton'
                    },
                    {
                        display: '1 Ton',
                        title: '1 Ton Cash Prize!',
                        description: 'Great! You won 1 Ton! This will be credited to your account.',
                        icon: '🪙',
                        isVoucher: false,
                        value: '1Ton'
                    },
                ]
            }
        },
        methods: {
            spin() {
                if (this.isSpinning) return;
                
                this.isSpinning = true;
                
                // Generate random rotation (multiple full spins + final position)
                const minSpins = 5;
                const maxSpins = 8;
                const spins = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;
                
                // Each segment is 45 degrees (360/8)
                const segmentAngle = 45;
                const randomSegment = Math.floor(Math.random() * this.prizes.length);
                const finalAngle = randomSegment * segmentAngle + (Math.random() * segmentAngle);
                
                // Calculate total rotation
                this.rotation += (spins * 360) + finalAngle;
                
                // Show result after spin animation
                setTimeout(() => {
                    this.showWinResult(randomSegment);
                    this.isSpinning = false;
                }, 4000);
            },
            
            showWinResult(prizeIndex) {
                this.currentPrize = this.prizes[prizeIndex];
                this.lastWinnerPrize = this.currentPrize.value;
                
                // Generate voucher code if it's the iPhone 16
                if (this.currentPrize.isVoucher) {
                    this.voucherCode = this.generateVoucherCode();
                }
                
                this.showResult = true;
            },
            
            generateVoucherCode() {
                const prefix = 'IPHONE16-';
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                let code = '';
                for (let i = 0; i < 8; i++) {
                    code += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return prefix + code;
            },
            
            closeModal() {
                this.showResult = false;
                // Save voucher to localStorage for e-commerce use
                if (this.currentPrize.isVoucher && this.voucherCode) {
                    const vouchers = JSON.parse(localStorage.getItem('userVouchers') || '[]');
                    vouchers.push({
                        code: this.voucherCode,
                        prize: this.currentPrize.value,
                        dateWon: new Date().toISOString(),
                        used: false
                    });
                    localStorage.setItem('userVouchers', JSON.stringify(vouchers));
                    console.log('Voucher saved for e-commerce use:', this.voucherCode);
                }
            }
        }
    };
</script> --> 


<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

type RewardSegment = {
  value: number
  currency: string
  type: string
  angle: number
  startAngle: number
  endAngle: number
}

const spinsLeft = ref(3)
const isSpinning = ref(false)
const currentRotation = ref(0)

const totalRewards = reactive({
  AQCNX: 0,
  TON: 0,
  vouchers: 0
})

const segments: RewardSegment[] = [
  { value: 20, currency: "AQCNX", type: "Common", angle: 60, startAngle: 330, endAngle: 30 },
  { value: 0.5, currency: "TON", type: "Rare", angle: 120, startAngle: 30, endAngle: 90 },
  { value: 100, currency: "$", type: "Voucher", angle: 180, startAngle: 90, endAngle: 150 },
  { value: 30, currency: "AQCNX", type: "Common", angle: 240, startAngle: 150, endAngle: 210 },
  { value: 50, currency: "AQCNX", type: "Uncommon", angle: 300, startAngle: 210, endAngle: 270 },
  { value: 0.3, currency: "TON", type: "Epic", angle: 360, startAngle: 270, endAngle: 330 }
]

const rewardsHistory = ref<RewardSegment[]>([])

const selectedSegment = ref<RewardSegment | null>(null)
const wheelRef = ref<HTMLElement | null>(null)
const prizeVisible = ref(false)

function spin() {
  if (spinsLeft.value <= 0 || isSpinning.value) {
    console.log('Cannot spin')
    return
  }

  isSpinning.value = true
  spinsLeft.value--

  const segment = segments[Math.floor(Math.random() * segments.length)]
  selectedSegment.value = segment
  spinWheel(segment)
}

function spinWheel(segment: RewardSegment) {
  const minSpins = 20
  const maxSpins = 50
  const spins = minSpins + Math.random() * (maxSpins - minSpins)
  const totalRotation = spins * 360
  const finalRotation = currentRotation.value + totalRotation + (360 - segment.angle)

  if (wheelRef.value) {
    wheelRef.value.style.transition = 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)'
    wheelRef.value.style.transform = `rotate(${finalRotation}deg)`
  }

  currentRotation.value = finalRotation % 360

  setTimeout(() => {
    endSpin(segment)
  }, 4000)
}

function endSpin(segment: RewardSegment) {
  isSpinning.value = false

  if (segment.currency === 'AQCNX') totalRewards.AQCNX += segment.value
  else if (segment.currency === 'TON') totalRewards.TON += segment.value
  else if (segment.currency === '$') totalRewards.vouchers += segment.value

  rewardsHistory.value.unshift(segment)
  if (rewardsHistory.value.length > 10) rewardsHistory.value.pop()

  prizeVisible.value = true
  setTimeout(() => {
    prizeVisible.value = false
  }, 4000)
}

function buySpins(amount: number) {
  spinsLeft.value += amount
  prizeVisible.value = true
  selectedSegment.value = {
    value: amount,
    currency: 'SPINS',
    type: 'Purchase Complete',
    angle: 0,
    startAngle: 0,
    endAngle: 0
  }
  setTimeout(() => {
    prizeVisible.value = false
  }, 2000)
}
</script>

<template>
  <div class="game-container">
    <div class="wheel-wrapper">
      <div ref="wheelRef" id="wheel" class="wheel"></div>
      <button id="spinButton" @click="spin" :disabled="spinsLeft <= 0 || isSpinning">
        <span v-if="spinsLeft <= 0">No Spins Left</span>
        <span v-else-if="isSpinning">SPINNING...</span>
        <span v-else>SPIN NOW</span>
      </button>
    </div>

    <div class="status mt-4">
      <p>Spins Left: {{ spinsLeft }}</p>
      <p>AQCNX: {{ totalRewards.AQCNX }}</p>
      <p>TON: {{ totalRewards.TON }}</p>
      <p>Vouchers: {{ totalRewards.vouchers }}</p>
    </div>

    <div id="prizeDisplay" v-if="prizeVisible" class="prize-display">
      <div id="prizeIcon" class="text-4xl">
        {{ selectedSegment?.currency === 'AQCNX' ? '🪙' : selectedSegment?.currency === 'TON' ? '💎' : selectedSegment?.currency === '$' ? '🎫' : '🎉' }}
      </div>
      <div id="prizeAmount" class="text-lg font-bold">
        <span v-if="selectedSegment?.currency === 'SPINS'">+{{ selectedSegment.value }} Spins</span>
        <span v-else-if="selectedSegment">{{ selectedSegment.value }} {{ selectedSegment.currency }}</span>
      </div>
      <div id="prizeType">{{ selectedSegment?.type }}</div>
      <div v-if="selectedSegment?.currency === '$'" id="voucherNote">Voucher will be sent to your email.</div>
    </div>

    <div id="rewardsHistory" class="rewards-history mt-4">
      <div v-if="rewardsHistory.length === 0" class="text-center text-blue-200 p-4">No rewards yet. Start spinning!</div>
      <div v-for="(reward, index) in rewardsHistory" :key="index" class="history-item">
        <span class="history-icon">
          {{ reward.currency === 'AQCNX' ? '🪙' : reward.currency === 'TON' ? '💎' : '🎫' }}
        </span>
        <span class="history-text">{{ reward.value }} {{ reward.currency }}</span>
        <span class="history-type">{{ reward.type }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wheel-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  margin: auto;
}
.wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(#34d399 0deg 60deg, #3b82f6 60deg 120deg, #fbbf24 120deg 180deg, #f87171 180deg 240deg, #a78bfa 240deg 300deg, #10b981 300deg 360deg);
}
.prize-display {
  transition: opacity 0.3s;
  opacity: 1;
  text-align: center;
  margin-top: 1rem;
}
.history-item {
  display: flex;
  justify-content: space-between;
  background: #1e3a8a;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}
</style>
