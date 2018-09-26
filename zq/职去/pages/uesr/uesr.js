// pages/uesr/uesr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  user_news:function(){
      wx.navigateTo({
        url: '../user_news/user_news',
      })
  },
  password: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../passwords/passwords?phone=' + e.currentTarget.id,
    })
  },
  resume:function(){
    wx.navigateTo({
      url: '../resume/resume',
    })
  },
  Put_forward:function(e){
      console.log(e.currentTarget.id)
      wx.navigateTo({
        url: '../put_forward/put_forward?jf=' + e.currentTarget.id,
      })
  },
  shenq:function(e){
    wx.navigateTo({
      url: '../Interview_list/Interview_list?id=' + e.currentTarget.id,
    })
  },
  daim: function (e) {
    wx.navigateTo({
      url: '../Interview_list/Interview_list?id=' + e.currentTarget.id,
    })
  },
  ruz: function (e) {
    wx.navigateTo({
      url: '../Interview_list/Interview_list?id=' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this
    var user_ID = wx.getStorageSync('user_ID')
    if (user_ID == '') {
      wx.showModal({
        title: '请登录',
        content: '您还未登录或注册',
        success: function (r) {
          if (r.cancel || r.confirm) {
            wx.reLaunch({
              url: '../index/index',
            })
          }
        }
      })
    }
    else {
        wx.request({
          // 职位福利
          url: getApp().globalData.url + '/api/User/Get?UID=' + user_ID + '&lmid=113',
          method: "GET",
          header: {
            // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            'content-type': 'application/json;charset=utf-8',
          },
          data: {
          },
          success: function (res) {
            console.log(res)

            that.setData({
              user: res.data,
            })

          }
        })
      }
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