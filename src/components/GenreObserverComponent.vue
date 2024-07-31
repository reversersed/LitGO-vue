<script lang="ts" setup>
import categoryHttpService from '@/service/HttpService/categoryHttpService';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const service = new categoryHttpService();
const categories = await service.getAll();
</script>

<template>
    <div class="h-auto w-full px-[2%] md:pl-[6%] md:pr-[2%] py-8 flex flex-col flex-1">
        <span class="text-black font-bold font-main text-xl md:text-3xl mb-2 md:mb-4">Жанры</span>
        <div v-for="category in categories" class="mb-2 mt-4 flex flex-col">
            <a :href="'/genre/'+category.translitName" class="hover:text-contrast transition-colors duration-200 w-fit cursor-pointer font-semibold font-main text-lg md:text-xl">{{ category.name }} <FontAwesomeIcon size="1x" class="ml-1 font-normal" :icon="faAngleRight"/></a>
            <div class="flex flex-row flex-wrap break-words w-full h-auto mt-2">
                <a :href="'/genre/'+genre.translitName" v-for="genre in category.genres" class="cursor-pointer mr-4 md:mr-8 mb-1 md:mb-2 text-sm md:text-base sm:font-semibold text-contrast hover:text-contrast/60"><span class="transition-all duration-200">{{ genre.name }}</span><span class="font-main !text-black/60 ml-1">{{ genre.bookCount }}</span></a>
            </div>
        </div>
    </div>
</template>