<h1 style="display: block; text-align: center; width:100%">Code2Word</h1>

## Description

把源代码导出为word，方便申请软件著作权申请。

## ToDoList
![官方要求](./images/require.jpg)

- [x] 忽略文件夹
- [x] 少于60页全部导出，多余60页导出前后30页
- [x] 每页不低于50行
- [x] 指定 
- [ ] 页眉
- [ ] 页码


## Start
### 方法1: 直接clone项目导出
#### 1.克隆项目
```
git clone https://github.com/chenxu2656/code2word.git
```
#### 2.修改export.js参数

- `dirPath`: `String`,导出的文件夹路径，绝对路径
- `ignoreFolder`: `[Array]`,忽略的文件夹名
- `filename`: `String`, 导出文件名，不需要加后缀
  
```
import exportDoc from './index.js'

const dirPath = '/Users/chenxu/Desktop/aitmed/aitmed/provider'
const ignoreFolder = ['assets','dataSource']
const filename = 'patient'

exportDoc(dirPath,ignoreFolder,filename)
```

#### 3. 导出文件

`npm run export`