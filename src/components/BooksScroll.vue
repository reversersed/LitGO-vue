<script lang="ts" setup>
import BookHttpService from "@/service/HttpService/bookHttpService";

const props = defineProps<{
	title: string;
}>();

const BookService = new BookHttpService();
const books = await BookService.getAll();
</script>

<template>
	<div class="books-scroll-wrapper">
		<div class="title">
			<h2>{{ props.title }}</h2>
			<button>></button>
		</div>
		<div class="books-previews">
			<div class="book-preview" v-for="book in books"></div>
		</div>
	</div>
</template>
