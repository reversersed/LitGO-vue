<script setup lang="ts">
import UserHttpService from "@/service/HttpService/userHttpService";
import { OnUserLogin } from "@/service/plugins/userStatePlugin";
import { ref } from "vue";
import type { UserLoginModel } from "@/models/user.model";
import type HttpError from "@/models/httperror.model";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const loginAttempting = ref(false)
const emit = defineEmits(["success"]);
let formModel = ref<{
	login: string;
	password: string;
	errLogin: string | undefined;
	errPassword: string | undefined;
	errAttempt: string | undefined;
}>({
	login: "",
	password: "",
	errLogin: undefined,
	errPassword: undefined,
	errAttempt: undefined,
});
const service = new UserHttpService();
async function attempLogin(this: any, e: Event) {
	e.preventDefault();
    loginAttempting.value = true;
	formModel.value.errAttempt = undefined;
	if (formModel.value.login.length == 0)
		formModel.value.errLogin = "Требуется ввести логин";
	if (formModel.value.password.length == 0)
		formModel.value.errPassword = "Требуется ввести пароль";

	if (
		formModel.value.errLogin === undefined &&
		formModel.value.errPassword === undefined
	) {
		const response = await service.login(
			formModel.value.login,
			formModel.value.password
		);
		if (<HttpError>response) {
			formModel.value.errAttempt = "Неправильный логин или пароль";
		} else {
			OnUserLogin(response as UserLoginModel);
			emit("success");
		}
	}
    loginAttempting.value = false;
}
</script>

<template>
	<form @submit="attempLogin" class="flex flex-col gap-5 w-full items-center">
		<div class="flex flex-col w-full">
			<input
				type="text"
				class="disabled:border-mainblack/40 disabled:text-mainblack/40 peer border-spacing-2 border-2 rounded-md px-2 py-1 font-main text-accent z-10 bg-transparent outline-none focus:border-accent border-accent origin-center transition-all duration-200"
				id="login"
                :disabled="loginAttempting"
				v-model="formModel.login"
				:class="
					formModel.errLogin !== undefined
						? 'border-error text-error placeholder-shown:text-error placeholder-shown:border-error focus:border-error'
						: 'placeholder-shown:border-mainblack/40'
				"
				@input="() => (formModel.errLogin = undefined)"
				placeholder=" "
			/>
			<label
				for="login"
				class="absolute peer-disabled:text-mainblack/40 peer-placeholder-shown:translate-y-[5px] translate-x-[9px] font-main peer-placeholder-shown:text-accent/50 bg-mainwhite w-fit select-none peer-placeholder-shown:z-0 transition-all duration-200 text-accent -translate-y-[10px] z-20 peer-placeholder-shown:px-0 px-1 peer-placeholder-shown:text-base text-sm peer-focus:text-accent peer-focus:-translate-y-[10px] peer-focus:z-20 peer-focus:px-1 peer-focus:text-sm"
				:class="
					formModel.errLogin !== undefined
						? 'text-error peer-placeholder-shown:text-error peer-focus:text-error'
						: ''
				"
				>Логин или почта</label
			>
			<p
				v-if="formModel.errLogin !== undefined"
				class="text-sm text-error ml-2 -mt-[2px] select-none"
			>
				{{ formModel.errLogin }}
			</p>
		</div>
		<div class="flex flex-col w-full">
			<input
				type="password"
                :disabled="loginAttempting"
				class="disabled:border-mainblack/40 disabled:text-mainblack/40 peer border-spacing-2 border-2 rounded-md px-2 py-1 font-main text-accent z-10 bg-transparent outline-none focus:border-accent border-accent origin-center transition-all duration-200"
				id="password"
				v-model="formModel.password"
				placeholder=" "
				:class="
					formModel.errPassword !== undefined
						? 'border-error text-error placeholder-shown:border-error placeholder-shown:text-error focus:border-error'
						: 'placeholder-shown:border-mainblack/40'
				"
				@input="() => (formModel.errPassword = undefined)"
			/>
			<label
				for="password"
				class="absolute peer-disabled:text-mainblack/40 peer-placeholder-shown:translate-y-[5px] translate-x-[9px] font-main peer-placeholder-shown:text-accent/50 bg-mainwhite w-fit select-none peer-placeholder-shown:z-0 transition-all duration-200 text-accent -translate-y-[10px] z-20 peer-placeholder-shown:px-0 px-1 peer-placeholder-shown:text-base text-sm peer-focus:text-accent peer-focus:-translate-y-[10px] peer-focus:z-20 peer-focus:px-1 peer-focus:text-sm"
				:class="
					formModel.errPassword !== undefined
						? 'text-error peer-placeholder-shown:text-error peer-focus:text-error'
						: ''
				"
				>Пароль</label
			>
			<p
				v-if="formModel.errPassword !== undefined"
				class="text-sm text-error ml-2 -mt-[2px] select-none"
			>
				{{ formModel.errPassword }}
			</p>
		</div>
		<p v-if="formModel.errAttempt" class="text-sm text-error -mt-5">
			{{ formModel.errAttempt }}
		</p>
		<input
			type="submit"
			:value="!loginAttempting ? 'Войти' : ''"
            :disabled="loginAttempting"
			class="enabled:cursor-pointer w-fit px-6 py-1 bg-mainshadow/80 enabled:hover:bg-mainbg enabled:hover:tracking-widest text-maintext rounded-xl transition-all duration-300"
		><FontAwesomeIcon
			:icon="faSpinner"
			spin-pulse
			size="xl"
			class="text-maintext -mt-12 select-none"
            v-if="loginAttempting"
		/></input>
	</form>
</template>
