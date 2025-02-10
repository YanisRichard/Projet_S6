<script setup lang="ts">
import { ref, computed } from 'vue';

// État des options
const passwordLength = ref(16);
const includeUppercase = ref(true);
const includeLowercase = ref(true);
const includeNumbers = ref(true);
const includeSymbols = ref(true);
const generatedPassword = ref('');

// Caractères disponibles
const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Vérification de la force du mot de passe
const passwordStrength = computed(() => {
  if (!generatedPassword.value) return { text: '', color: '' };
  
  const length = generatedPassword.value.length;
  const hasUpper = /[A-Z]/.test(generatedPassword.value);
  const hasLower = /[a-z]/.test(generatedPassword.value);
  const hasNumber = /[0-9]/.test(generatedPassword.value);
  const hasSymbol = /[^A-Za-z0-9]/.test(generatedPassword.value);
  
  const strength = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
  
  if (length >= 12 && strength >= 4) {
    return { text: 'Très fort', color: 'text-green-500' };
  } else if (length >= 8 && strength >= 3) {
    return { text: 'Fort', color: 'text-blue-500' };
  } else if (length >= 6 && strength >= 2) {
    return { text: 'Moyen', color: 'text-yellow-500' };
  }
  return { text: 'Faible', color: 'text-red-500' };
});

// Génération du mot de passe
const generatePassword = () => {
  let charset = '';
  if (includeLowercase.value) charset += characters.lowercase;
  if (includeUppercase.value) charset += characters.uppercase;
  if (includeNumbers.value) charset += characters.numbers;
  if (includeSymbols.value) charset += characters.symbols;

  let password = '';
  const mandatoryChars = [];

  // Ajout des caractères obligatoires
  if (includeUppercase.value) mandatoryChars.push(characters.uppercase[Math.floor(Math.random() * characters.uppercase.length)]);
  if (includeLowercase.value) mandatoryChars.push(characters.lowercase[Math.floor(Math.random() * characters.lowercase.length)]);
  if (includeNumbers.value) mandatoryChars.push(characters.numbers[Math.floor(Math.random() * characters.numbers.length)]);
  if (includeSymbols.value) mandatoryChars.push(characters.symbols[Math.floor(Math.random() * characters.symbols.length)]);

  // Ajout des caractères obligatoires au début
  password = mandatoryChars.join('');

  // Compléter avec des caractères aléatoires
  for (let i = password.length; i < passwordLength.value; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Mélanger le mot de passe
  password = password.split('').sort(() => Math.random() - 0.5).join('');
  generatedPassword.value = password;
};

// Copier dans le presse-papier
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedPassword.value);
    alert('Mot de passe copié !');
  } catch (err) {
    alert('Erreur lors de la copie');
  }
};
</script>

<template>
  <div class="generator">
    <div class="generator__container">
      <h1 class="generator__title">Générateur de Mot de Passe Sécurisé</h1>
      
      <div class="generator__password-display">
        <input 
          type="text" 
          :value="generatedPassword" 
          readonly 
          placeholder="Votre mot de passe sécurisé"
        />
        <button 
          @click="copyToClipboard" 
          :disabled="!generatedPassword"
          class="generator__copy-btn"
        >
          Copier
        </button>
      </div>

      <div class="generator__strength" v-if="generatedPassword">
        Force : <span :class="passwordStrength.color">{{ passwordStrength.text }}</span>
      </div>

      <div class="generator__options">
        <div class="generator__option">
          <label>Longueur du mot de passe: {{ passwordLength }}</label>
          <input 
            type="range" 
            v-model="passwordLength" 
            min="8" 
            max="32" 
            class="generator__slider"
          />
        </div>

        <div class="generator__checkboxes">
          <label>
            <input type="checkbox" v-model="includeUppercase" />
            Majuscules (A-Z)
          </label>
          <label>
            <input type="checkbox" v-model="includeLowercase" />
            Minuscules (a-z)
          </label>
          <label>
            <input type="checkbox" v-model="includeNumbers" />
            Chiffres (0-9)
          </label>
          <label>
            <input type="checkbox" v-model="includeSymbols" />
            Caractères spéciaux (!@#$%^&*)
          </label>
        </div>
      </div>

      <button 
        @click="generatePassword" 
        class="generator__generate-btn"
        :disabled="!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols"
      >
        Générer un mot de passe
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.generator {
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

  &__password-display {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    input {
      flex: 1;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 0.5rem;
      color: #ffffff;
      font-family: monospace;
      font-size: 1.2rem;
      
      &:focus {
        outline: none;
        border-color: #00f5d4;
      }
    }
  }

  &__copy-btn {
    padding: 0.5rem 1rem;
    background: #00f5d4;
    color: #1a1f3c;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: darken(#00f5d4, 10%);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__options {
    margin: 2rem 0;
  }

  &__option {
    margin-bottom: 1.5rem;
  }

  &__slider {
    width: 100%;
    margin-top: 0.5rem;
    -webkit-appearance: none;
    height: 5px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: #00f5d4;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  &__checkboxes {
    display: grid;
    gap: 1rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      input[type="checkbox"] {
        width: 1.2rem;
        height: 1.2rem;
        cursor: pointer;
      }
    }
  }

  &__generate-btn {
    width: 100%;
    padding: 1rem;
    background: #00f5d4;
    color: #1a1f3c;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: darken(#00f5d4, 10%);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__strength {
    text-align: center;
    margin: 1rem 0;
    font-size: 1.1rem;
  }
}
</style>