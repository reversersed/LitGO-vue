<script setup lang="ts">
import { RouterView } from "vue-router";
import UserHttpService from "@/service/HttpService/userHttpService";
import { OnUserLogin } from "@/service/plugins/userStatePlugin";
import AppLayout from "./layouts/AppLayout.vue";
</script>

<script lang="ts">
await new UserHttpService()
	.checkForAuthorization()
	.then((response) => response !== undefined && OnUserLogin(response));
</script>

<template>
	<AppLayout>
		<RouterView />
	</AppLayout>
</template>
