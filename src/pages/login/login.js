/* eslint-disable */
import '../../common/css/reset.css';
import './login.less';
console.log('11111');

import imgUrl from '../../images/cat.jpeg';

import flexible from '../../common/js/flexible.js';
import zepto from '../../common/js/zepto.js';


const img = document.createElement("img");
img.style.width = "200px";
img.style.height = "200px";
img.src = imgUrl;
document.body.appendChild(img);

$(function() {
  var baseUrl = ""; // 测试环境
  // var baseUrl = getBaseUrlStr() || "https://jixun.zhenxue.com.cn"; // 线上环境

  // 返回上一页
  $("#back-btn").on("click", function() {
    window.history.go(-1);
  })

  // 登录
  var loginMobile = $("#login-phone");
  var loginPassword = $("#login-password");
  $("#login-btn").on("click", function() {
    var userMobile = $.trim(loginMobile.val()); //用户手机号
    // console.log(userMobile);
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(userMobile)) {
      getDialog("请输入正确的手机号");
      return false;
    }
    var userPassword = $.trim(loginPassword.val()); //用户手机号
    // console.log(userPassword);
    if (!userPassword) {
      getDialog("请输入登录密码");
      return false;
    }
    
    var getData = {
      "mobile": userMobile,
      "pwd": userPassword,
      "device_id": "1111" // 设备号
    };
    $.ajax({
      type: "POST",
      url: baseUrl + "/account/login/",
      data: getData,
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.status == 0) { // 登录成功
          getDialog("登录成功");
          // testCookie(getData);
        } else {
          var errStr = res.msg || "登录失败";
          getDialog(errStr);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  })
  function testCookie(getData) {
    $.ajax({
      type: "POST",
      url: baseUrl + "/account/login/",
      data: getData,
      dataType: "json",
      success: function (res) {
        console.log(res);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  }
  // END 登录

  // 去注册 或 忘记密码
  var loginBoxDom = $("#login-box");
  var regisBoxDom = $("#regist-box");
  var regisH4Dom = $("#regis-h4");
  var regisBtnDom = $("#regis-btn");

  var regisType = "regis"; // (regisType == "regis" ? "注册" : "修改")
  $("#login-item-regis-regis").on("click", function() {
    regisType = "regis";
    loginBoxDom.hide();
    regisBoxDom.show();
    regisH4Dom.html("注册");
    regisBtnDom.html("注册");
  })
  $("#login-item-regis-forget").on("click", function() {
    regisType = "forget";
    loginBoxDom.hide();
    regisBoxDom.show();
    regisBoxDom.animate({
      translateY: "10px"
    }, 400, "ease-out");
    regisBoxDom.css("transform", "translateY(10px)");
    regisH4Dom.html("忘记密码");
    regisBtnDom.html("修改");
  })
  // 去登录
  $("#login-item-regis-login").on("click", function() {
    loginBoxDom.show();
    regisBoxDom.hide();
    yanNum = "";
    regisPassword = "";
    regisYanDom.val("");
    regisPasswordDom.val("");
    regisBoxDom.css("transform", "translateY(-500px)");
  })

  // 注册
  var regisMobileDom = $("#regis-phone");
  var regisYanDom = $("#regis-yan");
  var regisPasswordDom = $("#regis-password");

  // 获取验证码
  var yanNum = ""; // 验证码
  var regisMobile = ""; // 注册手机号
  var regisPassword = ""; // 注册密码
  
  var regisYanBtnDom = $("#regis-yan-btn");
  var regisYanTimeoutDom = $("#regis-yan-timeout");
  var timeoutObj = ""; // 倒计时对象
  var timeoutNum = 59; // 倒计时时间
  regisYanBtnDom.on("click", function() {
    regisMobile = $.trim(regisMobileDom.val());
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(regisMobile)) {
      getDialog("请输入正确的手机号");
      return false;
    }
    var getData = {
      mobile: regisMobile
    };

    $.ajax({
      type: "POST",
      url: baseUrl + "/captcha/",
      data: getData,
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.status == 0) { // 验证码发送成功
          getDialog("验证码已发送");
          regisYanBtnDom.hide();
          regisYanTimeoutDom.show();
          getTimeoutFun();
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  })
  // 验证码倒计时
  function getTimeoutFun() {
    regisYanTimeoutDom.html(timeoutNum + "s");
    timeoutObj = setTimeout(function() {
      timeoutNum--;
      if (timeoutNum < 10) {
        timeoutNum = "0" + timeoutNum;
      }
      if (timeoutNum == 0) {
        regisYanBtnDom.show();
        regisYanTimeoutDom.hide();
        timeoutNum = 59;
        clearTimeout(timeoutObj);
      } else {
        getTimeoutFun();
      }
    }, 1000);
  }

  // 注册
  regisBtnDom.on("click", function() {
    regisMobile = $.trim(regisMobileDom.val()); //用户注册手机号
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(regisMobile)) {
      getDialog("请输入正确的手机号");
      return false;
    }
    yanNum = $.trim(regisYanDom.val()); // 验证码
    if (!yanNum) {
      getDialog("请输入验证码");
      return false;
    }
    regisPassword = $.trim(regisPasswordDom.val()); //用户注册密码
    if (!regisPassword) {
      getDialog("请输入注册密码");
      return false;
    }
    var getData = {
      mobile: regisMobile,
      captcha: yanNum
    };
    
    var urlStr = "/account/register/";
    if (regisType == "regis") {
      urlStr = "/account/register/";
      getData.pwd = regisPassword;
    } else {
      urlStr = "/account/update_pwd/";
      getData.new_pwd = regisPassword;
    }
    $.ajax({
      type: "POST",
      url: baseUrl + urlStr,
      data: getData,
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.status == 0) { // 注册成功
          getDialog("注册成功");
        } else {
          var errStr = res.msg || "注册失败";
          getDialog(errStr);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  })
})
