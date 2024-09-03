<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import useRouter from "@/service/plugins/routerProvidePlugin";

const router = useRouter();
</script>

<template>
	<div
		class="flex flex-col justify-center items-center mt-[20%] md:mt-[15%] lg:mt-[10%]"
	>
		<h1 class="text-xl font-semibold font-main mb-5">Авторизация</h1>
		<div class="w-fit sm:w-[30%] md:w-[35%] lg:w-[25%] xl:w-[20%] h-auto">
			<LoginForm v-on:success="() => router?.push('/')" />
		</div>
	</div>
</template>
