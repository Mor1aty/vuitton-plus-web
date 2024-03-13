import {apiPost} from "@/request/request.js";

const prefix = "novel/local/";

export const apiFindNovel = (param) => {
    return apiPost(prefix + "findNovel", param);
}

export const apiFindChapter = (param) => {
    return apiPost(prefix + "findChapter", param);
}

export const apiFindAroundChapter = (param) => {
    return apiPost(prefix + "findAroundChapter", param);
}

export const apiDeleteNovel = (param) => {
    return apiPost(prefix + "deleteNovel", param);
}

export const apiFindReadHistory = (param) => {
    return apiPost(prefix + "findReadHistory", param);
}

export const apiInsertReadHistory = (param) => {
    return apiPost(prefix + "insertReadHistory", param);
}
