// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
  },
  /**
      * 选项卡
      */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
      })
    }
    var currentTab = this.data.currentTab
    if (currentTab == 0) {
      var user_ID = wx.getStorageSync('user_ID')
      wx.request({
        url: getApp().globalData.url + '/api/Applicant/attention?UID=' + user_ID,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
        },
        success: function (r) {
          console.log(r)
          that.setData({
            gz: r.data
          })
        }
      })
    }
    if (currentTab==2){
      wx.getStorage({
        key: 'user_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/Applicant/dope?UID=' + res.data,
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
            },
            success: function (r) {
              console.log(r)
              var news = r.data
              that.setData({
                news: news
              })
            }
          })
        },
      })
    }
    if (currentTab == 3) {
      wx.getStorage({
        key: 'user_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/Applicant/NInterview?UID=' + res.data,
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
            },
            success: function (r) {
              console.log(r)
              var news = r.data
              that.setData({
                news: news
              })
            }
          })
        },
      })
    }
  },
  company_details:function(e){
    wx.navigateTo({
      url: '../company_details/company_details?QID=' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      var that=this
    var user_ID = wx.getStorageSync('user_ID')
    if (user_ID==''){
      wx.showModal({
        title:'请登录',
        content: '您还未登录或注册',
        success:function(r){
          if(r.cancel||r.confirm){
            wx.reLaunch({
              url: '../index/index',
            })
          }
        }
      })
    }
    else{
        wx.request({
          url: getApp().globalData.url + '/api/Applicant/attention?UID=' + user_ID,
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
            // 'content-type': 'application/json;charset=utf-8',
          },
          data: {
          },
          success: function (r) {
            console.log(r)
            that.setData({
              gz: r.data
            })
          }
        })
    }
  },
  qxgz:function(e){
    var id = e.currentTarget.id
    var that = this
    console.log(e)
    wx.getStorage({
      key: 'user_ID',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/Public/post?QID=' + e.currentTarget.id + '&UID=' + res.data + '&k=1',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            // 'content-type': 'application/json;charset=utf-8',
          },
          data: {
          },
          success: function (res) {
            console.log(res)
            if (res.data.code == 0) {
              wx.showToast({
                title: '已取消关注',
                duration: 2000,
                success: function (e) {
                  that.onLoad()
                }


              })
            }

          }
        })
      },
    })
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