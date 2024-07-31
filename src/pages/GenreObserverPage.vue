<script lang="ts" setup>
import GenreObserverComponent from '@/components/GenreObserverComponent.vue';
import SkeletonPlaceholder from '@/components/SkeletonPlaceholder.vue';
</script>

<template>
    <Suspense>
        <GenreObserverComponent/>
        <template #fallback>
            <div class="h-auto w-full px-[2%] md:pl-[6%] md:pr-[2%] py-8 flex flex-col flex-1">
                <span class="text-black font-bold font-main text-xl md:text-3xl mb-2 md:mb-4">
                    <SkeletonPlaceholder class="hidden md:block" height="30px" width="120px" borderRadius="5px"/>
                    <SkeletonPlaceholder class="block md:hidden" height="20px" width="80px" borderRadius="5px"/>
                </span>
                <div v-for="idx in 6" class="mb-2 mt-4 flex flex-col">
                    <a class="hover:text-contrast transition-colors duration-200 w-fit font-semibold font-main text-lg md:text-xl">
                        <SkeletonPlaceholder height="20px" width="180px" borderRadius="5px"/>
                    </a>
                    <div class="flex flex-row flex-wrap break-words w-full h-auto mt-2">
                        <a v-for="index in Math.ceil(Math.random()*40)" :key="index" class="hidden md:block mr-4 md:mr-8 mb-1 md:mb-2 text-sm md:text-base sm:font-semibold text-contrast hover:text-contrast/60">
                            <SkeletonPlaceholder height="16px" width="120px" borderRadius="2px"/>
                        </a> 
                        <a v-for="index in Math.ceil(Math.random()*10)" :key="index" class="block md:hidden mr-4 md:mr-8 mb-1 md:mb-2 text-sm md:text-base sm:font-semibold text-contrast hover:text-contrast/60">
                            <SkeletonPlaceholder height="16px" width="120px" borderRadius="2px"/>
                        </a> 
                    </div>
                </div>
            </div>
        </template>
    </Suspense>
</template>