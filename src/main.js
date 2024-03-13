import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import {apiCommonInfo} from "@/request/api/common.js";
import {SUCCESS_CODE} from "@/request/request.js";
import {useServerInfo} from "@/stores/store.js";
import "./main.css"
import Vant from "vant";
import 'vant/lib/index.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
app.use(Vant);

const init = async () => {
    const {code, msg, data} = await apiCommonInfo()();
    if (code !== SUCCESS_CODE) {
        console.log("初始化失败, ", msg)
    } else {
        useServerInfo().$patch({
            fileServerUrl: data.fileServerUrl,
            fileServerUploadUrl: data.fileServerUploadUrl,
            novelDownloaderList: data.novelDownloaderList,
        });
    }
};

init().catch();
