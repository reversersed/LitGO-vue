<script lang="ts" setup>
import "../assets/variables.css"
import Carousel from "primevue/carousel";
import 'primevue/resources/themes/saga-blue/theme.css';


const responsiveOptions = {

}

const screens = [
    {
        name: "1",
        url: "https://www.litres.ru/static/imgb2/media/2024/6/9/00003099.webp"
    },
    {
        name: "2",
        url: "https://www.litres.ru/static/imgb2/media/2024/6/3/00003113.webp"
    }
]


</script>


<template>
    <div class="content-wrapper">
        <Carousel :value="screens" :numVisible="1" :numScroll="1" circular containerClass="flex items-center carousel"
            :autoplayInterval="3000">
            <template #item="slotProps">
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
                    <div class="mb-4">
                        <div class="relative mx-auto">
                            <img :src="slotProps.data.url" alt="" class="w-full rounded carousel-image">
                        </div>
                    </div>

                </div>

            </template>
        </Carousel>
    </div>
</template>


<style scoped>
.carousel-image {
    width: 100%;
    border-radius: 15px;
}
</style>