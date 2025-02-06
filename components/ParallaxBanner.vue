<template>
    <div ref="banner" class="banner">
      <div
        class="banner__background"
        :style="{
          transform: `translateY(${offsetY}px)`,
          backgroundImage: `url(${backgroundImage})`
        }"
      ></div>
      <div class="banner__content">
        <slot>
          <h2 class="banner__title">Avec SafePass, sécuriser vos données sera toujours aussi facile.</h2>
        </slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  // Props pour rendre le composant plus flexible
  const props = defineProps({
    height: {
      type: String,
      default: '500px'
    },
    backgroundImage: {
      type: String,
      default: '/cyber-security-concept-digital-art.jpg'
    },
    parallaxStrength: {
      type: Number,
      default: 0.5
    }
  });
  
  const banner = ref(null);
  const offsetY = ref(0);
  
  const updateParallax = () => {
    if (!banner.value) return;
    
    const rect = banner.value.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      const scrollY = window.scrollY;
      const bannerTop = rect.top + scrollY;
      const scrollPosition = scrollY - bannerTop;
      offsetY.value = scrollPosition * props.parallaxStrength;
    }
  };
  
  // Utilisation de requestAnimationFrame pour de meilleures performances
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax(); // Initial update
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });
  </script>
  
  <style lang="scss" scoped>
  $color-primary: #1a1f3c;
    $color-secondary: #2c3e50;
$color-accent: #00f5d4;
$color-text: #e0e0e0;
$color-background: #0f172a;

  .banner {
    position: relative;
    height: v-bind('height');
    overflow: hidden;
    
    &__background {
      position: absolute;
      inset: -200px 0 -200px 0; // Augmentation de la taille pour éviter les bords blancs
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      will-change: transform; // Optimisation des performances
      transition: transform 0.1s linear;
    }
  
    &__content {
      position: relative;
      z-index: 10;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.6)
      );
    }
  
    &__title {
      color: $color-accent;
      font-size: 3rem;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      text-align: center;
    }
  }
  </style>