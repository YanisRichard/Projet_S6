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
          <h1 class="banner__title">Bienvenue</h1>
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
      default: 0.3
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
  .banner {
    position: relative;
    height: v-bind('height');
    overflow: hidden;
    
    &__background {
      position: absolute;
      inset: -100px 0 -100px 0; // Augmentation de la taille pour éviter les bords blancs
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
      color: white;
      font-size: 2.5rem;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
  }
  </style>