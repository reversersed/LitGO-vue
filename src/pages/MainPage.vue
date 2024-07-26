<script lang="ts" setup>
import Carousel from "primevue/carousel";
import "primevue/resources/themes/saga-blue/theme.css";

const responsiveOptions = {};

const screens = [
	{
		name: "1",
		link: "/",
		url: "https://www.litres.ru/static/imgb2/media/2024/6/9/00003099.webp",
	},
	{
		name: "2",
		link: "/",
		url: "https://www.litres.ru/static/imgb2/media/2024/6/3/00003113.webp",
	},
];
</script>

<template>
	<div class="content-wrapper">
		<Carousel
			class="w-full object-center pr-[5%] pl-[5%]"
			:value="screens"
			:numVisible="1"
			:numScroll="1"
			circular
			containerClass="flex items-center carousel"
			:autoplayInterval="3000"
		>
			<template #item="slotProps">
				<div class="rounded m-2 p-4">
					<div class="mb-4">
						<div class="relative mx-auto">
							<a :href="slotProps.data.link">
								<img
									:src="slotProps.data.url"
									alt=""
									class="w-full rounded carousel-image"
								/>
							</a>
						</div>
					</div>
				</div>
			</template>
		</Carousel>
	</div>
</template>
