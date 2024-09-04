<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import UserHttpService from "@/service/HttpService/userHttpService";
import { OnUserLogin } from "@/service/plugins/userStatePlugin";
</script>

<script lang="ts">
await new UserHttpService()
	.checkForAuthorization()
	.then((response) => response !== undefined && OnUserLogin(response));
</script>

<template>
	<HeaderComponent />
	<Suspense>
		<RouterView />
	</Suspense>
	<FooterComponent />
</template>
