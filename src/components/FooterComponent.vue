<script lang="ts" setup>
import { ref } from "vue";

const year = ref(new Date().getFullYear());
</script>

<template>
	<footer
		class="w-full sticky top-[100vh] flex flex-col items-center text-mainblack bg-accent-light p-6"
	>
		<p>LitGO © {{ year }}</p>
	</footer>
</template>
