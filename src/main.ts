import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { userStatePlugin } from "./service/plugins/userStatePlugin";

const app = createApp(App);

app.use(userStatePlugin);
app.use(router);
app.use(PrimeVue);
app.mount("#app");
