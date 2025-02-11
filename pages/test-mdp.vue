<script setup lang="ts">
import { ref, computed } from 'vue';

const password = ref('');

// Vérification des critères
const checks = computed(() => ({
  length: password.value.length >= 12,
  uppercase: /[A-Z]/.test(password.value),
  lowercase: /[a-z]/.test(password.value),
  numbers: /\d/.test(password.value),
  special: /[!@#$%^&*(),.?":{}|<>]/.test(password.value)
}));

// Calcul du score
const strengthScore = computed(() => {
  const { length, uppercase, lowercase, numbers, special } = checks.value;
  let score = 0;
  
  if (password.value.length >= 8) score += 20;
  if (password.value.length >= 12) score += 20;
  if (uppercase) score += 20;
  if (lowercase) score += 20;
  if (numbers) score += 10;
  if (special) score += 10;
  
  return Math.min(score, 100);
});

// Message personnalisé
const strengthMessage = computed(() => {
  if (!password.value) return { text: 'Entrez un mot de passe', color: 'text-gray-400' };

  const missing = [];
  if (!checks.value.length) missing.push('12 caractères minimum');
  if (!checks.value.uppercase) missing.push('une majuscule');
  if (!checks.value.lowercase) missing.push('une minuscule');
  if (!checks.value.numbers) missing.push('un chiffre');
  if (!checks.value.special) missing.push('un caractère spécial');

  if (missing.length === 0) {
    return {
      text: 'Mot de passe très sécurisé !',
      color: 'text-green-500'
    };
  }

  return {
    text: `Il manque : ${missing.join(', ')}`,
    color: `text-${strengthScore.value > 60 ? 'yellow' : 'red'}-500`
  };
});

const strengthColor = computed(() => {
  if (strengthScore.value >= 90) return 'bg-green-500';
  if (strengthScore.value >= 70) return 'bg-blue-500';
  if (strengthScore.value >= 50) return 'bg-yellow-500';
  if (strengthScore.value >= 30) return 'bg-orange-500';
  return 'bg-red-500';
});
</script>

<template>
  <div class="password-checker">
    <div class="password-checker__container">
      <h1 class="password-checker__title">Vérifiez la force de votre mot de passe</h1>
      
      <div class="password-checker__input-wrapper">
        <input
          v-model="password"
          type="text"
          placeholder="Entrez votre mot de passe"
          class="password-checker__input"
        />
      </div>

      <div class="password-checker__strength">
        <!-- Barre de progression -->
        <div class="password-checker__progress-bg">
          <div 
            class="password-checker__progress-bar"
            :class="strengthColor"
            :style="{ width: `${strengthScore}%` }"
          ></div>
        </div>
        
        <!-- Message -->
        <p class="password-checker__message" :class="strengthMessage.color">
          {{ strengthMessage.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.password-checker {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f3c, #2c3e50);
  padding: 2rem;
  color: #ffffff;

  &__container {
    max-width: 600px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.1);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  }

  &__title {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #00f5d4;
  }

  &__input-wrapper {
    margin-bottom: 2rem;
  }

  &__input {
    width: 100%;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    color: #ffffff;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #00f5d4;
    }
  }

  &__strength {
    text-align: center;
  }

  &__progress-bg {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  &__progress-bar {
    height: 100%;
    width: 0;
    transition: all 0.3s ease;
  }

  &__message {
    font-size: 1rem;
    margin-top: 1rem;
    min-height: 1.5rem;
    transition: all 0.3s ease;
  }
}
</style>