<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import { ref } from "vue";

const loginAttemptingState = ref(false);
const loginAttempingStateHandle = (state: boolean) =>
	(loginAttemptingState.value = state);
const pushToIndex = () => (window.location.href = "/");
</script>

<template>
	<div class="flex flex-col justify-center items-center">
		<h1
			class="mb-5 text-xl font-semibold tracking-wider font-main"
			:class="loginAttemptingState ? 'text-accent/40' : 'text-accent'"
		>
			Авторизация
		</h1>
		<div class="w-fit sm:w-[30%] md:w-[35%] lg:w-[25%] xl:w-[20%] h-auto">
			<LoginForm
				@success="() => pushToIndex()"
				@login-attempting="(state) => loginAttempingStateHandle(state)"
			/>
		</div>
	</div>
</template>
