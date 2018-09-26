// pages/news_details/news_details.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  job_details:function(e){
    console.log(e)
      wx.navigateTo({
        url: '../job_details/job_details?Zid=' + e.currentTarget.id,
      })
  },
  input:function(e){
    this.setData({
      input:e.detail.value
    })
  },
  comment:function(e){
      var that=this
      var input=this.data.input
      var NewsID = this.data.NewsID
      var title=e.currentTarget.id
    if (input==undefined){
      wx.showToast({
        title: '请输入内容...',
        icon:'loading',
        duration:2000
      })
    }
    else{
      var user_ID = wx.getStorageSync('user_ID')
      if (user_ID==''){
        wx.showToast({
          title: '请先登录...',
          icon: 'loading',
          duration: 2000,
          success:function(){
            wx.reLaunch({
              url: '../index/index',
            })
          }
        })
      }
      else{
        wx.request({
          url: getApp().globalData.url + '/api/Public/Comment',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            // 'content-type': 'application/json;charset=utf-8',
          },
          data: {
            UID: user_ID,
            NewsID: NewsID,
            title: title,
            Content: input
          },
          success: function (res) {
            console.log(res)
            that.setData({
              input:'',
            })
            if(res.data==1){
              wx.showToast({
                title: '评论成功...',
                duration:2000,
                success:function(){
                  that.onShow()
                }
              })
            }
            else{
              wx.showToast({
                title: '评论中...',
                icon:'loading',
                duration: 2000,
              })
            }
            // that.setData({
            //   show: res.data
            // })
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
  console.log(options)
  this.setData({
    NID: options.id
  })
  

        wx.request({
          url: getApp().globalData.url + '/api/Recruit/Obtain?QID=' + options.QID,
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
              jobs: r.data
            })
          }
        })
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
  company: function (e) {
    wx.navigateTo({
      url: '../company_details/company_details?QID=' + e.currentTarget.id,
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
    var NID=this.data.NID
    var that=this
    var user_ID = wx.getStorageSync('user_ID')
    if (user_ID == '') {
      user_ID = 0
    }
    wx.request({
      url: getApp().globalData.url + '/api/Public/XQGetQY?UID=' + user_ID + '&NID=' + NID,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
      },
      success: function (res) {
        console.log('新闻详情',res)
        that.setData({
          NewsID: NID,
          show: res.data
        })
      }
    })
    wx.request({
      url: getApp().globalData.url + '/api/Public/Stcomm?NewsID=' + NID,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
      },
      success: function (res) {
        console.log('评论详情', res)
        that.setData({
          data: res.data,
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