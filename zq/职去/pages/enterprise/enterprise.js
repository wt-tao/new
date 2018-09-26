// pages/enterprise/enterprise.js
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
    if (currentTab==0){
      var user_ID = wx.getStorageSync('user_ID')
      if (user_ID == '') {
        user_ID = 0
      }
      wx.request({
        // 职位福利
        url: getApp().globalData.url + '/api/Public/GetQY?UID=' + user_ID + '&lmid=124&pageIndex=1&pageSize=10',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
        },
        success: function (r) {
          console.log('新闻list', r)
          that.setData({
            list: r.data
          })

        }
      })
    }
    if (currentTab==1){
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
            url: getApp().globalData.url + '/api/Public/post?UID=' + user_ID + '&lmid=124&pageIndex=1&pageSize=10',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
            },
            success: function (r) {
              console.log('关注list', r)
              that.setData({
                listGz: r.data
              })

            }
          })
      }
    }
  },
  gz: function (e) {
    var that = this
    console.log(e)
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
        url: getApp().globalData.url + '/api/Public/post?QID=' + e.currentTarget.id + '&UID=' + user_ID + '&k=0',
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
            that.wetoast.toast({
              title: '已关注',
              duration: 2000,
              success: function (e) {
                that.onShow()
              }


            })
          }

        }
      })
    }
  },
  qxgz: function (e) {
    var that = this
    console.log(e)
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
        url: getApp().globalData.url + '/api/Public/post?QID=' + e.currentTarget.id + '&UID=' + user_ID + '&k=1',
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
            that.wetoast.toast({
              title: '已取消关注',
              duration: 2000,
              success: function (e) {
                that.onShow()
              }


            })
          }

        }
      })
    }
  },
  new_detail:function(e){
    console.log(e)
      wx.navigateTo({
        url: '../news_details/news_details?id=' + e.currentTarget.id + '&QID=' + e.currentTarget.dataset.ids,
      })
  },
  company:function(e){
    wx.navigateTo({
      url: '../company_details/company_details?QID=' + e.currentTarget.id,
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().globalData.url + '/api/Link/Get?lmid=40',
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
          banner: res.data
        })

      }
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
    var that=this
    var user_ID = wx.getStorageSync('user_ID')
    if (user_ID == '') {
      user_ID=0
    }
        wx.request({
          // 职位福利
          url: getApp().globalData.url + '/api/Public/GetQY?UID=' + user_ID + '&lmid=124&pageIndex=1&pageSize=10',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            // 'content-type': 'application/json;charset=utf-8',
          },
          data: {
          },
          success: function (r) {
            console.log('新闻list', r)
            that.setData({
              list: r.data
            })

          }
        })

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