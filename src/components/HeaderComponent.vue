<script lang="ts" setup>
import SearchFieldComponent from "@/components/SearchFieldComponent.vue";
import {
	faBars,
	faBook,
	faBookBookmark,
	faBookReader,
	faCartShopping,
	faClose,
	faHome,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import UserHttpService from "@/service/HttpService/userHttpService";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import CatalogueComponent from "@/components/CatalogueComponent.vue";
import SkeletonPlaceholder from "./SkeletonPlaceholder.vue";
import LoginForm from "./LoginForm.vue";
import { useUser } from "@/service/plugins/userStatePlugin";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const logoutUser = async (e : Event) => {
	e.preventDefault()
	logoutAttemptingState.value = true
	await new UserHttpService().logout().then(() => reloadPage())
}
const userState = useUser();
const sideMenuOpen = ref(false);
const catalogueOpen = ref(false);
const loginModalOpen = ref(false);
const logoutModalOpen = ref(false);
const reloadPage = () => (window.location.href = window.location.href);
const loginAttemptingState = ref(false);
const loginAttempingStateHandle = (state: boolean) =>
	(loginAttemptingState.value = state);
const logoutAttemptingState = ref(false);
const setCatalogue = (open: boolean) => {
	catalogueOpen.value = open;
	sideMenuOpen.value = false;
};
const setSideMenu = (open: boolean) => {
	catalogueOpen.value = false;
	sideMenuOpen.value = open;
};
const setLoginModal = (open: boolean) => {
	if (!loginAttemptingState.value) loginModalOpen.value = open;
};
const setLogoutModal = (open: boolean) => {
	if (!logoutAttemptingState.value) logoutModalOpen.value = open;
};
const Links = [
	{
		link: "/",
		label: "Главная",
		icon: faHome,
		visible: true,
		addClass: "flex sm:hidden",
	},
	{
		link: "/",
		label: "Отложенные",
		icon: faBookBookmark,
		visible: userState?.isAuthorized,
	},
	{
		link: "/",
		label: "Корзина",
		icon: faCartShopping,
		visible: userState?.isAuthorized,
	},
	{
		link: "/",
		label: "Мои книги",
		icon: faBookReader,
		visible: userState?.isAuthorized,
	},
	{
		// Modal for large screens
		action: setLoginModal,
		addClass: "hidden sm:flex",
		label: "Войти",
		icon: faUser,
		visible: !userState?.isAuthorized,
	},
	{
		// Page for small screens
		link: "/login",
		addClass: "flex sm:hidden",
		label: "Войти",
		icon: faUser,
		visible: !userState?.isAuthorized,
	},
	{
		action: setLogoutModal,
		label: "Выйти",
		icon: faUser,
		visible: userState?.isAuthorized,
	},
];
</script>

<template>
	<!-- logout modal -->
	<div
		class="absolute z-[1000] w-dvw h-dvh flex flex-row items-center justify-center"
		v-if="logoutModalOpen"
	>
		<div
			class="w-full h-full absolute bg-mainblack/80 top-0"
			@click="() => setLogoutModal(false)"
		/>
		<div
			class="bg-mainwhite z-10 -translate-y-20 max-w-[300px] xl:max-w-[500px] px-[30px] rounded-2xl flex grow-[1] pb-5 flex-col items-center justify-center"
		>
			<a
				:class="loginAttemptingState ? '' : 'hover:rotate-180 cursor-pointer'"
				class="self-end mt-2 -mr-4 transition-all duration-300 z-50"
				><FontAwesomeIcon
					:icon="faClose"
					size="xl"
					:class="loginAttemptingState ? 'text-mainblack/40' : 'text-mainblack'"
					@click="() => setLogoutModal(false)"
			/></a>
			<h1
				class="mb-5 text-xl text-mainblack font-semibold tracking-wider font-main"
				:class="loginAttemptingState ? 'text-accent/40' : 'text-accent'"
			>
				Выход
			</h1>
			<span class="text-mainblack text-center mb-5"
				>Для подтверждения действия нажмите кнопку ниже</span
			>
			<input
			type="submit"
			@click="logoutUser"
			:value="!logoutAttemptingState ? 'Выйти из аккаунта' : ''"
            :disabled="logoutAttemptingState"
			class="enabled:cursor-pointer w-fit px-6 py-1 bg-error/80 enabled:hover:bg-error enabled:hover:tracking-widest text-maintext rounded-xl transition-all duration-300"
		><FontAwesomeIcon
			:icon="faSpinner"
			spin-pulse
			size="xl"
			class="text-maintext -mt-7 select-none"
            v-if="logoutAttemptingState"
		/></input>
		</div>
	</div>
	<!-- login modal -->
	<div
		class="absolute z-[1000] w-dvw h-dvh flex flex-row items-center justify-center"
		v-if="loginModalOpen"
	>
		<div
			class="w-full h-full absolute bg-mainblack/80 top-0"
			@click="() => setLoginModal(false)"
		/>
		<div
			class="bg-mainwhite z-10 -translate-y-20 max-w-[300px] xl:max-w-[500px] px-[30px] rounded-2xl flex grow-[1] pb-5 flex-col items-center justify-center"
		>
			<a
				:class="loginAttemptingState ? '' : 'hover:rotate-180 cursor-pointer'"
				class="self-end mt-2 -mr-4 transition-all duration-300 z-50"
				><FontAwesomeIcon
					:icon="faClose"
					size="xl"
					:class="loginAttemptingState ? 'text-mainblack/40' : 'text-mainblack'"
					@click="() => setLoginModal(false)"
			/></a>
			<h1
				class="mb-5 text-xl font-semibold tracking-wider font-main"
				:class="loginAttemptingState ? 'text-accent/40' : 'text-accent'"
			>
				Авторизация
			</h1>
			<LoginForm
				v-on:success="() => reloadPage()"
				@login-attempting="loginAttempingStateHandle"
			/>
		</div>
	</div>
	<!-- main block -->
	<header
		class="z-50 pl-2 flex flex-col lg:flex-row lg:items-center justify-center lg:pr-[10%] lg:pl-[10%] h-12 lg:h-16 bg-mainbg font-semibold"
	>
		<div class="z-50 flex flex-row w-full lg:w-auto justify-center h-full">
			<h1
				class="text-maintext m-0 font-main pt-2 pl-2 text-xl lg:p-0 tracking-[2px] lg:my-auto h-fit sm:block hidden"
			>
				<a class="no-underline text-maintext" href="/">LitGO</a>
			</h1>
			<div class="block">
				<button
					@click="setCatalogue(!catalogueOpen)"
					:class="catalogueOpen ? 'bg-mainshadow' : 'bg-accent'"
					class="transition-colors duration-200 z-[100] lg:min-w-[110px] p-2 text-sm lg:px-5 lg:py-3 m-1.5 border-0 rounded-xl cursor-pointer lg:m-2.5 text-maintext lg:text-sm font-semibold font-main hover:bg-neutral-700"
				>
					<FontAwesomeIcon
						:icon="catalogueOpen ? faClose : faBook"
						size="1x"
						class="mr-[2px]"
					/>
					<span class="hidden lg:contents">Каталог</span>
				</button>
				<div
					v-if="catalogueOpen"
					class="absolute w-full lg:min-h-[calc(100%-64px)] min-h-[calc(100%-48px)] z-50 lg:top-16 top-12 left-0"
				>
					<Suspense suspensible>
						<template #default>
							<CatalogueComponent />
						</template>
						<template #fallback>
							<div
								class="w-full h-auto min-h-[60%] bg-maintext flex flex-col justify-center items-center z-[100] relative"
							>
								<div
									class="w-[90%] h-full sm:columns-3 md:columns-4 columns-2 mt-[30px]"
								>
									<div
										v-for="index in 8"
										:key="index"
										class="inline-block w-full lg:pl-[60px] pb-[30px]"
									>
										<SkeletonPlaceholder />
										<ul class="mt-4">
											<li class="mb-1"><SkeletonPlaceholder /></li>
											<li class="mb-1"><SkeletonPlaceholder /></li>
											<li class="mb-1"><SkeletonPlaceholder /></li>
											<li class="mb-1"><SkeletonPlaceholder /></li>
											<li class="mb-1"><SkeletonPlaceholder /></li>
										</ul>

										<p
											class="mt-1 underline decoration-dotted hover:text-contrast text-mainblack/50 font-normal transition-colors duration-300 text-xs sm:text-base"
										>
											<SkeletonPlaceholder />
										</p>
									</div>
								</div>
								<div
									class="flex mt-auto justify-center py-2 bg-accent/20 w-full"
								>
									<SkeletonPlaceholder width="160px" />
								</div>
							</div>
						</template>
					</Suspense>
					<div
						class="bg-mainblack/50 w-full h-full top-0 absolute"
						@click="setCatalogue(false)"
					/>
				</div>
			</div>
			<button
				class="lg:hidden ml-auto mr-2 my-auto"
				@click="setSideMenu(!sideMenuOpen)"
			>
				<FontAwesomeIcon
					v-if="!sideMenuOpen"
					:icon="faBars"
					class="text-maintext"
					size="xl"
				/>
				<FontAwesomeIcon
					v-if="sideMenuOpen"
					:icon="faClose"
					class="text-maintext"
					size="xl"
				/>
			</button>
		</div>

		<div class="flex-1 pr-[2%] h-auto">
			<SearchFieldComponent />
		</div>
		<div
			class="bg-mainbg lg:left-0 top-8 w-full mt-2 mb-1 lg:top-0 lg:w-auto z-40 flex flex-col absolute lg:bg-transparent lg:flex-row lg:relative duration-800 transition-all ease-in"
			:class="[sideMenuOpen ? 'left-0' : '-left-full']"
		>
			<div v-for="link in Links" class="text-maintext">
				<a
					v-if="link.visible"
					class="font-normal px-2 py-2 hover:text-accent hover:font-semibold lg:hover:text-maintext lg:hover:font-normal lg:hover:bg-accent/30 rounded-md transition-all m-2.5 text-md lg:w-15 xl:w-18 items-center font-main no-underline cursor-pointer flex lg:flex-col"
					:href="link.link"
					:class="link.addClass === undefined ? '' : link.addClass"
					v-on:click="() => link.action && link.action(true)"
				>
					<FontAwesomeIcon
						class="w-8 mr-2 -ml-2 h-7 lg:h-5 xl:h-5 lg:w-auto lg:m-0"
						:icon="link.icon"
						size="xl"
					/>
					<span class="text-base lg:text-xs xl:text-sm">{{ link.label }}</span>
				</a>
			</div>
		</div>
	</header>
</template>
