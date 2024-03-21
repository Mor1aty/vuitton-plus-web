import {createRouter, createWebHistory} from 'vue-router'
import Index from "@/views/Index.vue";
import Setting from "@/views/Setting.vue";
import NovelLocal from "@/views/novel/local/NovelLocal.vue";
import NovelNetwork from "@/views/novel/network/NovelNetwork.vue";
import Video from "@/views/video/Video.vue";
import NovelLocalInfo from "@/views/novel/local/NovelLocalInfo.vue";
import NovelLocalContent from "@/views/novel/local/NovelLocalContent.vue";
import NovelDownloadActuator from "@/views/novel/network/actuator/NovelDownloadActuator.vue";
import NovelDownloadActuatorInfo from "@/views/novel/network/actuator/NovelDownloadActuatorInfo.vue";
import NovelDownloadActuatorAdd from "@/views/novel/network/actuator/NovelDownloadActuatorAdd.vue";
import NovelDownloadActuatorStepData from "@/views/novel/network/actuator/NovelDownloadActuatorStepData.vue";
import VideoInfo from "@/views/video/VideoInfo.vue";
import VideoPlay from "@/views/video/VideoPlay.vue";
import NovelLocalHistory from "@/views/novel/local/NovelLocalHistory.vue";
import VideoHistory from "@/views/video/VideoHistory.vue";
import NovelDownloader from "@/views/novel/network/NovelDownloader.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/index"
        },
        {
            name: "index",
            path: "/index",
            component: Index,
        },
        {
            name: "setting",
            path: "/setting",
            component: Setting,
        },
        {
            name: "novelLocal",
            path: "/novel/local",
            component: NovelLocal,
        },
        {
            name: "novelLocalInfo",
            path: "/novel/local/info",
            component: NovelLocalInfo,
        },
        {
            name: "novelLocalContent",
            path: "/novel/local/content",
            component: NovelLocalContent,
        },
        {
            name: "novelLocalHistory",
            path: "/novel/local/history",
            component: NovelLocalHistory,
        },
        {
            name: "novelNetwork",
            path: "/novel/network",
            component: NovelNetwork,
        },
        {
            name: "novelDownloadActuator",
            path: "/novel/network/download-actuator",
            component: NovelDownloadActuator,
        },
        {
            name: "novelDownloadActuatorInfo",
            path: "/novel/network/download-actuator/info",
            component: NovelDownloadActuatorInfo,
        },
        {
            name: "novelDownloadActuatorAdd",
            path: "/novel/network/download-actuator/add",
            component: NovelDownloadActuatorAdd,
        },
        {
            name: "novelDownloadActuatorStepData",
            path: "/novel/network/download-actuator/step-data",
            component: NovelDownloadActuatorStepData,
        },
        {
            name: "novelDownloader",
            path: "/novel/network/downloader",
            component: NovelDownloader,
        },
        {
            name: "video",
            path: "/video",
            component: Video,
        },
        {
            name: "videoInfo",
            path: "/video/info",
            component: VideoInfo,
        },
        {
            name: "videoPlay",
            path: "/video/play",
            component: VideoPlay,
        },
        {
            name: "videoHistory",
            path: "/video/history",
            component: VideoHistory,
        },
    ]
})

export default router
