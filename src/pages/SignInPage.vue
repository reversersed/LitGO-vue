<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import UserHttpService from "@/service/HttpService/userHttpService";
import useRouter from "@/service/plugins/routerProvidePlugin";
import { OnUserLogin } from "@/service/plugins/userStatePlugin";
import type { UserLoginModel } from "@/models/user.model";
import { HttpCodes, isHttpError } from "@/models/httperror.model";
import type HttpError from "@/models/httperror.model";

const registerAttempting = ref(false);
const formModel = ref<{
	login: string;
	password: string;
	repeatPassword: string;
	email: string;
    rememberMe: boolean;
	errLogin: string[];
	errPassword: string[];
	errPasswordRepeat?: string;
	errEmail: string[];
}>({
	login: "",
	password: "",
	repeatPassword: "",
	email: "",
    rememberMe: false,
    errLogin: [],
	errPassword: [],
	errEmail: [],
});
const service = new UserHttpService();
const router = useRouter();
async function proceedRegistration(this: any, e : Event) {
    e.preventDefault()
    registerAttempting.value = true

    if(formModel.value.login.length == 0){
        formModel.value.errLogin = ["Требуется ввести логин"]
    }
    if(formModel.value.password.length == 0){
        formModel.value.errPassword = ["Требуется ввести пароль"]
    }
    if(formModel.value.repeatPassword !== formModel.value.password){
        formModel.value.errPasswordRepeat = "Пароли должны совпадать"
    }
    if(formModel.value.email.length == 0){
        formModel.value.errEmail = ["Требуется ввести почту"]
    }
    if(formModel.value.errEmail.length > 0 || formModel.value.errLogin.length > 0 || formModel.value.errPassword.length > 0 || formModel.value.errPasswordRepeat !== undefined)
    {
        registerAttempting.value = false
        return;
    }

    const response = await service.register(formModel.value.login, formModel.value.password, formModel.value.repeatPassword, formModel.value.email, formModel.value.rememberMe)
    
    if(isHttpError(response)) {
        const error = response as HttpError;
        console.log(error)
        switch(error.code) {
            case HttpCodes.AlreadyExist:
                error.details.map(d => {
                    switch(d.field){
                        case 'login':
                            formModel.value.errLogin.push("Логин занят")
                            break;
                        case 'email':
                            formModel.value.errEmail.push("Почта занята")
                            break;
                    }
                })
                break;
            case HttpCodes.InvalidArgument:
                error.details.map(d => {
                    switch(d.field){
                        case 'login':
                            switch(d.tag){
                                case 'min':
                                    formModel.value.errLogin.push("Логин должен быть не меньше "+d.tagValue+" символов")
                                    break;
                                case 'max':
                                    formModel.value.errLogin.push("Логин должен быть не больше "+d.tagValue+" символов")
                                    break;
                                case 'onlyenglish':
                                    formModel.value.errLogin.push("В логине присутствуют запрещенные символы")
                                    break;
                            }
                            break;
                        case 'password':
                            switch(d.tag){
                                case 'min':
                                    formModel.value.errPassword.push("Пароль должен быть не меньше "+d.tagValue+" символов")
                                    break;
                                case 'max':
                                    formModel.value.errPassword.push("Пароль должен быть не больше "+d.tagValue+" символов")
                                    break;
                                case 'lowercase':
                                    formModel.value.errPassword.push("Пароль должен содержать строчную букву")
                                    break;
                                case 'uppercase':
                                    formModel.value.errPassword.push("Пароль должен содержать заглавную букву")
                                    break;
                                case 'digitrequired':
                                    formModel.value.errPassword.push("Пароль должен содержать цифру")
                                    break;
                                case 'specialsymbol':
                                    formModel.value.errPassword.push("Пароль должен содержать специальный символ")
                                    break;
                            }
                            break;
                        case 'email':
                            switch(d.tag){
                                case 'email':
                                    formModel.value.errEmail.push("Укажите валидную почту")
                                    break;
                            }
                            break;
                    }
                })
                break;
        }
        registerAttempting.value = false
        return
    }

    OnUserLogin(response as UserLoginModel)
    router?.push("/");
}
</script>

<template>
	<div
		class="h-full flex flex-col self-center w-[200px] md:w-[300px] lg:w-[500px]"
	>
		<h1
			class="text-center w-full mt-[-50px] mb-[50px] font-main text-accent font-semibold text-2xl"
		>
			Форма регистрации
		</h1>
		<form @submit="proceedRegistration" class="gap-6 flex flex-col">
			<div class="flex flex-col w-full">
				<input
					type="text"
					class="disabled:border-mainblack/40 disabled:text-mainblack/40 peer border-spacing-2 border-2 rounded-md px-2 py-1 font-main text-accent z-10 bg-transparent outline-none focus:border-accent border-accent origin-center transition-all duration-200"
					id="login"
					:disabled="registerAttempting"
					v-model="formModel.login"
					:class="
						formModel.errLogin?.length > 0
							? 'border-error text-error placeholder-shown:text-error placeholder-shown:border-error focus:border-error'
							: 'placeholder-shown:border-mainblack/40'
					"
					@input="() => (formModel.errLogin = [])"
					placeholder=" "
				/>
				<label
					for="login"
					class="absolute peer-disabled:text-mainblack/40 peer-placeholder-shown:translate-y-[5px] translate-x-[9px] font-main peer-placeholder-shown:text-accent/50 bg-mainwhite w-fit select-none peer-placeholder-shown:z-0 transition-all duration-200 text-accent -translate-y-[10px] z-20 peer-placeholder-shown:px-0 px-1 peer-placeholder-shown:text-base text-sm peer-focus:text-accent peer-focus:-translate-y-[10px] peer-focus:z-20 peer-focus:px-1 peer-focus:text-sm"
					:class="
						formModel.errLogin.length > 0
							? 'text-error peer-placeholder-shown:text-error peer-focus:text-error'
							: ''
					"
					>Введите логин</label
				>
				<p
					:class="formModel.errLogin.length > 0 ? 'visible' : 'collapse'"
					v-for="message in formModel.errLogin"
					class="text-sm text-error ml-2 -mt-[2px] select-none"
				>
					{{ message }}
				</p>
			</div>
			<div class="flex flex-col w-full">
				<input
					type="text"
					class="disabled:border-mainblack/40 disabled:text-mainblack/40 peer border-spacing-2 border-2 rounded-md px-2 py-1 font-main text-accent z-10 bg-transparent outline-none focus:border-accent border-accent origin-center transition-all duration-200"
					id="password"
					:disabled="registerAttempting"
					v-model="formModel.password"
					:class="
						formModel.errPassword.length > 0
							? 'border-error text-error placeholder-shown:text-error placeholder-shown:border-error focus:border-error'
							: 'placeholder-shown:border-mainblack/40'
					"
					@input="() => (formModel.errPassword = [])"
					placeholder=" "
				/>
				<label
					for="password"
					class="absolute peer-disabled:text-mainblack/40 peer-placeholder-shown:translate-y-[5px] translate-x-[9px] font-main peer-placeholder-shown:text-accent/50 bg-mainwhite w-fit select-none peer-placeholder-shown:z-0 transition-all duration-200 text-accent -translate-y-[10px] z-20 peer-placeholder-shown:px-0 px-1 peer-placeholder-shown:text-base text-sm peer-focus:text-accent peer-focus:-translate-y-[10px] peer-focus:z-20 peer-focus:px-1 peer-focus:text-sm"
					:class="
						formModel.errPassword.length > 0
							? 'text-error peer-placeholder-shown:text-error peer-focus:text-error'
							: ''
					"
					>Введите пароль</label
				>
				<p
					:class="formModel.errPassword.length > 0 ? 'visible' : 'collapse'"
					v-for="message in formModel.errPassword"
					class="text-sm text-error ml-2 -mt-[2px] select-none"
				>
					{{ message }}
				</p>
			</div>
			<div class="flex flex-col w-full">
				<input
					type="password"
					class="disabled:border-mainblack/40 disabled:text-mainblack/40 peer border-spacing-2 border-2 rounded-md px-2 py-1 font-main text-accent z-10 bg-transparent outline-none focus:border-accent border-accent origin-center transition-all duration-200"
					id="repeatPassword"
					:disabled="registerAttempting"
					v-model="formModel.repeatPassword"
					:class="
						formModel.errPasswordRepeat !== undefined
							? 'border-error text-error placeholder-shown:text-error placeholder-shown:border-error focus:border-error'
							: 'placeholder-shown:border-mainblack/40'
					"
					@input="() => (formModel.errPasswordRepeat = undefined)"
					placeholder=" "
				/>
				<label
					for="repeatPassword"
					class="absolute peer-disabled:text-mainblack/40 peer-placeholder-shown:translate-y-[5px] translate-x-[9px] font-main peer-placeholder-shown:text-accent/50 bg-mainwhite w-fit select-none peer-placeholder-shown:z-0 transition-all duration-200 text-accent -translate-y-[10px] z-20 peer-placeholder-shown:px-0 px-1 peer-placeholder-shown:text-base text-sm peer-focus:text-accent peer-focus:-translate-y-[10px] peer-focus:z-20 peer-focus:px-1 peer-focus:text-sm"
					:class="
						formModel.errPasswordRepeat !== undefined
							? 'text-error peer-placeholder-shown:text-error peer-focus:text-error'
							: ''
					"
					>Повторите пароль</label
				>
				<p
					:class="formModel.errPasswordRepeat !== undefined ? 'visible' : 'collapse'"
					class="text-sm text-error ml-2 -mt-[2px] select-none"
				>
					{{ formModel.errPasswordRepeat }}
				</p>
			</div>
			<div class="flex flex-col w-full">
				<input
					type="text"
					class="disabled:border-mainblack/40 disabled:text-mainblack/40 peer border-spacing-2 border-2 rounded-md px-2 py-1 font-main text-accent z-10 bg-transparent outline-none focus:border-accent border-accent origin-center transition-all duration-200"
					id="email"
					:disabled="registerAttempting"
					v-model="formModel.email"
					:class="
						formModel.errEmail.length > 0
							? 'border-error text-error placeholder-shown:text-error placeholder-shown:border-error focus:border-error'
							: 'placeholder-shown:border-mainblack/40'
					"
					@input="() => (formModel.errEmail = [])"
					placeholder=" "
				/>
				<label
					for="password"
					class="absolute peer-disabled:text-mainblack/40 peer-placeholder-shown:translate-y-[5px] translate-x-[9px] font-main peer-placeholder-shown:text-accent/50 bg-mainwhite w-fit select-none peer-placeholder-shown:z-0 transition-all duration-200 text-accent -translate-y-[10px] z-20 peer-placeholder-shown:px-0 px-1 peer-placeholder-shown:text-base text-sm peer-focus:text-accent peer-focus:-translate-y-[10px] peer-focus:z-20 peer-focus:px-1 peer-focus:text-sm"
					:class="
						formModel.errEmail.length > 0
							? 'text-error peer-placeholder-shown:text-error peer-focus:text-error'
							: ''
					"
					>Введите почту</label
				>
				<p
					:class="formModel.errEmail.length > 0 ? 'visible' : 'collapse'"
					v-for="message in formModel.errEmail"
					class="text-sm text-error ml-2 -mt-[2px] select-none"
				>
					{{ message }}
				</p>
			</div>		
            <div class="flex flex-row gap-2 self-center">
			<input
				class="w-4 h-4 cursor-pointer disabled:cursor-default bg-mainbg select-none"
				type="checkbox"
				:disabled="registerAttempting"
				v-model="formModel.rememberMe"
				id="rememberMe"
			/>
			<label
				for="rememberMe"
				class="select-none font-main text-sm duration-150 -mt-[1px]"
				:class="
					registerAttempting
						? 'text-mainblack/30'
						: formModel.rememberMe
						? 'text-mainblack cursor-pointer'
						: 'text-mainblack/70 cursor-pointer'
				"
				>Запомнить меня</label
			>
		</div>
            <input
			type="submit"
			:value="!registerAttempting ? 'Отправить' : ''"
            :disabled="registerAttempting"
			class="self-center enabled:cursor-pointer w-fit px-6 py-1 bg-mainshadow/80 enabled:hover:bg-mainbg enabled:hover:tracking-widest text-maintext rounded-xl transition-all duration-300"
		><FontAwesomeIcon
			:icon="faSpinner"
			spin-pulse
			size="xl"
			class="text-maintext -mt-[52px] select-none"
            v-if="registerAttempting"
		/></input>
	</form>
	<p class="text-xs mt-2 select-none w-full text-center":class="registerAttempting?'text-accent/30':'text-accent/70'"><a :href="registerAttempting?undefined:'/'" :class="registerAttempting?'text-accent/30':'text-accent/80 hover:text-contrast'" class="transition-all duration-200">Вернуться на главную</a></p>
	</div>
</template>
