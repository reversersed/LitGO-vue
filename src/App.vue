<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';


</script>

<template>
    <HeaderComponent />
    <Suspense>
        <RouterView />
    </Suspense>
</template>

<style scoped></style>
