import {apiGet} from "@/request/request.js";

const prefix = "common/";

export const apiCommonInfo = () => {
    return apiGet(prefix + "info");
}