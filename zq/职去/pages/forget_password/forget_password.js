// pages/forget_password/forget_password.js
let app = getApp()
var codes = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,         //默认按钮1显示，按钮2不显示
    sec: "60",　
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.WeToast()
  },
  getCode: function () {
    var phone = this.data.phone
    console.log(phone)
    var _this = this;　　　　//防止this对象的混杂，用一个变量来保存
    var time = _this.data.sec　　//获取最初的秒数

    if (phone == undefined || phone.length < 11) {
      _this.wetoast.toast({
        title: '请输入正确手机号',
        duration: 2000,
      })
    } else {
      codes.getCode(_this, time);　　//调用倒计时函数
      wx.request({
        url: getApp().globalData.url + '/api/Number/put?phone=' + phone,
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
        },
        data: {
          // phone: phone,
        },
        success: function (res) {
          console.log(res)
          if (res.data == 0) {
            _this.wetoast.toast({
              title: '发送成功',
              duration: 2000,
            })
          }
          else  if (res.data == 1) {
            _this.wetoast.toast({
              title: '手机号未注册',
              duration: 2000,
            })
          }
          else {
            _this.wetoast.toast({
              title: '发送失败',
              duration: 2000,
            })
          }

        }
      })
    }
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  code: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  sure:function(){
      var that=this 
    var Phone=this.data.phone
    var Code = this.data.code
    var npwd = this.data.password
    if(npwd.length<6){
      this.wetoast.toast({
        title:'需最低6位密码长度',
        duration:2000,
      })
    }
    else if(Code==undefined||npwd==undefined){
      this.wetoast.toast({
        title: '请输入验证码或新密码',
        duration: 2000,
      })
    }
    else{
      wx.request({
        url: getApp().globalData.url + '/api/Number/Forget?Phone=' + Phone + '&npwd=' + npwd + '&Code=' + Code,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
          // phone: phone,
        },
        success: function (res) {
          console.log(res)
          if(res.data.code==0){
            that.wetoast.toast({
              title: '修改成功',
              duration: 2000,
              success:function(){
                wx.reLaunch({
                  url: '../index/index',
                })
              }
            })
          }
          else{
            that.wetoast.toast({
              title: res.data.meg,
              duration: 2000,
              
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})