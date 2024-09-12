<script setup lang="ts"></script>

<template>
	<div class="w-dvw h-dvh flex flex-col gap-[10%]">
		<div class="w-full flex items-center justify-center text-center">
			<a
				href="/"
				class="text-mainbg font-bold text-[60px] w-fit mt-[5%] hover:tracking-widest transition-all duration-200"
			>
				LitGO
			</a>
		</div>

		<slot />
	</div>
</template>
