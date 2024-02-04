// src/index.ts
import fs from "fs";
import path from "path";
function vitePluginCreateEnvConfigFile(fnOptions) {
  const options = {
    configPath: "./public/config.js",
    enableEnv: ["development", "test", "production"],
    ...fnOptions
  };
  return {
    // 插件名称
    name: "vite-plugin-create-env-config-file",
    // pre 会较于 post 先执行
    enforce: "pre",
    // post
    // 指明它们仅在 'build' 或 'serve' 模式时调用
    // apply: true, // apply 亦可以是一个函数
    config(config, { command }) {
    },
    configResolved(resolvedConfig) {
    },
    configureServer(server) {
      console.log("\u8FD9\u91CC\u662FconfigureServer\u94A9\u5B50");
      writeEnvToConfig(process.env.NODE_ENV || "development", options);
    },
    transformIndexHtml(html) {
    }
  };
}
var writeEnvToConfig = function(mode, options) {
  const configPath = options.configPath;
  console.log(52, configPath);
  checkFileExist(configPath);
  const envPath = `.env.${mode}`;
  fs.readFile(envPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    const modifiedContent = data.replace(/^# /gm, "// ");
    fs.writeFile(configPath, modifiedContent, "utf-8", (writeErr) => {
      if (writeErr) {
        console.error("Error writing file:", writeErr);
        return;
      }
      console.log(`${mode}\u73AF\u5883\u53D8\u91CF\u5185\u5BB9\u5DF2\u7ECF\u5199\u5165\u5230 ---`, configPath);
    });
  });
};
function checkFileExist(configPath) {
  const filePath = path.resolve(__dirname, "..", configPath);
  console.log(77, filePath);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "", "utf-8");
    console.log(`File ${filePath} created successfully.`);
  } else {
    console.log(`File ${filePath} already exists.`);
  }
}
export {
  vitePluginCreateEnvConfigFile as default
};
