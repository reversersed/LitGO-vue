<script setup lang="ts">
import Carousel from "primevue/carousel";

const sleep = async () => {
    await new Promise( (resolve) => setTimeout(resolve, 1000));
    return [
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
};
const screens = await sleep()
</script>

<template>
    <Carousel
		v-if="screens.length > 0"
		class="w-full"
		:value="screens"
		:numVisible="1"
		:numScroll="1"
		circular
		containerClass="flex items-center carousel"
		:autoplayInterval="3000"
	>
		<template #item="slotProps">
			<div class="relative mx-auto rounded">
			    <a :href="slotProps.data.link">
					<img
						:src="slotProps.data.url"
						alt=""
						class="w-full rounded carousel-image object-fill"
					/>
				</a>
        	</div>
		</template>
		</Carousel>
</template>