<script setup lang="ts">
import {
	faAngleLeft,
	faAngleRight,
	faBackspace,
	faBackward,
	faStepBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

interface genre {
	name: string;
	translit: string;
	bookCount: Number;
}
interface category {
	name: string;
	translit: string;
	genres: genre[];
}
const totalGenres = ref(0);
const currectCategory = ref<category | null>(null);
const loadCategories = async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const cats = [
		{
			name: "Бизнес-книги",
			translit: "legkoe-chtenie-25251",
			genres: [
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
			],
		},
		{
			name: "Ораторское искусство / риторика",
			translit: "legkoe-chtenie-25251",
			genres: [
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
			],
		},
		{
			name: "Легкое чтение",
			translit: "legkoe-chtenie-25251",
			genres: [
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
			],
		},
		{
			name: "Саморазвитие и самосовершенствование",
			translit: "legkoe-chtenie-25251",
			genres: [
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
			],
		},
		{
			name: "Легкое чтение",
			translit: "legkoe-chtenie-25251",
			genres: [
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
			],
		},
		{
			name: "Легкое чтение",
			translit: "legkoe-chtenie-25251",
			genres: [
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
			],
		},
		{
			name: "Легкое чтение",
			translit: "legkoe-chtenie-25251",
			genres: [
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
			],
		},
		{
			name: "Легкое чтение",
			translit: "legkoe-chtenie-25251",
			genres: [
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
			],
		},
		{
			name: "Легкое чтение",
			translit: "legkoe-chtenie-25251",
			genres: [
				{
					name: "Транслит",
					translit: "translit-23124",
					bookCount: Math.floor(Math.random() * 50000),
				},
			],
		},
	];
	totalGenres.value = 0;
	cats.map((elem) => (totalGenres.value += elem.genres.length));
	return cats;
};
const Categories = await loadCategories();
const getBookNoun = (number: number) => {
	let n = Math.abs(number);
	n %= 100;
	if (n >= 5 && n <= 20) {
		return "книг";
	}
	n %= 10;
	if (n === 1) {
		return "книга";
	}
	if (n >= 2 && n <= 4) {
		return "книги";
	}
	return "книг";
};
const getGenreNoun = (number: number) => {
	let n = Math.abs(number);
	n %= 100;
	if (n >= 5 && n <= 20) {
		return "жанров";
	}
	n %= 10;
	if (n === 1) {
		return "жанр";
	}
	if (n >= 2 && n <= 4) {
		return "жанра";
	}
	return "жанров";
};
</script>

<template>
	<div
		class="w-full h-auto bg-maintext flex flex-col justify-centerz-[100] min-h-[60%]"
	>
		<div v-if="currectCategory != null" class="w-full flex flex-row mt-5">
			<div
				class="w-8 h-8 py-0.5 px-2.5 sm:w-10 sm:ml-5 text-xl sm:h-10 sm:py-1.5 sm:px-3.5 rounded-lg bg-contrast/30 text-contrast/80 hover:bg-contrast/40 hover:text-contrast cursor-pointer transition-colors duration-150"
				@click="currectCategory = null"
			>
				<FontAwesomeIcon :icon="faAngleLeft" />
			</div>
			<div class="ml-4 sm:ml-20 flex flex-col h-full">
				<div class="flex flex-row">
					<span class="text-base sm:text-2xl sm:font-bold">{{
						currectCategory.name
					}}</span>
					<a
						:href="'/genre/' + currectCategory.translit"
						class="ml-2 sm:ml-5 block pt-1 sm:pt-[5px] text-center items-center text-xs sm:text-lg sm:font-semibold text-contrast cursor-pointer hover:text-contrast/80 transition-colors duration-200"
						>Все книги жанра <FontAwesomeIcon :icon="faAngleRight" />
					</a>
				</div>
				<div class="mt-2 mb-8 font-main min-h-full flex flex-row">
					<ul class="w-auto">
						<li
							v-for="genre in currectCategory.genres.slice(0, 12)"
							class="mb-2 w-fit"
						>
							<a
								class="font-normal font-main hover:text-contrast text-black break-words transition-colors duration-300 text-xs sm:text-base"
								:href="'/genre/' + genre.translit"
								>{{ genre.name }}</a
							>
							<span
								class="ml-1 text-sm font-light text-black/60 underline decoration-dotted select-none"
								>{{ genre.bookCount }}
								{{ getBookNoun(genre.bookCount.valueOf()) }}</span
							>
						</li>
					</ul>
					<ul
						class="w-auto ml-2 sm:ml-5"
						v-if="currectCategory.genres.length > 12"
					>
						<li
							v-for="genre in currectCategory.genres.slice(
								12,
								currectCategory.genres.length
							)"
							class="mb-2 w-fit"
						>
							<a
								class="font-normal font-main hover:text-contrast text-black break-words transition-colors duration-300 text-xs sm:text-base"
								:href="'/genre/' + genre.translit"
								>{{ genre.name }}</a
							>
							<span
								class="ml-1 text-sm font-light text-black/60 underline decoration-dotted select-none"
								>{{ genre.bookCount }}
								{{ getBookNoun(genre.bookCount.valueOf()) }}</span
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div
			class="w-[90%] h-full sm:columns-3 md:columns-4 columns-2 mt-[30px]"
			v-if="currectCategory == null"
		>
			<div
				v-for="category in Categories"
				class="inline-block w-full lg:pl-[60px] pb-[30px]"
			>
				<a
					class="text-black hover:text-black/60 transition-all break-words duration-200 text-sm sm:text-xl font-semibold font-main mb-5"
					:href="'/genre/' + category.translit"
					>{{ category.name }}</a
				>
				<ul class="mt-2">
					<li v-for="genre in category.genres.slice(0, 5)">
						<a
							:title="genre.bookCount + ' ' + getBookNoun(genre.bookCount)"
							class="mb-1 font-normal font-main hover:text-contrast text-black break-words transition-colors duration-300 text-xs sm:text-base"
							:href="'/genre/' + genre.translit"
							>{{ genre.name }}</a
						>
					</li>
				</ul>

				<a @click="currectCategory = category" class="cursor-pointer">
					<p
						v-if="category.genres.length > 5"
						class="underline decoration-dotted hover:text-contrast text-black/50 font-normal transition-colors duration-300 text-xs sm:text-base"
					>
						Все {{ category.genres.length }}
					</p>
				</a>
			</div>
		</div>
		<div class="flex justify-center mt-auto py-2 bg-accent/20 w-full">
			<a
				href="/genres"
				class="text-contrast hover:text-contrast/60 transition-colors duration-200"
				>Все {{ totalGenres }} {{ getGenreNoun(totalGenres) }}</a
			>
		</div>
	</div>
</template>
