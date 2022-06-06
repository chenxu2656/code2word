import fs from 'fs'
import path from 'path'
import officegen from 'officegen'
import readline from 'readline'
const defaultIgnore = ['Dockerfile',".git",'.gitignore','.dockerignore','node_modules','package.json',"yarn.lock","package-lock.json"]
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
        if (defaultIgnore.indexOf(item) != -1 || item.startsWith('.') || ignoreFolder.indexOf(item)!= -1) {
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
 */
export default async(dirPath,startFilePath,ignoreFolder,filename)=>{
    const resFileList = exportFilePath(dirPath,ignoreFolder)
    const fullStartPath = path.join(dirPath,startFilePath)
    const startIndex = resFileList.findIndex(item=>item==fullStartPath)
    if (!(startIndex == -1)) {
        resFileList.splice(startIndex,1)
        resFileList.unshift(fullStartPath)
    }
    console.log(resFileList);
    writeToTxt(resFileList)
    const at = await handleCodeLine('test.txt')
    fs.unlink('test.txt',(err)=>{
        if (err) {
            return console.error(err);
        }
        console.log("文件删除成功！");
    })
    const docsFile = fs.createWriteStream(`./${filename}.docx`)
    const code = docx.createP()
    code.addText(at,{
        font_size: 10,
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

