import type { TemplateInstruct } from "./instruct";
import ora from "ora";
const fs = require("fs");
const path = require("path");

const spinner = ora("Executing file...").start();

const configTemplate: TemplateInstruct = {
    id: 1,
    name: "Simple Page",
    description: "Vue template for a simple page",
    components: [
        {
            component: "simple-header",
        },
        {
            component: "product",
            margin: "1rem 0",
            padding: "0 2rem",
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
  /* Your Vue styles here */
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

//run shell command
const exec = require("child_process").exec;
const command = "pnpm build";

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

function execPreviewPhase() {
    const previewSpinner = ora("Starting preview...").start();
    const previewCommand = "pnpm preview";
    exec(previewCommand, function (error: any, stdout: any, stderr: any) {
        if (error) return previewSpinner.fail(`exec error: ${error}`);
        previewSpinner.succeed("Preview started");
        console.log(`stdout: ${stdout}`);
    });
}

execBuildPhase()
    .then(() => {
        execPreviewPhase();
    })
    .catch((error) => {
        const errorSpinner = ora("An error occurred").start();
        errorSpinner.fail(error);
        errorSpinner.stop();
    });
