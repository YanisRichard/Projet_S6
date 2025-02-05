<script lang="ts">
</script>

<template>
  <header class="header">
    <div class="header__container">
      <h1 class="header__logo">
        <span class="header__logo-text">Safe</span>
        <span class="header__logo-text header__logo-text--accent">Pass</span>
      </h1>
      
      <nav class="header__nav">
        <a href="/" class="header__nav-link">Accueil</a>
        <a href="/blog" class="header__nav-link">Blog</a>
        <a href="/testor" class="header__nav-link">Test MDP</a>
        <a href="/generator" class="header__nav-link">Générateur MDP</a>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
// Variables
$color-primary: #4366ac;
$color-accent: #3b82f6;
$color-white: #ffffff;
$color-gray-light: #e5e7eb;
$color-gray-dark: #374151;
$color-black: #000000;
$transition-speed: 0.3s;

// Mixins
@mixin hover-effect {
  transition: all $transition-speed ease;
  
  &:hover {
    color: $color-accent;
    transform: translateY(-2px);
  }
}

// Header styles
.header {
  background: linear-gradient(to right, $color-gray-dark, darken($color-accent, 20%));
  padding: 1rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;

  &__container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  &__logo {
    font-size: 2rem;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: 800;
    letter-spacing: -0.5px;
  

    &-text {
      color: $color-white;

      &--accent {
        color: $color-accent;
      }
    }
  }

  &__nav {
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  &__nav-link {
    color: $color-white;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    @include hover-effect;

    &.router-link-active {
      color: $color-accent;
      background-color: rgba($color-white, 0.1);
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 0.4rem 0.8rem;
    }
  }
}

// Ajout d'un espace pour compenser le header fixed
body {
  padding-top: 80px;
  
  @media (max-width: 768px) {
    padding-top: 120px;
  }
}
</style>