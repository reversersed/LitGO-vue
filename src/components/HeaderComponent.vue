<script lang="ts" setup>
import SearchFieldComponent from "@/components/SearchFieldComponent.vue";
import { faBars, faBookBookmark, faBookReader, faCartShopping, faClose, faFilter, faHome, faJournalWhills, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons/faDoorClosed";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

const open = ref(false)

const Links = [
	{
		link: "/",
		label: "Отложенные",
		icon: faBookBookmark,
		visibleFunc: () => true
	},
	{
		link: "/",
		label: "Корзина",
		icon: faCartShopping,
		visibleFunc: () => true
	},
	{
		link: "/",
		label: "Мои книги",
		icon: faBookReader,
		visibleFunc: () => true
	},
	{
		link: "/",
		label: "Войти",
		icon: faDoorClosed,
		visibleFunc: () => true
	}
]
</script>

<template>
	<header
		class="z-50 pl-2 flex flex-col lg:flex-row lg:items-center justify-center lg:pr-[10%] lg:pl-[10%] h-12 lg:h-16 bg-mainbg font-semibold"
	>
		<div class="z-50 flex flex-row w-full lg:w-auto justify-center h-full">
			<h1 class="text-maintext m-0 font-sans pt-2 pl-2 text-xl lg:p-0 tracking-[2px] lg:my-auto h-fit sm:block hidden">
				<a class="no-underline text-maintext" href="/">LitGO</a>
			</h1>
			<button class="lg:hidden ml-auto mr-2 my-auto" @click="()=>{open = !open}">
				<FontAwesomeIcon v-if="!open" :icon="faBars" class="text-maintext" size="xl"/>
				<FontAwesomeIcon v-if="open" :icon="faClose" class="text-maintext" size="xl"/>
			</button>
		</div>

		<div class="catalog-wrapper">
			<button
				class="hidden lg:block text-sm px-4 py-3 m-1.5 border-0 bg-accent lg:py-[10px] lg:px-[25px] rounded-xl cursor-pointer lg:m-2.5 text-maintext lg:text-sm font-semibold font-sans hover:bg-neutral-700"
			>
				Каталог
			</button>
			<div class="show-catalog"></div>
		</div>
		<div class="flex-1 pr-[2%]">
			<SearchFieldComponent />
		</div>
		<div class="bg-mainbg lg:left-0 top-8 w-full pt-4 pb-2 pl-4 lg:p-0 lg:top-0 lg:w-auto z-40 flex flex-col absolute lg:bg-transparent lg:flex-row lg:relative duration-800 transition-all ease-in"
		:class="[open ? 'left-0' : '-left-full']">
			<div
				class="block sm:hidden text-maintext hover:text-accent hover:font-semibold lg:transition-all"
			>
				<a class="font-normal m-2.5 text-md font-sans no-underline cursor-pointer flex lg:flex-col" href="/">
					<FontAwesomeIcon class="w-8 mr-2 -ml-2 lg:h-7 lg:w-auto lg:m-0" :icon="faHome" size="xl"/>
					Главная
				</a>
			</div>
			<div
				v-for="link in Links"
				class="text-maintext hover:text-accent hover:font-semibold lg:transition-all"
			>
				<a v-if="link.visibleFunc()" class="font-normal m-2.5 text-md lg:w-20 items-center font-sans no-underline cursor-pointer flex lg:flex-col" :href="link.link">
					<FontAwesomeIcon class="w-8 mr-2 -ml-2 lg:h-7 lg:w-auto lg:m-0" :icon="link.icon" size="xl"/>
					{{ link.label }}
				</a>
			</div>
		</div>
	</header>
</template>
