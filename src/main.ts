import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style/common.css";
import { registerScrollSpy } from "vue3-scroll-spy";
import store from "./store";

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
app.use(store);
registerScrollSpy(app);
