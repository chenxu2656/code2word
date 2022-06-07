import fs from 'fs'
import path from 'path'
import officegen from 'officegen'
import readline from 'readline'
const defaultIgnore = ['.DS_Store','Dockerfile',".git",'.gitignore','.dockerignore','node_modules','package.json',"yarn.lock","package-lock.json"]
let arrSplit = ''
let docx = officegen({
    type: 'docx',
    pageSize: "A4",
})
/**
 * @description 生成导出文件路径
 * @param {String} dir 文件夹路径 
 * @param {Array} ignoreFolder 不导出文件 
 * @param {Array} fileNameList 
 * @returns 
 */
const exportFilePath = (dir,ignoreFolder=[],fileNameList=[])=>{
    const fileList = fs.readdirSync(dir)
    fileList.forEach((item)=>{
        const fullPath = path.join(dir,item)
        const fileStat = fs.statSync(fullPath)
        if (defaultIgnore.indexOf(item) != -1 || ignoreFolder.indexOf(item)!= -1) {
        } else if (fileStat.isDirectory()) {
            exportFilePath(fullPath,ignoreFolder,fileNameList)
        } else{
            if(!(item.endsWith('.png') || item.endsWith('.PNG') || item.endsWith('.svg') || item.endsWith('.SVG') || item.endsWith('.ico'))){
                fileNameList.push(fullPath) 
            }
            
        }
    })
    return fileNameList
}
/**
 * @description 返回文件类型
 * @param {*} filepath 文件路径
 * @return {*} 
 */
const fileExtension = (filepath)=>{
    return path.extname(filepath)
}
/**
 * @description 根据文件路径列表匹配想导出的文件类型
 * @param {Array} fileList 文件路径列表
 * @param {Array} extensions 文件类型拓展 
 * @return {Array} 处理后的文件路径
 */
const handleIgnoreFile = (fileList, extensions)=>{
    if(!extensions) {
        return fileList
    }
    return fileList.filter((item)=>{
        return extensions.includes(fileExtension(item)) 
    })
}

/**
 * @description 根据文件路径数组，生成txt文件，包含所有code
 * @param {Array} pathList 路径数组 
 */
const writeToTxt = (pathList)=>{
    let allCon = ''
    pathList.forEach((file)=>{
        const con = fs.readFileSync(file,'utf-8')
        allCon += con
        fs.writeFileSync('test.txt',con,{flag: 'a'},(err)=>{
            console.log(err);
        })
    })
}
/**
 * @description 根据软件著作权要求，大于60页保留前后三十页，小于60页返回全部代码, 大约一页52行，返回65页附近，方便后续删减
 * @param {*} file 
 * @returns 
 */
const handleCodeLine = (file)=>{
    return new Promise((res,rej)=>{
        const readstream = fs.createReadStream(file)
        const lineRead = readline.createInterface({
            input: readstream
        })
        let arr = []
        
        lineRead.on('line',(data)=>{
            arr.push(data)
        }).on('close',()=>{
            console.log(`代码总行数：${arr.length}`);
            if(arr.length > 3200) {
                const splitStart = 1600;
                const splitEnd = arr.length-3200
                arr.splice(splitStart,splitEnd)
            }
            arrSplit = arr.join('\n')
            res(arrSplit)
        })
    })
    
    
}
/**
 * @description 生成word文档
 * @param {*} dirPath 
 * @param {*} ignoreFolder 
 * @param {*} filename 
 * @param {*} startFile
 */
export default async(obj)=>{
    const resFileList = exportFilePath(obj.dirPath,obj.ignoreFolder)
    console.log(resFileList);
    console.log(obj.extensions);
    const  handledList = handleIgnoreFile(resFileList,obj.extensions)
    const fullStartPath = path.join(obj.dirPath, obj.startFile)

    const startIndex = handledList.findIndex(item=>item==fullStartPath)
    if (!(startIndex == -1)) {
        handledList.splice(startIndex,1)
        handledList.unshift(fullStartPath)
    }
    console.log(handledList);
    writeToTxt(handledList)
    const at = await handleCodeLine('test.txt')
    fs.unlink('test.txt',(err)=>{
        if (err) {
            return console.error(err);
        }
    })
    const docsFile = fs.createWriteStream(`./${obj.filename}.docx`)
    const code = docx.createP()
    code.addText(at,{
        font_size: 9.5,
        font_face: 'Times New Roman',
    })
    // 写入页眉
    // const header = docx.getHeader().createP()
    // header.addText(headerTitle,{
    //     font_size: 9,
    //     font_face: 'Times New Roman',
    // })
    
    docx.generate(docsFile)
    console.log('Successful!');
}

