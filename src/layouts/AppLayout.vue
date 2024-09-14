<script setup lang="ts">
import UserHttpService from "@/service/HttpService/userHttpService";
import { OnUserLogin } from "@/service/plugins/userStatePlugin";
import { useRoute } from "vue-router";
const route = useRoute();

await new UserHttpService()
	.checkForAuthorization()
	.then((response) => response !== undefined && OnUserLogin(response));
</script>

<template>
	<component :is="route.meta.layoutComponent">
		<slot />
	</component>
</template>
