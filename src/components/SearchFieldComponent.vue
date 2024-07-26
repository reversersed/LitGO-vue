<script lang="ts" setup>
import { ref } from "vue";
</script>

<template>
	<div
		class="z-50 bg-white rounded-2xl border-2 border-mainshadow flex items-center h-12"
	>
		<input
			placeholder="Искать на LitGO"
			type="text"
			name=""
			id=""
			class="z-50 border-0 outline-none p-2 pl-4 rounded-xl flex-1 font-sans font-medium text-base text-accent focus:placeholder:opacity-50"
		/>
		<button
			class="z-50 h-full w-fit pl-6 pr-6 border-0 bg-mainshadow text-maintext p-2 rounded-xl rounded-tl-xl rounded-bl-xl cursor-pointer hover:bg-mainbg hover:rounded-xl"
		>
			Найти
		</button>
	</div>
</template>
