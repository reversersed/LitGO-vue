<script lang="ts" setup>
import MainOfferBlock from "@/components/MainOfferBlock.vue";
import SkeletonPlaceholder from "@/components/SkeletonPlaceholder.vue";
import "primevue/resources/themes/saga-blue/theme.css";

const responsiveOptions = {};


</script>

<template>
	<div class="hidden md:flex px-[5%] max-h-[45vh] mb-3 mt-3 flex-col justify-center">
		<Suspense>
			<template #fallback>
				<div class="rounded relative h-[15vh] lg:h-[25vh] xl:h-[45vh] w-full mx-auto px-[2%]">
					<SkeletonPlaceholder height="95%" width="100%" borderRadius="6px"/>
				</div>
			</template>
			<template #default>
				<MainOfferBlock/>
			</template>
		</Suspense>
	</div>
</template>
