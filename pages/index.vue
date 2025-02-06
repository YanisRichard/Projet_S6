<script lang="ts">
import { ParallaxBanner } from '#components';
</script>

<template>


  <main class="home">
    <ParallaxBanner />

    <div class="home__hero">
      <h2 class="home__title">Bienvenue sur SafePass - La Sécurité Commence par un Bon Mot de Passe !</h2>
      <p class="home__intro">Dans un monde numérique où les cybermenaces sont omniprésentes, la protection de vos données personnelles débute par un mot de passe sûr et efficace. Chez SecurePass, nous vous aidons à comprendre l'importance des mots de passe robustes et vous fournissons les meilleurs conseils pour améliorer votre cybersécurité.</p>
    </div>

    <section class="home__section">
      <h3 class="home__subtitle">Pourquoi un bon mot de passe est essentiel</h3>
      <p class="home__text">Chaque jour, des milliers de comptes en ligne sont compromis en raison de mots de passe faibles ou réutilisés. Un mot de passe robuste est votre première ligne de défense contre les pirates informatiques et les tentatives de vol de données.</p>
    </section>

    <section class="home__section home__section--tips">
      <h3 class="home__subtitle">Nos conseils pour un mot de passe infaillible :</h3>
      <ul class="home__list">

        <li class="home__list-item">Utilisez au moins 12 caractères, avec un mix de lettres, chiffres et symboles.</li>
        <li class="home__list-item">Évitez les informations personnelles (date de naissance, nom, etc.).</li>
        <li class="home__list-item">Ne réutilisez jamais le même mot de passe pour plusieurs comptes.</li>
        <li class="home__list-item">Activez l'authentification à deux facteurs (2FA) quand c'est possible.</li>
        <li class="home__list-item">Optez pour un gestionnaire de mots de passe fiable.</li>
      </ul>
    </section>

    <section class="home__section home__section--cta">
      <h3 class="home__subtitle">Protégez votre vie en ligne dès maintenant !</h3>
      <p class="home__text">SecurePass vous accompagne avec des guides pratiques, des outils de vérification de sécurité et les dernières actualités sur la cybersécurité. Ne laissez pas un mot de passe faible mettre en péril votre identité numérique !</p>
    </section>

    <section class="home__section home__section--closing">
      <h3 class="home__subtitle">Ensemble, rendons Internet plus sûr.</h3>
    </section>
  </main>
</template>

<style lang="scss">
// Variables
$color-primary: #1a1f3c;
$color-secondary: #2c3e50;
$color-accent: #00f5d4;
$color-text: #e0e0e0;
$color-background: #0f172a;

// Mixins
@mixin section-highlight {
  background: linear-gradient(45deg, rgba($color-primary, 0.8), rgba($color-secondary, 0.8));
  border-left: 4px solid $color-accent;
}

.home {
  background-color: $color-background;
  color: $color-text;
  padding: 2rem 1rem;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;

  &__hero {
    max-width: 1000px;
    margin: 2rem auto 4rem;
    text-align: center;
    padding: 3rem 1rem;
    background: linear-gradient(180deg, rgba($color-primary, 0.9), rgba($color-secondary, 0.9));
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 2rem;
    background: linear-gradient(120deg, $color-accent, #80ffea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  &__subtitle {
    font-size: 1.8rem;
    color: $color-accent;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }

  &__section {
    max-width: 900px;
    margin: 0 auto 3rem;
    padding: 2rem;
    border-radius: 0.5rem;
    @include section-highlight;

    &--tips {
      background: linear-gradient(135deg, rgba($color-primary, 0.95), rgba($color-secondary, 0.95));
    }

    &--cta {
      text-align: center;
      background: linear-gradient(45deg, rgba($color-secondary, 0.9), rgba($color-primary, 0.9));
    }
  }

  &__list {
    list-style: none;
    padding: 0;

    &-item {
      margin-bottom: 1rem;
      padding-left: 2rem;
      position: relative;

      &::before {
        content: '🔒';
        position: absolute;
        left: 0;
        color: $color-accent;
      }
    }
  }

  &__text {
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  &__intro {
    font-size: 1.2rem;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto;
  }
}

// Animation subtile au survol des sections
.home__section {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
}
</style>