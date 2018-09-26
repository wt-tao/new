// pages/uesr_phone/uesr_phone.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  sure: function (e) {
    var that = this
    var name = this.data.name
    if (name == undefined) {
      this.wetoast.toast({
        title: '请输入手机号码',
        duration: 2000,
      })
    } else {
      wx.getStorage({
        key: 'user_ID',
        success: function (res) {
          wx.request({
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
              // 'content-type': 'application/json;charset=utf-8',
            },
            // 职位福利
            url: getApp().globalData.url + '/api/User/Post?UID=' + res.data + '&val=' + name + '&k=2',
            method: "POST",

            data: {
            },
            success: function (res) {
              console.log(res)
              if (res.data == 0) {
                that.wetoast.toast({
                  title: '修改成功',
                  duration: 2000,
                  success: function () {
                    wx.redirectTo({
                      url: '../user_news/user_news',
                    })
                  }
                })
              } else {
                that.wetoast.toast({
                  title: '修改失败',
                  duration: 2000,

                })
              }
              // that.setData({
              //   user: res.data,
              // })

            }
          })
        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.WeToast()
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