/* eslint-disable */
/**
* iOS与H5交互的方案: WebViewJavascriptBridge
*/
/*这段代码是固定的，必须要放到js中*/
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
/*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
setupWebViewJavascriptBridge(function(bridge) {
  // var uniqueId = 1
  // function log(message, data) {
  //   var log = document.getElementById('log')
  //   var el = document.createElement('div')
  //   el.className = 'logLine'
  //   el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
  //   if (log.children.length) {
  //     log.insertBefore(el, log.children[0])
  //   } else {
  //     log.appendChild(el)
  //   }
  // }
  // /* Initialize your app here */

  // /*我们在这注册一个js调用OC的方法，不带参数，且不用ObjC端反馈结果给JS：打开本demo对应的博文*/
  // bridge.registerHandler('openWebviewBridgeArticle', function() {
  //   log("openWebviewBridgeArticle was called with by ObjC")
  // })
  // /*JS给ObjC提供公开的API，在ObjC端可以手动调用JS的这个API。接收ObjC传过来的参数，且可以回调ObjC*/
  // bridge.registerHandler('getUserInfos', function(data, responseCallback) {
  //   log("Get user information from ObjC: ", data)
  //   responseCallback({'userId': '123456', 'blog': '标哥的技术博客'})
  // })
                           
  // /*JS给ObjC提供公开的API，ObjC端通过注册，就可以在JS端调用此API时，得到回调。ObjC端可以在处理完成后，反馈给JS，这样写就是在载入页面完成时就先调用*/
  // bridge.callHandler('getUserIdFromObjC', function(responseData) {
  //    log("JS call ObjC's getUserIdFromObjC function, and js received response:", responseData)
  // })

  // document.getElementById('blogId').onclick = function (e) {
  //   log('js call objc: getBlogNameFromObjC')
  //   bridge.callHandler('getBlogNameFromObjC', {'blogURL': 'http://www.huangyibiao.com'}, function(response) {
  //     log('JS got response', response)
  //   })
  // }
})


window.setupWebViewJavascriptBridge = setupWebViewJavascriptBridge || window.setupWebViewJavascriptBridge;


// 封装根据ua判断当前浏览的设备
function browserRedirect() {
  var sUserAgent= navigator.userAgent.toLowerCase();
  // var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";
  // var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
  // var bIsMidp= sUserAgent.match(/midp/i) == "midp";
  // var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  // var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";
  // var bIsAndroid= sUserAgent.match(/android/i) == "android";
  // var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
  // var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";

  // console.log(sUserAgent.match(/ipad|iphone|iphone os|midp|android|rv:1.2.3.4|ucweb|windows ce|windows mobile/i));
  if (sUserAgent.match(/ipad|iphone|iphone os|midp|android|rv:1.2.3.4|ucweb|windows ce|windows mobile/i)) {
    document.getElementById("top-head") ? document.getElementById("top-head").style.display = "none" : "";
  }

  
}
browserRedirect(); // 调用

// 封装获取url协议+域名+端口号
function getBaseUrlStr() {
  var port = window.location.protocol;
  var host = window.location.host;
  var baseUrl = port + "//" + host;
  // console.log(baseUrl);
  return baseUrl;
}

// Timestamp // 解决浏览器缓存
function timestamp(url) {
   // var getTimestamp=Math.random();
   var getTimestamp = new Date().getTime();
  if (url.indexOf("?") > -1) {
    url = url + "&time=" + getTimestamp;
  } else {
    url = url + "?time=" + getTimestamp;
  }
  return url;
}

// 封装弹窗
function getDialog(str) {
  var divDom = document.createElement("div");
  divDom.innerHTML = str;
  divDom.style.position = "fixed";
  divDom.style.zIndex = "5";
  divDom.style.width = "90%"
  divDom.style.padding = "20px 0";
  divDom.style.textAlign = "center";
  // divDom.style.backgroundColor = "rgba(100, 100, 100, 0.4)";
  divDom.style.backgroundColor = "rgba(61, 197, 63, 0.8)";
  divDom.style.color = "#fff";
  divDom.style.top = "30%";
  divDom.style.left = "5%";
  divDom.style.margin = "auto";
  divDom.style.fontSize = "20px";
  divDom.style.borderRadius = "5px";
  document.body.appendChild(divDom);
  setTimeout(function() {
    document.body.removeChild(divDom);
  }, 1500)
}

export {
  setupWebViewJavascriptBridge,
  browserRedirect,
  getBaseUrlStr,
  timestamp,
  getDialog
}
