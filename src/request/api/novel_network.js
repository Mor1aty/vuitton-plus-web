import {apiPost} from "@/request/request.js";

const prefix = "novel/network/";

export const apiActuatorDownload = (param) => {
    return apiPost(prefix + "actuatorDownload", param);
}

export const apiActuatorSnapshot = (param) => {
    return apiPost(prefix + "actuatorSnapshot", param);
}

export const apiActuatorSnapshotStepData = (param) => {
    return apiPost(prefix + "actuatorSnapshotStepData", param);
}

export const apiActuatorInterrupt = (param) => {
    return apiPost(prefix + "actuatorInterrupt", param);
}

export const apiActuatorDelete = (param) => {
    return apiPost(prefix + "actuatorDelete", param);
}