import exportDoc from './index.js'

const dirPath = '/Users/chenxu/Desktop/aitmed/aitmed/provider'
const ignoreFolder = ['assets','dataSource']
const filename = 'patient'

exportDoc(dirPath,ignoreFolder,filename)