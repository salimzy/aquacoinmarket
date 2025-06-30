<template>
    <div class="result-modal"  @click="closeModal">
            <div class="result-content" >
                <div class="result-icon"></div>
                <h2 class="result-title"></h2>
                <p class="result-description"></p>
                
                <div class="voucher-code">
                    Voucher Code: 
                </div>
                
                <button class="close-button" @click="closeModal">Claim Prize</button>
            </div>
        </div>
</template>
<script>

</script>
<style scoped>

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
</style>