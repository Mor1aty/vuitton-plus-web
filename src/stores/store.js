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

export const useSetting
    = defineStore("setting", {
    state: () => {
        return {
            videoPlayer: {}
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

export const useNovelDownloadActuator
    = defineStore("novelDownloadActuator", {
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
            continueSecond: null,
        };
    }
});

export const useNovelDownloadActuatorAdd
    = defineStore("novelDownloadActuatorAdd", {
    state: () => {
        return {
            downloaderMark: ""
        };
    }
});
