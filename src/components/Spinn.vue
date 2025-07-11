<template>
  <div class="body">

  
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="title">AquaCoin-<span class="title-accent">Reward</span> Spin</h1>
      <p class="subtitle">Spin to earn AQCNX, TON, and $100 vouchers!</p>
    </div>

    <!-- Game Stats -->
    <div class="game-stats">
      <div class="stat-card">
        <div class="stat-label">Spins Left</div>
        <div class="stat-value">{{ spinsLeft }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total AQCNX</div>
        <div class="stat-value">{{ totalRewards.AQCNX }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Total TON</div>
        <div class="stat-value">{{ totalRewards.TON }}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Vouchers Won</div>
        <div class="stat-value">{{ totalRewards.vouchers }}</div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="wheel-section">
        <div class="wheel-container">
          <div ref="wheel" class="wheel">
            <div
              v-for="(seg, idx) in segments"
              :key="idx"
              :class="['wheel-segment', `segment-${idx+1}`]"
              :data-value="seg.value"
              :data-currency="seg.currency"
              :data-type="seg.type"
            >
              <span class="segment-text">{{ segLabel(seg) }}</span>
            </div>
          </div>

          <button
            class="wheel-center-button"
            :disabled="!canSpin"
            @click="spin"
          >
            <span>{{ spinButtonText }}</span>
          </button>

          <div class="wheel-pointer"></div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" :disabled="!canSpin" @click="spin">
            {{ spinButtonText }}
          </button>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="sidebar">
        <div class="card">
          <div class="card-title">🎫 Buy Spins</div>
          <div class="buy-spins">
            <button class="buy-spin-btn" @click="buySpins(1)">
              1 Spin<br>10 aqcnx
            </button>
            <button class="buy-spin-btn" @click="buySpins(5)">
              5 Spins<br>20 aqcnx
            </button>
            <button class="buy-spin-btn" @click="buySpins(10)">
              10 Spins<br>50 aqcnx
            </button>
          </div>
          <button class="buy-spin-btn" style="width:100%" @click="buySpins(20)">
            20 Spins - 100 aqcnx
          </button>
        </div>

        <div class="card">
          <div class="card-title">🏆 Recent Rewards</div>
          <div class="history">
            <div v-if="rewardsHistory.length === 0"
                 class="empty-history">
              No rewards yet. Start spinning!
            </div>
            <div v-for="(r, i) in rewardsHistory" :key="i" class="history-item">
              <span class="history-icon">{{ iconFor(r.currency) }}</span>
              <span class="history-text">{{ displayLabel(r) }}</span>
              <span class="history-type">{{ r.type }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Prize Modal -->
    <div v-if="prize.visible" class="prize-display show">
      <div class="prize-icon">{{ prize.icon }}</div>
      <div class="prize-title">{{ prize.title }}</div>
      <div class="prize-amount">{{ prize.amount }}</div>
      <div class="prize-type">{{ prize.type }}</div>
      <div v-if="prize.voucherNote" class="voucher-note">
        Check your email for voucher details
      </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "RewardSpinner",
  data() {
    return {
      spinsLeft: 3,
      totalRewards: { AQCNX: 0, TON: 0, vouchers: 0 },
      isSpinning: false,
      currentRotation: 0,
      rewardsHistory: [],
      segments: [
        { value: 20, currency: "AQCNX", type: "Common", angle: 60 },
        { value: 0.5, currency: "TON", type: "Rare", angle: 120 },
        { value: 100, currency: "$", type: "Voucher", angle: 180 },
        { value: 30, currency: "AQCNX", type: "Common", angle: 240 },
        { value: 50, currency: "AQCNX", type: "Uncommon", angle: 300 },
        { value: 0.3, currency: "TON", type: "Epic", angle: 360 }
      ],
      prize: {
        visible: false,
        icon: "",
        title: "Congratulations!",
        amount: "",
        type: "",
        voucherNote: false
      }
    };
  },
  computed: {
    canSpin() {
      return this.spinsLeft > 0 && !this.isSpinning;
    },
    spinButtonText() {
      if (this.isSpinning) return "SPINNING...";
      if (this.spinsLeft <= 0) return "No Spins Left";
      return "SPIN NOW";
    }
  },
  methods: {
    segLabel(seg) {
      if (seg.currency === "$") return `$${seg.value} Voucher`;
      return `${seg.value} ${seg.currency}`;
    },
    iconFor(curr) {
      switch (curr) {
        case "AQCNX": return "🪙";
        case "TON": return "💎";
        case "$": return "🎫";
      }
    },
    displayLabel(seg) {
      return seg.currency === "$"
        ? `$${seg.value} Voucher`
        : `${seg.value} ${seg.currency}`;
    },
    spin() {
      if (!this.canSpin) return;
      this.isSpinning = true;
      this.spinsLeft--;
      this.hidePrize();
      const selection = this.segments[Math.floor(Math.random() * this.segments.length)];
      this.performSpin(selection);
    },
    performSpin(target) {
      const wheel = this.$refs.wheel;
      const spins = 20 + Math.random() * 30;
      const totalRot = spins * 360 + (360 - target.angle);
      const finalRotation = this.currentRotation + totalRot;

      wheel.style.transition = "transform 4s cubic-bezier(0.23,1,0.32,1)";
      wheel.style.transform = `rotate(${finalRotation}deg)`;

      this.currentRotation = finalRotation % 360;
      setTimeout(() => this.finishSpin(target), 4000);
    },
    finishSpin(seg) {
      this.isSpinning = false;
      if (seg.currency === "AQCNX") this.totalRewards.AQCNX += seg.value;
      else if (seg.currency === "TON") this.totalRewards.TON += seg.value;
      else if (seg.currency === "$") this.totalRewards.vouchers += seg.value;

      this.rewardsHistory.unshift(seg);
      if (this.rewardsHistory.length > 10) this.rewardsHistory.pop();

      this.showPrize(seg);
    },
    showPrize(seg) {
      this.prize.icon = this.iconFor(seg.currency);
      this.prize.amount = this.displayLabel(seg);
      this.prize.type = `${seg.type} Reward`;
      this.prize.voucherNote = seg.currency === "$";
      this.prize.visible = true;
      setTimeout(this.hidePrize, 4000);
    },
    hidePrize() {
      this.prize.visible = false;
    },
    buySpins(n) {
      this.spinsLeft += n;
      this.showPrize({
        currency: "$",
        value: n,
        type: "Purchase",
      });
      this.prize.icon = "🎫";
      this.prize.amount = `+${n} Spins`;
      this.prize.type = "Purchase Complete";
      setTimeout(this.hidePrize, 2000);
    }
  }
};
</script>

 <style scoped>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                padding: 2rem; 
                
                color: white;  
            }
       
            .body
            {
                    background: linear-gradient(135deg, #1e3a8a, #1e40af, #0891b2);

                    min-height: 100%;
                    padding: 50px;
            }     
            .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 2rem;
        }

        .title {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }

        .title-accent {
            color: #22d3ee;
        }

        .subtitle {
            color: #bfdbfe;
            font-size: 1.25rem;
            margin-bottom: 2rem;
        }

        .game-stats {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(16px);
            border-radius: 1rem;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            text-align: center;
            min-width: 150px;
        }

        .stat-label {
            font-size: 0.875rem;
            color: #bfdbfe;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #22d3ee;
        }

        .main-content {
            display: flex;
            gap: 2rem;
            align-items: flex-start;
            flex-wrap: wrap;
            justify-content: center;
        }

        .wheel-section {
            flex: 1;
            min-width: 400px;
            text-align: center;
        }

        .wheel-container {
            position: relative;
            width: 350px;
            height: 350px;
            margin: 0 auto 2rem;
        }

        .wheel {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            position: relative;
            border: 8px solid #FFD700;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
            transition: transform 4s cubic-bezier(0.23, 1, 0.32, 1);
            overflow: hidden;
        }

        .wheel-segment {
            position: absolute;
            width: 100%;
            height: 100%;
            transform-origin: center;
        }

        .segment-1 { 
            background: conic-gradient(from 60deg at center, #4ade80 0deg, #4ade80 60deg, transparent 60deg);
        }
        .segment-2 { 
            background: conic-gradient(from 120deg at center, #3b82f6 0deg, #3b82f6 60deg, transparent 60deg);
        }
        .segment-3 { 
            background: conic-gradient(from 180deg at center, #ef4444 0deg, #ef4444 60deg, transparent 60deg);
        }
        .segment-4 { 
            background: conic-gradient(from 240deg at center, #8b5cf6 0deg, #8b5cf6 60deg, transparent 60deg);
        }
        .segment-5 { 
            background: conic-gradient(from 300deg at center, #f59e0b 0deg, #f59e0b 60deg, transparent 60deg);
        }
        .segment-6 { 
            background: conic-gradient(from 360deg at center, #06b6d4 0deg, #06b6d4 60deg, transparent 60deg);
        }

        .segment-text {
            position: absolute;
            font-weight: bold;
            font-size: 12px;
            color: white;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
            text-align: center;
            white-space: nowrap;
            transform-origin: center;
        }

        .segment-1 .segment-text {
            top: 50%;
            left: 80%;
            transform: translate(-50%, 0) rotate(60deg);
        }
        .segment-2 .segment-text {
            top: 80%;
            right: 30%;
            transform: translate(0, -50%) rotate(120deg);
        }
        .segment-3 .segment-text {
            bottom: 20%;
            right: 55%;
            transform: translate(0, 50%) rotate(180deg);
        }
        .segment-4 .segment-text {
            bottom: 50%;
            left: 10%;
            transform: translate(-50%, 0) rotate(240deg);
        }
        .segment-5 .segment-text {
            bottom: 80%;
            left: 20%;
            transform: translate(0, 50%) rotate(300deg);
        }
        .segment-6 .segment-text {
            top: 20%;
            left: 60%;
            transform: translate(0, -50%) rotate(360deg);
        }

        .wheel-center-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100px;
            height: 100px;
            background: #1e40af;
            border: 4px solid #FFD700;
            border-radius: 50%;
            color: white;
            font-weight: bold;
            font-size: 12px;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }

        .wheel-center-button:hover:not(:disabled) {
            background: #1e3a8a;
            transform: translate(-50%, -50%) scale(1.05);
        }

        .wheel-center-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .wheel-pointer {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-bottom: 30px solid #FFD700;
            z-index: 15;
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
        }

        .controls {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .btn {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
        }

        .btn-primary {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
        }

        .btn-primary:hover:not(:disabled) {
            background: linear-gradient(135deg, #2563eb, #1e40af);
            transform: translateY(-2px);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            color: white;
        }

        .btn-secondary:hover:not(:disabled) {
            background: linear-gradient(135deg, #7c3aed, #6d28d9);
            transform: translateY(-2px);
        }

        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .sidebar {
            flex: 1;
            min-width: 300px;
            max-width: 400px;
        }

        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(16px);
            border-radius: 1rem;
            padding: 1.5rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            margin-bottom: 1.5rem;
        }

        .card-title {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: #22d3ee;
        }

        .buy-spins {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }

        .buy-spin-btn {
            flex: 1;
            min-width: 80px;
            padding: 0.5rem;
            border: 1px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.875rem;
        }

        .buy-spin-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: #22d3ee;
        }

        .history {
            max-height: 300px;
            overflow-y: auto;
        }

        .history-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 0.5rem;
        }

        .history-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }

        .history-reward {
            font-weight: bold;
        }

        .history-time {
            font-size: 0.75rem;
            color: #bfdbfe;
        }

        .prize-display {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 1rem;
            padding: 2rem;
            border: 2px solid #FFD700;
            text-align: center;
            z-index: 1000;
            max-width: 400px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .prize-display.show {
            opacity: 1;
            visibility: visible;
        }

        .prize-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }

        .prize-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }

        .prize-amount {
            font-size: 2rem;
            font-weight: bold;
            color: #22d3ee;
            margin-bottom: 1rem;
        }

        .prize-type {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            border-radius: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
            .title {
                font-size: 2rem;
            }
            
            .main-content {
                flex-direction: column;
            }
            
            .wheel-container {
                width: 280px;
                height: 280px;
            }
            
            .game-stats {
                gap: 1rem;
            }
            
            .stat-card {
                min-width: 120px;
                padding: 1rem;
            }
        }
    </style>

    <script setup>
    
       
    </script>
    <!-- 
        class MultiRewardSpinGame {
    constructor() {
        this.spinsLeft = 3;
        this.totalRewards = {
            AQCNX: 0,
            TON: 0,
            vouchers: 0
        };
        this.isSpinning = false;
        this.currentRotation = 0;
        this.rewardsHistory = [];
        
        // Define 6 segments with their exact angles (60 degrees each)
        this.segments = [
            { value: 20, currency: "AQCNX", type: "Common", angle: 60, startAngle: 330, endAngle: 30 },      // Top segment
            { value: 0.5, currency: "TON", type: "Rare", angle: 120, startAngle: 30, endAngle: 90 },           // Top-right
            { value: 100, currency: "$", type: "Voucher", angle: 180, startAngle: 90, endAngle: 150 },      // Bottom-right
            { value: 30, currency: "AQCNX", type: "Common", angle: 240, startAngle: 150, endAngle: 210 },   // Bottom
            { value: 50, currency: "AQCNX", type: "Uncommon", angle: 300, startAngle: 210, endAngle: 270 }, // Bottom-left
            { value: 0.3, currency: "TON", type: "Epic", angle: 360, startAngle: 270, endAngle: 330 }        // Top-left
        ];
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.setupEventListeners();
        console.log('MultiRewardSpinGame initialized');
    }
    
    setupEventListeners() {
        const spinButton = document.getElementById('spinBtn');
        const wheelCenterButton = document.getElementById('spinButton');
        
        if (spinButton) {
            spinButton.addEventListener('click', () => this.spin());
        }
        if (wheelCenterButton) {
            wheelCenterButton.addEventListener('click', () => this.spin());
        }
    }
    
    updateDisplay() {
        document.getElementById('spinsLeft').textContent = this.spinsLeft;
        document.getElementById('totalAQCNX').textContent = this.totalRewards.AQCNX;
        document.getElementById('totalTON').textContent = this.totalRewards.TON;
        document.getElementById('totalVouchers').textContent = this.totalRewards.vouchers;
        
        // Update button states
        const spinButtons = [document.getElementById('spinBtn'), document.getElementById('spinButton')];
        spinButtons.forEach(btn => {
            if (btn) {
                btn.disabled = this.spinsLeft <= 0 || this.isSpinning;
                if (this.spinsLeft <= 0) {
                    btn.textContent = 'No Spins Left';
                } else if (this.isSpinning) {
                    btn.textContent = 'SPINNING...';
                } else {
                    btn.innerHTML = '<span>SPIN NOW</span>';
                }
            }
        });
    }
    
    spin() {
        if (this.spinsLeft <= 0 || this.isSpinning) {
            console.log('Cannot spin: spinsLeft =', this.spinsLeft, 'isSpinning =', this.isSpinning);
            return;
        }
        
        console.log('Starting spin...');
        this.isSpinning = true;
        this.spinsLeft--;
        this.updateDisplay();
        this.hidePrizeDisplay();
        
        // Randomly select a segment
        const selectedSegment = this.segments[Math.floor(Math.random() * this.segments.length)];
        console.log('Selected segment:', selectedSegment);
        
        this.spinWheel(selectedSegment);
    }
    
    spinWheel(targetSegment) {
        const wheel = document.getElementById('wheel');
        if (!wheel) return;
        
        // Calculate spins and final position
        const minSpins = 20;
        const maxSpins = 50;
        const spins = minSpins + Math.random() * (maxSpins - minSpins);
        const totalRotation = spins * 360;
        
        // Calculate the target angle to land on the selected segment
        // The pointer is at the top (0 degrees), so we need to rotate the wheel
        // so that the center of the target segment aligns with the pointer
        const targetAngle = targetSegment.angle;
        
        // Calculate final rotation: current rotation + full spins + adjustment to land on target
        // We subtract the target angle because we want that segment to end up at the top (0 degrees)
        const finalRotation = this.currentRotation + totalRotation + (360 - targetAngle);
        
        console.log('Target segment angle:', targetAngle);
        console.log('Final rotation:', finalRotation);
        console.log('Current rotation:', this.currentRotation);
        
        // Apply rotation with smooth animation
        wheel.style.transition = 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)';
        wheel.style.transform = `rotate(${finalRotation}deg)`;
        
        // Update current rotation for next spin
        this.currentRotation = finalRotation % 360;
        
        // End spinning after animation
        setTimeout(() => {
            this.endSpin(targetSegment);
        }, 4000);
    }
    
    endSpin(selectedSegment) {
        console.log('Spin ended. Reward:', selectedSegment);
        this.isSpinning = false;
        
        // Add rewards
        if (selectedSegment.currency === 'AQCNX') {
            this.totalRewards.AQCNX += selectedSegment.value;
        } else if (selectedSegment.currency === 'TON') {
            this.totalRewards.TON += selectedSegment.value;
        } else if (selectedSegment.currency === '$') {
            this.totalRewards.vouchers += selectedSegment.value;
        }
        
        // Add to history
        this.rewardsHistory.unshift(selectedSegment);
        if (this.rewardsHistory.length > 10) {
            this.rewardsHistory.pop();
        }
        
        this.updateDisplay();
        this.updateRewardsHistory();
        this.showPrizeDisplay(selectedSegment);
    }
    
    showPrizeDisplay(segment) {
        const prizeDisplay = document.getElementById('prizeDisplay');
        const prizeIcon = document.getElementById('prizeIcon');
        const prizeAmount = document.getElementById('prizeAmount');
        const prizeType = document.getElementById('prizeType');
        const voucherNote = document.getElementById('voucherNote');
        
        if (!prizeDisplay) return;
        
        // Set appropriate icon and text
        let icon = '🎉';
        let amountText = '';
        
        if (segment.currency === 'AQCNX') {
            icon = '🪙';
            amountText = `${segment.value} AQCNX`;
        } else if (segment.currency === 'TON') {
            icon = '💎';
            amountText = `${segment.value} TON`;
        } else if (segment.currency === '$') {
            icon = '🎫';
            amountText = `$${segment.value} Voucher`;
        }
        
        prizeIcon.textContent = icon;
        prizeAmount.textContent = amountText;
        prizeType.textContent = `${segment.type} Reward`;
        
        // Show voucher note for voucher rewards
        if (segment.currency === '$') {
            voucherNote.style.display = 'block';
        } else {
            voucherNote.style.display = 'none';
        }
        
        prizeDisplay.classList.add('show');
        
        setTimeout(() => {
            this.hidePrizeDisplay();
        }, 4000);
    }
    
    hidePrizeDisplay() {
        const prizeDisplay = document.getElementById('prizeDisplay');
        if (prizeDisplay) {
            prizeDisplay.classList.remove('show');
        }
    }
    
    updateRewardsHistory() {
        const historyContainer = document.getElementById('rewardsHistory');
        if (!historyContainer) return;
        
        if (this.rewardsHistory.length === 0) {
            historyContainer.innerHTML = '<div style="text-align: center; color: #bfdbfe; padding: 2rem;">No rewards yet. Start spinning!</div>';
            return;
        }
        
        const historyHTML = this.rewardsHistory.map(reward => {
            let icon = '🪙';
            let text = '';
            
            if (reward.currency === 'AQCNX') {
                icon = '🪙';
                text = `${reward.value} AQCNX`;
            } else if (reward.currency === 'TON') {
                icon = '💎';
                text = `${reward.value} TON`;
            } else if (reward.currency === '$') {
                icon = '🎫';
                text = `$${reward.value} Voucher`;
            }
            
            return `
                <div class="history-item">
                    <span class="history-icon">${icon}</span>
                    <span class="history-text">${text}</span>
                    <span class="history-type">${reward.type}</span>
                </div>
            `;
        }).join('');
        
        historyContainer.innerHTML = historyHTML;
    }
    
    buySpins(amount) {
        console.log(`Buying ${amount} spins`);
        this.spinsLeft += amount;
        this.updateDisplay();
        
        // Show purchase confirmation
        const prizeDisplay = document.getElementById('prizeDisplay');
        const prizeIcon = document.getElementById('prizeIcon');
        const prizeAmount = document.getElementById('prizeAmount');
        const prizeType = document.getElementById('prizeType');
        
        if (prizeDisplay) {
            prizeIcon.textContent = '🎫';
            prizeAmount.textContent = `+${amount} Spins`;
            prizeType.textContent = 'Purchase Complete';
            prizeDisplay.classList.add('show');
            
            setTimeout(() => {
                this.hidePrizeDisplay();
            }, 2000);
        }
    }
}
    
// Initialize the game
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new MultiRewardSpinGame();
    console.log('Game instance created and attached to window');
});
    
 -->