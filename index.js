import fs from 'fs'
import path from 'path'
const defaultIgnore = ['Dockerfile',".git",'.gitignore','.dockerignore','node_modules','package.json',"yarn.lock","package-lock.json"]
import officegen from 'officegen'
import readline from 'readline'
let docx = officegen({
    type: 'docx',
    pageSize: "A4",
})
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
const exportCode = (pathList,filename)=>{
    let allCon = ''
    pathList.forEach((file)=>{
        const con = fs.readFileSync(file,'utf-8')
        allCon += '\n'
        allCon += con
        fs.writeFileSync('test.txt',con,{flag: 'a'},(err)=>{
            console.log(err);
        })
    })
    const docsFile = fs.createWriteStream(`./${filename}.docx`)
    // 写入内容
    const code = docx.createP()
    code.addText(allCon,{
        font_size: 9,
        font_face: 'Times New Roman',
    })
    // 写入页眉
    // const header = docx.getHeader().createP()
    // header.addText(headerTitle,{
    //     font_size: 9,
    //     font_face: 'Times New Roman',
    // })
    docx.generate(docsFile)
    const readstream = fs.createReadStream('/Users/xuchen/Desktop/myPro/exportCodetoWord/test.txt')
    const lineRead = readline.createInterface({
        input: readstream
    })
    let arr = []
    lineRead.on('line',(data)=>{
        arr.push(data)
    }).on('close',()=>{
        console.log(arr.length);
        if(arr.length < 3480) {
            console.log('xiaoyu');
        }else {
            
        }
    })
}
// 每个页面58行
const ignoreFolder = ['Docs','images','assets']

const res = exportFilePath('/Users/xuchen/Desktop/aitmed/aitmed/provider',ignoreFolder)

exportCode(res,'patient')