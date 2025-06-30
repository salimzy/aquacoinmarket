<template>
  <div class="spin-container">
    <canvas ref="wheelCanvas" width="400" height="400"></canvas>

    <div class="pointer"></div>

    <button class="spin-btn" @click="spin" :disabled="spinning">SPIN NOW</button>
    <br>
    <span style="font-size: bold;padding: 30px;" v-if="this.result"  >
you won {{ this.result }}
    </span>
    <div class="timer">Next spin in: {{ hours }}H {{ minutes }}M {{ seconds }}S</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      prizes: [
        '0.2 Aquacoins',
        '100 Aquacoins',
        '0.3 Toncoin',
        '1000 Aquacoins',
        '$100 Voucher',
        '0.2 Toncoin',
        '10 Aquacoins',
        '1000 Aquacoins',
      ],
      colors: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2'],
      spinning: false,
      selectedIndex:null,
      showResult:false,
      result:null,
      rotation: 0,
      hours: 9,
      minutes: 0,
      seconds: 0,
    };
  },
  mounted() {
    ctx.clearReact(0,0, canvas.width,canvas.height);
    ctx.save();
    ctx.translate(200,200);
    ctx.rotate((this.rotation * Math.PI)/180);
    ctx.translate(-200,-200);

    this.drawWheel();
    ctx.restore();
    this.drawPointer(ctx);
   // this.startCountdown();
  },
  methods: {
    drawWheel() {
      const canvas = this.$refs.wheelCanvas;
      const ctx = canvas.getContext("2d");
      const numSegments = this.prizes.length;
      const angle = (2 * Math.PI) / numSegments;

      for (let i = 0; i < numSegments; i++) {
        const startAngle = i * angle;
        const endAngle = startAngle + angle;

        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 180, startAngle, endAngle);
        ctx.fillStyle = (this.selectedIndex === i) ? "#FFD700": this.colors[i % this.colors.length];
        ctx.fill();
        ctx.stroke();
    
        // Text
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(startAngle + angle / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.fillText(this.prizes[i], 170, 10);
        ctx.restore();

      }
      

    },
    drawPointer(){
       ctx.save();
       ctx.fillStyle = "#FF0000";
       ctx.beginPath();
       ctx.moveTo(200,10);
       ctx.lineTo(190,40);
       ctx.lineTo(210,40);
       ctx.closePath();
       ctx.closePath();
       ctx.fill();
       ctx.restore(); 
      },
    spin() {
      if (this.spinning) return;

      this.spinning = true;

      const spins = 5;
      const numSegments = this.prizes.length;
      const randomIndex = Math.floor(Math.random() * numSegments);
      const anglePerSegment = 360 / numSegments;
      const targetAngle = 360 * spins + (360 - anglePerSegment * randomIndex);

      const canvas = this.$refs.wheelCanvas;
      const duration = 4000;
      const start = performance.now();
      const startRotation = this.rotation;

      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        this.rotation = startRotation + (targetAngle - startRotation) * progress;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.translate(-200, -200);
        this.drawWheel();
        ctx.restore();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.spinning = false;
        this.result = this.prizes[randomIndex];
          alert(`You won: ${this.result}` );
          // TODO: send result to backend here
        }
      };

      requestAnimationFrame(animate);
    },
    // startCountdown() {
    //   setInterval(() => {
    //     if (this.minutes === 0) {
    //       if (this.hours > 0) {
    //         this.hours--;
    //         this.minutes = 59;
    //       }
    //     } else {
    //       this.minutes--;
    //     }
    //   }, 60000); // every minute
    // }
  }
};
</script>

<style scoped>
.spin-container {
  text-align: center;
  margin-top: 30px;
  position: relative;
}

.pointer {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 30px solid white;
  z-index: 10;
}

.spin-btn {
  margin-top: 20px;
  background-color: #007BFF;
  color: white;
  padding: 12px 30px;
  border: none;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.timer {
  margin-top: 10px;
  font-size: 16px;
  color: #ffffff;
}
</style>