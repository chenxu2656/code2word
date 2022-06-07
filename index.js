import exportDoc from './src/index.js'

// 想要导出的文件夹相对路径
const dirPath = './'
// 绝对路径
// const dirPath = '/Users/chenxu/Desktop/myPro/code2word'
// 忽略、不导出的文件夹，直接写文件夹名就行，不需要写路径
const ignoreFolder = ['Docs','images','node_modules']
// 导出word文档的名字
const filename = 'btfblog'
// 程序起始文件，需要写明路径，如 'src/index.js'
const startFile = 'main.js'

const extensions = ['.js']
exportDoc({
    dirPath: dirPath,
    startFile: startFile,
    ignoreFolder:ignoreFolder,
    filename:filename,
    extensions: extensions
})