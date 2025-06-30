
<template>
  <div class="auth-container" >
    <div class="auth-card">
      <h1 class="auth-title">Create AquaCoinX Account</h1>
      <SignupForm />
      <p class="auth-switch">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import SignupForm from '@/components/auth/SignupForm.vue';
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0077b6, #00b4d8);
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-title {
  color: #0077b6;
  text-align: center;
  margin-bottom: 1.5rem;
}

.auth-switch {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.auth-switch a {
  color: #0077b6;
  text-decoration: none;
  font-weight: 500;
}
</style>