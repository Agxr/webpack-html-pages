### 开箱即用的多页面webpack脚手架
本脚手架适合做官网之类的多页面的应用。本脚手架已经支持使用ES6，less，模块化，热加载，eslint等功能

##### Build Setup，开发环境预览启动项目

``` bash
# 安装依赖
npm install

# 开发的时候在本地启 127.0.0.1:8383，并开始热加载
npm run dev

  // /* 可自己在 webpack.config.dev.js 文件中修改host 和 port */
  // 起本地服务
  devServer: {  
    contentBase: './dist/',  
    historyApiFallback: true,  
    inline: true,  
    hot: true,  
    host: '127.0.0.1',
    // host: '192.168.0.229',
    port: '8383'
  }

#### production的发布时打包，生成文件都在dist文件夹内
npm run build

```

### 目录结构

```bash
└─src                                      // src 文件夹。里面都是开发环境下的文件内容  
│    │
│    ├─common                              // 公共引用文件
│    │  ├─css
│    │  │ 
│    │  └─js
│    │
│    ├─images                              // img图片存放地址
│    │
│    ├─pages                               // 页面文件夹
│    │  ├─about
│    │  │      about.html
│    │  │      about.js
│    │  │      about.less
│    │  │
│    │  ├─contact
│    │  │      contact.css
│    │  │      contact.html
│    │  │      contact.js
│    │  │
│    │  └─home
│    │          index.html
│    │          index.js
│    │          index.less
│    │
│    └─tools                          // 工具文件夹
│            utils.js
│
│  .babelrc                         // babel的配置文件
│  .eslintignore
│  .eslintrc.js                     // eslint的配置文件
│  .gitignore
│  ecosystem.config.js              // pm2 deploy的配置文件
│  package.json
│  page.config.js                   // 页面的配置文件
│  README.md
│  webpack.config.dev.js            // 开发环境的webpack配置文件
|  webpack.config.js                // npm run dev 或 npm run build时决定执行开发环境 或 生成环境的webpack配置文件
│  webpack.config.prod.js           // 生成环境的webpack配置文件
         
```

#### 开发流程

如果增加新页面，只需两步，不需要改webpack等配置文件

1. 在pages中新增一个文件夹
2. 在page.config.js中添加这个页面的信息即可

比如
```
  {
    name: 'contact',
    html: 'contact/contact.html',
    jsEntry: 'contact/contact.js'
  }

```

---  

学习pm2的deploy，[详情请进入](http://pm2.keymetrics.io/docs/usage/deployment/#windows-consideration)
