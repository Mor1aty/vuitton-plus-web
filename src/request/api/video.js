import {apiPost} from "@/request/request.js";

const prefix = "video/";

export const apiImportVideo = (param) => {
    return apiPost(prefix + "importVideo", param);
}

export const apiFindVideo = (param) => {
    return apiPost(prefix + "findVideo", param);
}

export const apiFindEpisode = (param) => {
    return apiPost(prefix + "findEpisode", param);
}

export const apiFindAroundEpisode = (param) => {
    return apiPost(prefix + "findAroundEpisode", param);
}

export const apiFindPlayHistory = (param) => {
    return apiPost(prefix + "findPlayHistory", param);
}

export const apiInsertPlayHistory = (param) => {
    return apiPost(prefix + "insertPlayHistory", param);
}
