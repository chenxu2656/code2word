import exportDoc from './src/index.js'
// 相对路径
const dirPath = '/Users/xuchen/Desktop/myPro/btfblog'
// 绝对路径
// const dirPath = '/Users/chenxu/Desktop/myPro/code2word'
const ignoreFolder = ['Docs','images']
const filename = 'btfblog'
const startFile = 'src/main.js'
exportDoc(dirPath,startFile,ignoreFolder,filename)