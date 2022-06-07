<h1 style="display: block; text-align: center; width:100%">Code2Word</h1>

## Description

把源代码导出为word，方便申请软件著作权申请。

## ToDoList
![官方要求](./images/require.jpg)

- [x] 允许输入忽略文件夹、默认忽略.lock、package.json、node_module等文件
- [x] 少于60页全部导出，多余60页导出前后30页
- [x] 每页不低于50行
- [x] 指定开始文件，放在word最前方
- [x] 返回代码行数
- [ ] 页眉
- [ ] 页码


## Start
### 方法1: 直接clone项目导出
#### 1.克隆项目并安装
```
git clone https://github.com/chenxu2656/code2word.git

yarn 
or
npm i
```
#### 2.index.js参数

- `dirPath`: `String`,导出的文件夹路径，绝对｜相对 路径
- `ignoreFolder`: `[Array]`,忽略的文件夹名
- `filename`: `String`, 导出文件名，不需要加后缀
- `startFile`: `String`,指定开始文件，放在word最前方
```
// 想要导出的文件夹相对路径
const dirPath = './'
// 绝对路径
// const dirPath = '/Users/chenxu/Desktop/myPro/code2word'
// 忽略、不导出的文件夹，直接写文件夹名就行，不需要写路径
const ignoreFolder = ['Docs','images']
// 导出word文档的名字
const filename = 'btfblog'
// 程序起始文件，需要写明路径，如 'src/index.js'
const startFile = 'main.js'
```

#### 3. 导出文件

`npm run export`

## DEMO

http://qiniu-btfblog-bucket.xccit.cn/code2word.mp4
