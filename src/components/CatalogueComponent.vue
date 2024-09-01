<script setup lang="ts">
import type Category from "@/models/category.model";
import categoryHttpService from "@/service/HttpService/categoryHttpService";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

const totalGenres = ref(0);
const currectCategory = ref<Category | null>(null);

const service = new categoryHttpService();
const Categories = await service.getAll().then((data) => {
	if (data === undefined) return;
	totalGenres.value = 0;
	data.map((elem) => (totalGenres.value += elem.genres.length));
	return data;
});
const getBookNoun = (number: number) =>
	Math.abs(number) % 100 >= 5 && Math.abs(number) % 100 <= 20
		? "книг"
		: (Math.abs(number) % 100) % 10 === 1
		? "книга"
		: (Math.abs(number) % 100) % 10 >= 2 && (Math.abs(number) % 100) % 10 <= 4
		? "книги"
		: "книг";
const getGenreNoun = (number: number) =>
	Math.abs(number) % 100 >= 5 && Math.abs(number) % 100 <= 20
		? "жанров"
		: (Math.abs(number) % 100) % 10 === 1
		? "жанр"
		: (Math.abs(number) % 100) % 10 >= 2 && (Math.abs(number) % 100) % 10 <= 4
		? "жанра"
		: "жанров";
</script>

<template>
	<div
		class="w-full h-auto bg-maintext flex flex-col justify-center z-[5] min-h-[60%] relative"
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
						:href="'/genre/' + currectCategory.translitName"
						class="ml-2 sm:ml-5 block pt-1 sm:pt-[5px] text-center items-center text-xs sm:text-lg sm:font-semibold text-contrast cursor-pointer hover:text-contrast/80 transition-colors duration-200"
						>Все книги жанра <FontAwesomeIcon :icon="faAngleRight" />
					</a>
				</div>
				<div
					class="mt-2 mb-8 font-main min-h-full"
					:class="[
						currectCategory.genres.length > 18 * 3
							? 'md:columns-2 lg:columns-3 xl:columns-4'
							: currectCategory.genres.length > 18 * 2
							? 'md:columns-2 lg:columns-3'
							: currectCategory.genres.length > 18
							? 'md:columns-2'
							: '',
					]"
				>
					<ul class="w-auto">
						<li
							v-for="genre in currectCategory.genres"
							:key="genre.translitName"
							class="mb-2 w-fit"
						>
							<a
								class="font-normal font-main hover:text-contrast text-black break-words transition-colors duration-300 text-xs sm:text-base"
								:href="'/genre/' + genre.translitName"
								>{{ genre.name }}</a
							>
							<span
								v-if="genre.bookCount > 0"
								class="ml-1 text-sm font-light text-black/60 underline decoration-dotted select-none"
								>{{ genre.bookCount ?? 0 }}
								{{ getBookNoun(genre.bookCount ?? 0) }}</span
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
				:key="category.translitName"
				class="inline-block w-full pl-4 sm:pl-[40px] lg:pl-[60px] pb-[30px]"
			>
				<a
					class="text-black hover:text-black/60 transition-all break-words duration-200 text-sm sm:text-xl font-semibold font-main mb-5"
					:href="'/genre/' + category.translitName"
					>{{ category.name }}</a
				>
				<ul class="mt-2">
					<li
						v-for="genre in category.genres.slice(0, 5)"
						:key="genre.translitName"
						class="mb-1.5 lg:mb-0"
					>
						<a
							:title="
								genre.bookCount > 0
									? (genre.bookCount ?? 0) +
									  ' ' +
									  getBookNoun(genre.bookCount ?? 0)
									: ''
							"
							class="mb-1 font-normal font-main hover:text-contrast text-black break-words transition-colors duration-300 text-xs sm:text-base"
							:href="'/genre/' + genre.translitName"
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
