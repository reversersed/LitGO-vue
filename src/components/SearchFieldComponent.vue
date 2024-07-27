<script setup lang="ts">
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const query = ref("")
const routeQuery = computed(()=>route.query)
watch(routeQuery, newQuery => query.value = newQuery.query?.toString() ?? "")

interface book {
	id : string;
	name : string;
	cover : string;
}
interface author {
	id : string;
	name : string;
	profilePhoto : string;
}
const suggestionBooks = ref<book[]>([])
const suggestionAuthors = ref<author[]>([])
const suggestionOpen = ref(false)
let searchTimerId : number
const searchsuggestionBooks = async (query : string) => {
    clearTimeout(searchTimerId);

    searchTimerId = setTimeout(() => {
		if(query.length == 0) {
			setTimeout(() => {
				suggestionBooks.value = []
				suggestionAuthors.value = []
			}, 100)
			return
		}
		suggestionBooks.value = [{	
			id: "1",
			name: "Похождения дебилов",
			cover: "https://cv8.litres.ru/pub/c/cover_330/70920784.webp"
		},
		{
			id: "2",
			name:"Как раскидывать смоки на мираже: полный туториал для идиотов",
			cover: "https://cv6.litres.ru/pub/c/cover_330/70894063.webp"
		}]
		suggestionAuthors.value = [{
			id: "01",
			name: "Леонид Каневский",
			profilePhoto: "https://th.bing.com/th/id/R.fb5874a08bc16b07b77813f68f035511?rik=5vqZEExXKhRR0Q&pid=ImgRaw&r=0"
		},
		{
			id: "02",
			name: "Альбина Сексова",
			profilePhoto: "https://th.bing.com/th/id/OIP.p7PXDFX4biClgTGktYZX5gHaHa?rs=1&pid=ImgDetMain"
		}]
    }, 200);
}
const searchRedirect = () => {
	window.location.replace('/search'+(query.value.length > 0 ? '?query='+query.value : ''))
}
</script>

<template>
	<div
		class="z-50 bg-white rounded-2xl border-2 w-[75%] md:w-auto mr-[36px] sm:mr-0 border-mainshadow flex sm:min-w-[100px] md:min-w-[300px] items-center h-10 lg:h-12 lg:relative absolute top-1 lg:left-0 left-0 sm:left-[15%] lg:top-0"
	>
		<input
			placeholder="Искать на LitGO"
			type="text"
			:value="query"
			@input="async event =>{
				query = (event.target as HTMLInputElement).value
				await searchsuggestionBooks(query)	
			}"
			name=""
			@focusin="() => suggestionOpen = true"
			@focusout="() => suggestionOpen = false"
			@keyup.enter="searchRedirect"
			id=""
			class="z-50 border-0 outline-none p-1 lg:p-2 pl-4 w-full rounded-xl flex-1 font-sans font-medium text-base text-accent focus:placeholder:opacity-50"
		/>
		
		<a class="h-full w-fit" :href="'/search'+(query.length > 0 ? '?query='+query : '')">
			<button
				class="z-50 h-full w-fit px-2 lg:px-6 border-0 bg-mainshadow text-maintext rounded-xl rounded-tl-xl rounded-bl-xl cursor-pointer hover:bg-mainbg"
			>
				<FontAwesomeIcon :icon="faSearch" size="lg"/>
			</button>
		</a>
	</div>
	<div class="absolute mt-2 shadow-sm shadow-black flex flex-col transition-all ease-in-out duration-200 w-auto max-w-[90%] sm:max-w-[70%] h-auto max-h-[90%] overflow-y-auto overflow-x-hidden bg-white rounded z-50 p-5" :class="[suggestionOpen && suggestionBooks.length > 0 && query.length > 0 ? 'visible opacity-100' : 'collapse opacity-0']">
		<h1 v-if="suggestionBooks.length > 0" class="text-xl ml-2">Произведения</h1>
		<div v-for="book in suggestionBooks">
			<a class="cursor-pointer no-underline text-accent h-auto w-full" :key="book.id" :href="'/book/'+book.id">
				<div class="flex flex-1 w-full h-auto px-2 py-4 hover:bg-accent/10 rounded-xl transition-colors duration-200">
					<img :src="book.cover" class="rounded max-w-[30%] md:max-w-[20%] object-cover sm:block hidden"/>
					<div class="flex ml-2 max-w-[70%] w-fit flex-col">
						<h2 class="flex-wrap">{{ book.name }}</h2>
					</div>
				</div>
			</a>
		</div>

		<h1 v-if="suggestionAuthors.length > 0" class="text-xl ml-2">Авторы</h1>
		<div v-for="author in suggestionAuthors">
			<a class="cursor-pointer no-underline text-accent h-auto w-full" :key="author.id" :href="'/author/'+author.id">
				<div class="flex flex-1 w-full h-auto px-2 py-4 hover:bg-accent/10 rounded-xl transition-colors duration-200">
					<img :src="author.profilePhoto" class="rounded-full max-w-[40%] w-24 overflow-hidden h-24 max-h-80 md:max-w-[20%] object-cover sm:block hidden"/>
					<div class="flex ml-2 max-w-[60%] w-fit">
						<h2 class="flex-wrap">{{ author.name }}</h2>
					</div>
				</div>
			</a>
		</div>
	</div>	
</template>
