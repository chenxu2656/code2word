import exportDoc from './index.js'
// 相对路径
const dirPath = './'
// 绝对路径
// const dirPath = '/Users/chenxu/Desktop/myPro/code2word'
const ignoreFolder = ['images']
const filename = 'code2word'
const startFile = 'index.js'
exportDoc(dirPath,startFile,ignoreFolder,filename)