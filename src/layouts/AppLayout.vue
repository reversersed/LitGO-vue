<script setup lang="ts">
import { useRoute } from "vue-router";
import UserHttpService from "@/service/HttpService/userHttpService";
import { OnUserLogin } from "@/service/plugins/userStatePlugin";
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
