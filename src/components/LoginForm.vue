<script setup lang="ts">
const emit = defineEmits(["success"]);

function attempLogin(e: Event) {
	console.log(123);
	e.preventDefault();
}
</script>

<template>
	<form @submit="attempLogin" class="flex flex-col gap-5 w-full items-center">
		<div class="flex flex-col w-full">
			<input
				type="text"
				class="peer border-spacing-2 border-gray-500/40 border-2 rounded-md px-2 py-1 font-main text-accent z-10 bg-transparent outline-none focus:border-accent valid:border-accent origin-center transition-all duration-200"
				id="login"
				required
			/>
			<label
				for="login"
				class="absolute translate-y-[5px] translate-x-[9px] font-main text-accent/50 bg-white w-fit select-none z-0 transition-all duration-200 peer-valid:text-accent peer-valid:-translate-y-[10px] peer-valid:z-20 peer-valid:px-1 peer-valid:text-sm peer-focus:text-accent peer-focus:-translate-y-[10px] peer-focus:z-20 peer-focus:px-1 peer-focus:text-sm"
				>Логин или почта</label
			>
		</div>
		<div class="flex flex-col w-full">
			<input
				type="password"
				class="peer border-spacing-2 border-gray-500/40 border-2 rounded-md px-2 py-1 font-main text-accent z-10 bg-transparent outline-none focus:border-accent valid:border-accent origin-center transition-all duration-200"
				id="password"
				required
			/>
			<label
				for="password"
				class="absolute translate-y-[5px] translate-x-[9px] font-main text-accent/50 bg-white w-fit select-none z-0 transition-all duration-200 peer-valid:text-accent peer-valid:-translate-y-[10px] peer-valid:z-20 peer-valid:px-1 peer-valid:text-sm peer-focus:text-accent peer-focus:-translate-y-[10px] peer-focus:z-20 peer-focus:px-1 peer-focus:text-sm"
				>Пароль</label
			>
		</div>
		<input
			type="submit"
			value="Войти"
			class="cursor-pointer w-fit px-6 py-1 bg-mainshadow/80 hover:bg-mainbg hover:tracking-widest text-maintext rounded-xl transition-all duration-300"
		/>
	</form>
</template>
