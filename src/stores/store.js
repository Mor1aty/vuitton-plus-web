import {defineStore} from 'pinia'

export const useServerInfo
    = defineStore("serverInfo", {
    state: () => {
        return {
            fileServerUrl: "",
            fileServerUploadUrl: "",
            novelDownloaderList: "",
        };
    }
});

export const useNovelLocal
    = defineStore("novelLocal", {
    state: () => {
        return {
            searchName: "",
            novel: {},
            readIndex: -1,
            historyBack: "",
        };
    }
});

export const useNovelActuator
    = defineStore("novelActuator", {
    state: () => {
        return {
            id: null,
            actuator: null,
        };
    }
});

export const useVideo
    = defineStore("video", {
    state: () => {
        return {
            searchName: "",
            video: {},
            playIndex: -1,
            historyBack: "",
        };
    }
});
