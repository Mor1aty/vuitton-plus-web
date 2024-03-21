import axios from "axios";
import {showFailToast, showLoadingToast} from "vant";
import {ref} from "vue";

const apiUrl = ref(import.meta.env.VITE_API_URL);

console.log(import.meta.env.VITE_API_URL)

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000
});

instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response.data);
        }
    },
    error => {
        console.log("请求异常: ", error)
        return Promise.reject(error)
    }
);

export const apiSend = (url, method, param) => {
    return () => instance.request({
        url: url,
        method: method,
        data: param,
    });
}
export const apiGet = (url) => {
    return apiSend(url, "GET", null);
}

export const apiPost = (url, param) => {
    return apiSend(url, "POST", param);
}

export const SUCCESS_CODE = 200;

export const apiSendWrapFunc = async (apiFunc, dataFunc) => {
    const loading = showLoadingToast({
        message: '加载中...',
        forbidClick: true,
    });

    const {code, msg, data} = await apiFunc();
    if (code !== SUCCESS_CODE) {
        loading.close();
        showFailToast(msg);
        return;
    }
    dataFunc(data);
    loading.close();
}
