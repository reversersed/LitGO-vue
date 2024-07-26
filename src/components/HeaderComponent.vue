<script lang="ts" setup>
import SearchFieldComponent from "../components/SearchFieldComponent.vue";
</script>

<template>
	<header
		class="flex items-center pr-[10%] pl-[10%] h-16 bg-mainbg font-semibold"
	>
		<div>
			<h1 class="text-maintext m-0 font-sans text-xl tracking-[2px]">
				<a class="no-underline text-maintext" href="/">LitGO</a>
			</h1>
		</div>

		<div class="catalog-wrapper">
			<button
				class="border-0 bg-accent pt-[10px] pr-[25px] pb-[10px] pl-[25px] rounded-xl cursor-pointer m-2.5 text-maintext text-sm font-semibold font-sans hover:bg-neutral-700"
			>
				Каталог
			</button>
			<div class="show-catalog"></div>
		</div>
		<div class="flex-1 pr-[5%]">
			<SearchFieldComponent />
		</div>
		<div class="flex">
			<div
				class="text-maintext m-2.5 font-sans cursor-pointer font-normal hover:text-accent hover:font-semibold md:transition-all"
			>
				Отложенные
			</div>
			<div
				class="text-maintext m-2.5 font-sans cursor-pointer font-normal hover:text-accent hover:font-semibold md:transition-all"
			>
				Корзина
			</div>
			<div
				class="text-maintext m-2.5 font-sans cursor-pointer font-normal hover:text-accent hover:font-semibold md:transition-all"
			>
				Мои книги
			</div>
			<div
				class="text-maintext m-2.5 font-sans cursor-pointer font-normal hover:text-accent hover:font-semibold md:transition-all"
			>
				Войти
			</div>
		</div>
	</header>
</template>
