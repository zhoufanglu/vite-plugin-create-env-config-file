import type { PluginOption } from 'vite';
import fs from 'fs'
import path from 'path'


interface Options{
  configPath?: string
  enableEnv?: string[]
}

export default function vitePluginCreateEnvConfigFile(fnOptions: Options): PluginOption {
  console.log('plugin-----------start------------')

  // 设置默认值
  const options: Options = {
    configPath: './public/config.js',
    enableEnv: ['development', 'test', 'production'],
    ...fnOptions,
  }
  return {
    // 插件名称
    name: 'vite-plugin-create-env-config-file',

    // pre 会较于 post 先执行
    enforce: 'pre', // post

    // 指明它们仅在 'build' 或 'serve' 模式时调用
    // apply: true, // apply 亦可以是一个函数

    config(config, { command }) {
      // console.log('这里是config钩子' ,process.env.NODE_ENV);
    },

    configResolved(resolvedConfig) {
      // console.log('这里是configResolved钩子');
    },

    configureServer(server) {
      // const projectDirectory = process.cwd();
      console.log('这里是configureServer钩子');
      writeEnvToConfig(process.env.NODE_ENV || 'development', options)

    },

    transformIndexHtml(html) {
      // console.log('这里是transformIndexHtml钩子');
    },
  }
}

/**
 * 此函数会把.env.xxx文件中的环境变量写入到public/config.js文件中
 * @param mode 环境变量
 */
const writeEnvToConfig = function (mode: string, options:Options) {
  // ? 1、定义input,output文件路径
  const configPath = options.configPath as string
  // !判断有无config.js， 如果没有就创建, 有了就不变。
  checkFileExist(configPath)
  const envPath = `.env.${mode}`
  // ? 2、根据环境读取环境变量文件的内容
  fs.readFile(envPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err)
      return
    }

    // 对文件内容进行处理，将行首的 # 改为 //
    const modifiedContent = data.replace(/^# /gm, '// ')

    // 使用 fs.writeFile 异步方式写入新的文件
    fs.writeFile(configPath, modifiedContent, 'utf-8', writeErr => {
      if (writeErr) {
        console.error('Error writing file:', writeErr)
        return
      }

      console.log(`${mode}环境变量内容已经写入到 ---`, configPath)
    })
  })
}

function checkFileExist(configPath: string) {
  const filePath = path.resolve(__dirname, '..', configPath)
  // Check if the file already exists
  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, '', 'utf-8')
      console.log(`File ${filePath} created successfully.`)
    } catch(e){
      console.log(`找不到config.js文件， can not find ${filePath}`)
    }
  } else {
    console.log(`File ${filePath} already exists.`)
  }
}
