import {apiGet, apiPost} from "@/request/request.js";

const prefix = "common/";

export const apiInfo = () => {
    return apiGet(prefix + "info");
}

export const apiSetting = () => {
    return apiGet(prefix + "setting");
}

export const apiUpdateSetting = (param) => {
    return apiPost(prefix + "updateSetting", param);
}