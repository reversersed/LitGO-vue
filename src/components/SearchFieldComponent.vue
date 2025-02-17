<script setup lang="ts">
import type Author from "@/models/author.model";
import type Book from "@/models/book.model";
import BookFileService from "@/service/FileService/bookFileService";
import AuthorHttpService from "@/service/HttpService/authorHttpService";
import BookHttpService from "@/service/HttpService/bookHttpService";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const query = ref("");
const routeQuery = computed(() => route.query);
watch(
	routeQuery,
	(newQuery) => (query.value = newQuery.query?.toString() ?? "")
);
let authorService = new AuthorHttpService();
let bookService = new BookHttpService();
let bookFileService = new BookFileService();

const suggestionBooks = ref<Book[]>([]);
const suggestionAuthors = ref<Author[]>([]);
const suggestionOpen = ref(false);
let searchTimerId: number;
const searchsuggestionBooks = async (query: string) => {
	clearTimeout(searchTimerId);

	searchTimerId = setTimeout(async () => {
		if (query.length == 0) {
			setTimeout(() => {
				suggestionBooks.value = [];
				suggestionAuthors.value = [];
			}, 150);
			return;
		}
		suggestionBooks.value = await bookService.getSuggestion(query);
		suggestionAuthors.value = await authorService.getSuggestion(query);
	}, 500);
};
const searchRedirect = () => {
	window.location.replace(
		"/search" + (query.value.length > 0 ? "?query=" + query.value : "")
	);
};
</script>

<template>
	<div
		class="z-50 bg-mainwhite lg:w-auto rounded-2xl border-2 w-[70%] mr-[36px] sm:mr-0 border-mainshadow flex sm:min-w-[100px] md:min-w-[300px] items-center h-10 lg:h-12 lg:relative absolute top-1 lg:left-0 left-[15%] sm:left-[18%] lg:top-0"
	>
		<input
			placeholder="Искать на LitGO"
			type="text"
			:value="query"
			@input="
				async (event) => {
					query = (event.target as HTMLInputElement).value;
					await searchsuggestionBooks(query);
				}
			"
			name=""
			@focusin="() => (suggestionOpen = true)"
			@focusout="() => (suggestionOpen = false)"
			@keyup.enter="searchRedirect"
			id=""
			class="z-50 border-0 outline-none p-1 lg:p-2 pl-4 w-full rounded-xl flex-1 font-main font-medium text-base text-accent focus:placeholder:opacity-50 placeholder:transition-opacity placeholder:duration-500 placeholder:ease-in"
		/>

		<a
			class="h-full w-fit"
			:href="'/search' + (query.length > 0 ? '?query=' + query : '')"
		>
			<button
				class="z-50 h-full w-fit px-2 lg:px-6 border-0 bg-mainshadow text-maintext rounded-xl rounded-tl-xl rounded-bl-xl cursor-pointer hover:bg-mainbg transition-colors duration-300"
			>
				<FontAwesomeIcon :icon="faSearch" size="lg" />
			</button>
		</a>
	</div>
	<div
		class="absolute mt-2 ml-[3%] sm:ml-[16.5%] lg:ml-0 shadow-sm shadow-mainblack flex flex-col transition-all ease-in-out duration-200 w-auto max-w-[90%] sm:max-w-[70%] 2xl:max-w-[45%] lg:max-w-[50%] h-auto max-h-[90%] overflow-y-auto overflow-x-hidden bg-mainwhite rounded z-50 p-2"
		:class="[
			suggestionOpen &&
			(suggestionBooks.length > 0 || suggestionAuthors.length > 0) &&
			query.length > 0
				? 'visible opacity-100'
				: 'collapse opacity-0',
		]"
	>
		<h1
			v-if="suggestionBooks.length > 0 && suggestionAuthors.length > 0"
			class="text-lg sm:text-xl font-semibold sm:font-bold ml-2 mb-1 sm:mb-2"
		>
			Книги
		</h1>
		<div v-for="book in suggestionBooks" :key="book.id">
			<a
				class="cursor-pointer no-underline text-accent h-auto w-full"
				:key="book.translitname"
				:href="'/book/' + book.translitname"
			>
				<div
					class="flex flex-1 w-full h-auto px-2 py-2 sm:py-4 hover:bg-accent/10 rounded-xl transition-colors duration-200"
				>
					<img
						:src="bookFileService.getBookCoverPath(book.picture)"
						alt=""
						class="rounded-[5%] w-auto min-h-20 max-h-24 md:min-h-24 md:max-h-28 xl:min-h-28 xl:max-h-32 object-cover sm:block hidden"
					/>
					<div class="flex ml-2 max-w-full w-fit flex-col">
						<span class="flex-wrap font-normal sm:font-semibold">{{
							book.name
						}}</span>
						<p
							class="collapse h-0 sm:visible max-h-full max-w-fit sm:h-auto line-clamp-3 xl:line-clamp-4 font-normal text-ellipsis"
						>
							{{ book.description }}
						</p>
					</div>
				</div>
			</a>
		</div>

		<h1
			v-if="suggestionBooks.length > 0 && suggestionAuthors.length > 0"
			class="text-lg sm:text-xl font-semibold sm:font-bold ml-2 mt-2 mb-1 sm:mt-4 sm:mb-2"
		>
			Авторы
		</h1>
		<div v-for="author in suggestionAuthors" :key="author.id">
			<a
				class="cursor-pointer no-underline text-accent h-auto w-full"
				:key="author.translitname"
				:href="'/author/' + author.translitname"
			>
				<div
					class="flex w-full h-auto px-2 py-2 sm:py-4 hover:bg-accent/10 rounded-xl transition-colors duration-200"
				>
					<img
						:src="author.profilepicture"
						alt=""
						class="rounded-full min-w-14 md:min-w-24 h-14 md:h-24 object-cover sm:block hidden"
					/>
					<div class="flex flex-col ml-4 w-fit">
						<span class="flex-wrap font-normal sm:font-semibold">{{
							author.name
						}}</span>
						<p
							class="collapse h-0 sm:visible max-h-[78px] max-w-fit sm:h-auto line-clamp-2 md:line-clamp-3 font-normal text-ellipsis"
						>
							{{ author.about }}
						</p>
					</div>
				</div>
			</a>
		</div>
	</div>
</template>
