// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    components: [
        {
            path: "~/components",
            extensions: ["vue"],
        },
    ],
    extends: ["../../harmony/app-base"],
    css: ["~/colors.css"],
    buildDir: process.env.BUILD_DIR
        ? "distributions/" + process.env.BUILD_DIR
        : ".nuxt",
});
