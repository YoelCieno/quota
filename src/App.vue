<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BaseTitle from './components/BaseTitle.vue'
import useModal from '@/components/modal/useModal';
import { modalName } from '@/composables';

const { isModalOpen, openModal } = useModal();

const onClickQuota = () => {
  if (!isModalOpen(modalName)) {
    openModal(modalName);
  }
};

</script>
<template>
  <header>
    <div class="wrapper">
      <BaseTitle msg="User's subscription quota" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/quota"
                    @click="onClickQuota" 
        >Subscription quota</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
  }
}
</style>
