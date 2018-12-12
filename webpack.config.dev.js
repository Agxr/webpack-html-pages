/* eslint-disable */
const webpack = require('webpack');  
const path = require('path')  
const HtmlWebpackPlugin = require('html-webpack-plugin');  
const ExtractTextPlugin = require("extract-text-webpack-plugin");  
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pageConfig = require('./page.config.js');

let webpackConfig = {
  mode: 'none',
  // 配置入口  
  entry: {},
  // 配置出口  
  output: {
    path: path.join(__dirname, "./dist/"),  
    filename: 'static/js/[name].[hash:8].js',  
    publicPath: '/',  
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, "./src")],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      // html中的img标签
      {
        test: /\.html$/,
        loader:'html-withimg-loader',
        include: [path.join(__dirname, "./src")],
        options: {
          limit: 10000,
          // name: 'static/img/[name].[hash:8].[ext]'   // 图片、音频等文件暂未使用hash值
          name: 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, "./src")]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: 'static/img/[name].[hash:8].[ext]'
          name: 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: 'static/media/[name].[hash:8].[ext]'
          name: 'static/media/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },      
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ],
      },
    ]
  },
  plugins:[
    //设置每一次build之前先删除dist  
    new CleanWebpackPlugin(  
      ['dist/*',],　     //匹配删除的文件  
      {  
          root: __dirname,   //根目录  
          verbose: true,    //开启在控制台输出信息  
          dry: false     //启用删除文件  
      }  
    )
  ],
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
};

if(pageConfig && Array.isArray(pageConfig)){
  pageConfig.map(page => {
    webpackConfig.entry[page.name] = `./src/pages/${page.jsEntry}`;
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      filename: path.join(__dirname,`/dist/${page.name}.html`),
      template: path.join(__dirname,`/src/pages/${page.html}`),
      inject: true,
      chunks: [page.name],  
      inlineSource: '.(js|css)$',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'dependency'
    }))
  })
}

module.exports = webpackConfig;
