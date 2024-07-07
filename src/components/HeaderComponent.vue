<script lang="ts" setup>
import "../assets/variables.css";
import SearchFieldComponent from "../components/SearchFieldComponent.vue";
</script>

<template>
	<header>
		<div class="logo-wrapper">
			<h1><a class="silent-a" href="/">LitGO</a></h1>
		</div>

		<div class="catalog-wrapper">
			<button class="btn">Каталог</button>
			<div class="show-catalog"></div>
		</div>
		<div class="search-field-wrapper">
			<SearchFieldComponent />
		</div>
		<div class="buttons">
			<div class="icon-btn">Отложенные</div>
			<div class="icon-btn">Корзина</div>
			<div class="icon-btn">Мои книги</div>
			<div class="icon-btn">Войти</div>
		</div>
	</header>
</template>

<style scoped>
.silent-a {
	text-decoration: none;
	color: var(--main-text-color);
}
.icon-btn {
	color: var(--main-text-color);
	font-family: var(--main-font-style);
	cursor: pointer;
}

.icon-btn:hover {
	color: var(--accent-color);
}

header {
	display: flex;
	align-items: center;
	padding: 0px 10%;
}

h1 {
	color: #feffff;
	margin: 0px;
	font-family: var(--main-font-style);
}

header {
	height: 64px;
	background-color: #3aafa9;
}

.search-field-wrapper {
	flex: 1;
	padding: 0px 5%;
}

.catalog-wrapper button {
	border: 0px;
	background-color: #17252a;
	padding: 10px 25px;
	border-radius: 10px;
	cursor: pointer;
	margin: 10px;
	color: #feffff;
	font-size: 14px;
	font-weight: 600;
	font-family: var(--main-font-style);
}

.catalog-wrapper button:hover {
	background-color: var(--shadow-background-color);
}

header .buttons {
	display: flex;
}

header .buttons div {
	margin: 10px;
}
</style>
