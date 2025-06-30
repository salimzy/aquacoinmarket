  
    <style scoped>
 /* Full-page overlay */
.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.7); /* Optional: translucent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Make sure it's above other elements */
}

/* Spinner element */
.spin {
    height: 50px;
    width: 50px;
    border: 8px solid #ddd;
    border-top-color: #005fa3;
    border-radius: 50%;
    animation: spinner 1s linear infinite;
}

@keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}
</style>
<template>
     <div class="spinner-overlay">
    <div class="spin"></div>
  </div>
</template>
   