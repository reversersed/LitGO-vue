<script setup lang="ts">
import { RouterView } from "vue-router";
import AppLayout from "./layouts/AppLayout.vue";
</script>

<template>
	<Suspense>
		<AppLayout>
			<RouterView />
		</AppLayout>
	</Suspense>
</template>
