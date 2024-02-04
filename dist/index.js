"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => vitePluginCreateEnvConfigFile
});
module.exports = __toCommonJS(src_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
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
  import_fs.default.readFile(envPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    const modifiedContent = data.replace(/^# /gm, "// ");
    import_fs.default.writeFile(configPath, modifiedContent, "utf-8", (writeErr) => {
      if (writeErr) {
        console.error("Error writing file:", writeErr);
        return;
      }
      console.log(`${mode}\u73AF\u5883\u53D8\u91CF\u5185\u5BB9\u5DF2\u7ECF\u5199\u5165\u5230 ---`, configPath);
    });
  });
};
function checkFileExist(configPath) {
  const filePath = import_path.default.resolve(__dirname, "..", configPath);
  console.log(77, filePath);
  if (!import_fs.default.existsSync(filePath)) {
    import_fs.default.writeFileSync(filePath, "", "utf-8");
    console.log(`File ${filePath} created successfully.`);
  } else {
    console.log(`File ${filePath} already exists.`);
  }
}
