import {createRouter, createWebHistory} from 'vue-router'
import IndexView from "@/views/IndexView.vue";
import SettingView from "@/views/SettingView.vue";
import NovelLocalView from "@/views/novel/local/NovelLocalView.vue";
import NovelNetworkView from "@/views/novel/network/NovelNetworkView.vue";
import VideoView from "@/views/video/VideoView.vue";
import NovelLocalInfoView from "@/views/novel/local/NovelLocalInfoView.vue";
import NovelLocalContentView from "@/views/novel/local/NovelLocalContentView.vue";
import NovelDownloadActuator from "@/views/novel/network/actuator/NovelDownloadActuator.vue";
import NovelDownloadActuatorInfo from "@/views/novel/network/actuator/NovelDownloadActuatorInfo.vue";
import NovelDownloadActuatorAdd from "@/views/novel/network/actuator/NovelDownloadActuatorAdd.vue";
import NovelDownloadActuatorStepData from "@/views/novel/network/actuator/NovelDownloadActuatorStepData.vue";
import VideoInfoView from "@/views/video/VideoInfoView.vue";
import VideoPlayView from "@/views/video/VideoPlayView.vue";
import NovelLocalHistoryView from "@/views/novel/local/NovelLocalHistoryView.vue";
import VideoHistoryView from "@/views/video/VideoHistoryView.vue";

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
            component: IndexView,
        },
        {
            name: "setting",
            path: "/setting",
            component: SettingView,
        },
        {
            name: "novelLocal",
            path: "/novel/local",
            component: NovelLocalView,
        },
        {
            name: "novelLocalInfo",
            path: "/novel/local/info",
            component: NovelLocalInfoView,
        },
        {
            name: "novelLocalContent",
            path: "/novel/local/content",
            component: NovelLocalContentView,
        },
        {
            name: "novelLocalHistory",
            path: "/novel/local/history",
            component: NovelLocalHistoryView,
        },
        {
            name: "novelNetwork",
            path: "/novel/network",
            component: NovelNetworkView,
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
            name: "video",
            path: "/video",
            component: VideoView,
        },
        {
            name: "videoInfo",
            path: "/video/info",
            component: VideoInfoView,
        },
        {
            name: "videoPlay",
            path: "/video/play",
            component: VideoPlayView,
        },
        {
            name: "videoHistory",
            path: "/video/history",
            component: VideoHistoryView,
        },
    ]
})

export default router
