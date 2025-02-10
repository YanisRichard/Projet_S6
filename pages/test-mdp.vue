<script setup lang="ts">
import { ref, computed } from 'vue';

const password = ref('');

// Critères de sécurité avec leurs vérifications
const criteria = computed(() => [
  {
    name: 'Longueur',
    check: password.value.length >= 12,
    status: password.value.length >= 12 ? 'success' : 
            password.value.length >= 8 ? 'warning' : 'danger',
    description: 'Au moins 12 caractères'
  },
  {
    name: 'Majuscules',
    check: /[A-Z]/.test(password.value),
    status: /[A-Z]/.test(password.value) ? 'success' : 'danger',
    description: 'Au moins une majuscule'
  },
  {
    name: 'Minuscules',
    check: /[a-z]/.test(password.value),
    status: /[a-z]/.test(password.value) ? 'success' : 'danger',
    description: 'Au moins une minuscule'
  },
  {
    name: 'Chiffres',
    check: /\d/.test(password.value),
    status: /\d/.test(password.value) ? 'success' : 'danger',
    description: 'Au moins un chiffre'
  },
  {
    name: 'Caractères spéciaux',
    check: /[!@#$%^&*(),.?":{}|<>]/.test(password.value),
    status: /[!@#$%^&*(),.?":{}|<>]/.test(password.value) ? 'success' : 'danger',
    description: 'Au moins un caractère spécial'
  }
]);

// Score global de sécurité
const securityScore = computed(() => {
  const validCriteria = criteria.value.filter(c => c.check).length;
  return (validCriteria / criteria.value.length) * 100;
});

// Message de force du mot de passe
const strengthMessage = computed(() => {
  if (securityScore.value === 100) return { text: 'Très fort', class: 'text-green-500' };
  if (securityScore.value >= 80) return { text: 'Fort', class: 'text-blue-500' };
  if (securityScore.value >= 60) return { text: 'Moyen', class: 'text-yellow-500' };
  if (securityScore.value >= 40) return { text: 'Faible', class: 'text-orange-500' };
  return { text: 'Très faible', class: 'text-red-500' };
});
</script>

<template>
  <div class="password-tester">
    <div class="password-tester__container">
      <h1 class="password-tester__title">Testeur de Mot de Passe</h1>
      
      <div class="password-tester__input-group">
        <input
          v-model="password"
          type="text"
          placeholder="Entrez votre mot de passe"
          class="password-tester__input"
        />
      </div>

      <!-- Barre de progression -->
      <div class="password-tester__strength-bar">
        <div 
          class="password-tester__strength-progress"
          :style="{ width: `${securityScore}%` }"
          :class="{
            'bg-red-500': securityScore < 40,
            'bg-orange-500': securityScore >= 40 && securityScore < 60,
            'bg-yellow-500': securityScore >= 60 && securityScore < 80,
            'bg-blue-500': securityScore >= 80 && securityScore < 100,
            'bg-green-500': securityScore === 100
          }"
        ></div>
      </div>

      <!-- Message de force -->
      <div class="password-tester__strength-message" :class="strengthMessage.class">
        Force du mot de passe : {{ strengthMessage.text }}
      </div>

      <!-- Liste des critères -->
      <div class="password-tester__criteria">
        <div 
          v-for="(criterion, index) in criteria" 
          :key="index"
          class="password-tester__criterion"
          :class="{
            'password-tester__criterion--success': criterion.status === 'success',
            'password-tester__criterion--warning': criterion.status === 'warning',
            'password-tester__criterion--danger': criterion.status === 'danger'
          }"
        >
          <div class="password-tester__criterion-icon">
            <span v-if="criterion.status === 'success'">✓</span>
            <span v-else-if="criterion.status === 'warning'">!</span>
            <span v-else>✗</span>
          </div>
          <div class="password-tester__criterion-content">
            <h3>{{ criterion.name }}</h3>
            <p>{{ criterion.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.password-tester {
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
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #00f5d4;
  }

  &__input-group {
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
    
    &:focus {
      outline: none;
      border-color: #00f5d4;
    }
  }

  &__strength-bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  &__strength-progress {
    height: 100%;
    transition: all 0.3s ease;
  }

  &__strength-message {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  &__criteria {
    display: grid;
    gap: 1rem;
  }

  &__criterion {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;

    &--success {
      border-left: 4px solid #10b981;
      .password-tester__criterion-icon {
        color: #10b981;
      }
    }

    &--warning {
      border-left: 4px solid #f59e0b;
      .password-tester__criterion-icon {
        color: #f59e0b;
      }
    }

    &--danger {
      border-left: 4px solid #ef4444;
      .password-tester__criterion-icon {
        color: #ef4444;
      }
    }
  }

  &__criterion-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  &__criterion-content {
    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
}
</style>