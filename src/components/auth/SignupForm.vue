
<template>
  <form @submit.prevent="handleSubmit" class="auth-form ">
    <div class="form-group">
      <label for="name">Full Name</label>
      <input
        type="text"
        id="name"
        v-model="form.name"
        required
        placeholder="Enter your full name"
      />
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        required
        placeholder="Enter your email"
      />
    </div>
    
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="form.password"
        required
        placeholder="Create a password"
        minlength="8"
      />
      <small class="hint">Minimum 8 characters</small>
    </div>
    
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        v-model="form.confirmPassword"
        required
        placeholder="Confirm your password"
      />
    </div>
    
    <div v-if="auth.error" class="error-message">
      {{ auth.error }}
    </div>
    
    <button type="submit" :disabled="auth.loading" class="auth-button">
      <span v-if="auth.loading">Creating account...</span>
      <span v-else>Sign Up</span>
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const passwordMatch = ref(true);

watch(() => [form.value.password, form.value.confirmPassword], () => {
  passwordMatch.value = form.value.password === form.value.confirmPassword;
});

const handleSubmit = async () => {
  if (!passwordMatch.value) {
    auth.error = "Passwords don't match";
    return;
  }
  
  const userData = {
    name: form.value.name,
    email: form.value.email,
    password: form.value.password
  };
  
  const success = await auth.signup(userData);
  if (success) {
    router.push('/dashboard'); // Redirect to dashboard after signup
  }
};
</script>


<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.error-message {
  color: #e63946;
  text-align: center;
  margin: 0.5rem 0;
}

.auth-button {
  background-color: #0077b6;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.auth-button:hover {
  background-color: #023e8a;
}
.hint {
  color: #666;
  font-size: 0.8rem;
}
.auth-button:disabled {
  background-color: #90e0ef;
  cursor: not-allowed;
}
</style>