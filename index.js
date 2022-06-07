import exportDoc from './src/index.js'

// 相对路径
const dirPath = './'
// 绝对路径
// const dirPath = '/Users/chenxu/Desktop/myPro/code2word'
const ignoreFolder = ['Docs','images']
const filename = 'btfblog'
const startFile = 'main.js'

exportDoc({
    dirPath: dirPath,
    startFile: startFile,
    ignoreFolder:ignoreFolder,
    filename:filename
})