import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import {apiInfo, apiSetting} from "@/request/api/common.js";
import {SUCCESS_CODE} from "@/request/request.js";
import {useServerInfo, useSetting} from "@/stores/store.js";
import Vant from "vant";
import 'vant/lib/index.css';
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import "./assets/font.css"
import "./main.css"

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Vant);
app.use(Varlet);
app.mount('#app');

const initInfo = async () => {
    const {code, msg, data} = await apiInfo()();
    if (code !== SUCCESS_CODE) {
        console.log("初始化失败, ", msg);
    } else {
        useServerInfo().$patch({
            fileServerUrl: data.fileServerUrl,
            fileServerUploadUrl: data.fileServerUploadUrl,
            novelDownloaderList: data.novelDownloaderList,
        });
    }
};

const initSetting = async () => {
    const {code, msg, data} = await apiSetting()();
    if (code !== SUCCESS_CODE) {
        console.log("初始化失败, ", msg);
    } else {
        useSetting().$patch(data);
    }
};

const init = async () => {
    await initInfo();
    await initSetting();
};

init().catch();
