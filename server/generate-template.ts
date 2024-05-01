import type { TemplateInstruct } from "./instruct";
import ora from "ora";
const fs = require("fs");
const path = require("path");

const spinner = ora("Executing file...").start();
const args = process.argv.slice(2);

const configTemplate: TemplateInstruct = {
    id: 1,
    name: "Mehsini",
    description: "Vue template for a simple page",
    components: [
        {
            component: "product",
            margin: "1rem 0",
            padding: "0 2rem",
        },
        {
            component: "simple-header",
            margin: "1rem 0",
        },
        {
            component: "product-2",
            margin: "1rem 0",
            padding: "0 2rem",
        },
    ],
};

const vueTemplate = `<template>
  <div>
  ${configTemplate.components
      .map((component) => {
          return `<${component.component} style="margin:${component.margin};padding:${component.padding}"/>`;
      })
      .join("\n")}
  </div>
</template>

<script setup>
import "../colors.css"
</script>

<style scoped>
</style>
`;

const filePath = path.join(__dirname, "../pages/index.vue");
const dirPath = path.dirname(filePath);
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFile(filePath, vueTemplate, function (err: any) {
    if (err) {
        spinner.fail("File execution failed");
        throw err;
    }
    spinner.succeed("Vue template created!");
});

if (!args.includes("--no-build")) {
    const exec = require("child_process").exec;
    const command = "pnpm build";

    process.env.BUILD_DIR = `.nuxt-${configTemplate.name.toLowerCase()}-${new Date()
        .toISOString()
        .replace(/[^0-9]/g, "")
        .slice(0, 14)}`;

    spinner.info(`Building path set to => ${process.env.BUILD_DIR}`);

    spinner.stop();
    function execBuildPhase() {
        return new Promise<void>((resolve, reject) => {
            const buildSpinner = ora("Starting build...").start();
            const buildCommand = "pnpm build";
            exec(buildCommand, function (error: any, stdout: any, stderr: any) {
                if (error) {
                    buildSpinner.fail(`exec error: ${error}`);
                    reject(error);
                    return;
                }
                buildSpinner.succeed("Build completed");
                console.log(`stdout: ${stdout}`);
                resolve();
            });
        });
    }

    execBuildPhase()
        .then(() => {
            const successSpinner = ora("Build completed").start();
            successSpinner.succeed();
            successSpinner.stop();
        })
        .catch((error) => {
            const errorSpinner = ora("An error occurred").start();
            errorSpinner.fail(error);
            errorSpinner.stop();
        });
}
