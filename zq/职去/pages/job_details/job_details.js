// pages/job_details/job_details.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // display: 'none',
    // date:'2018-8-7'
  },
  ms:function(e){
    var that=this
    var ZID = this.data.ZID
    wx.showModal({
      title: '请确认',
      content: '确认申请面试吗？',
      success:function(r){
        if (r.confirm) {
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
                url: getApp().globalData.url + '/api/Applicant/Post?QID=' + e.currentTarget.id + '&UID=' + user_ID + '&ZID=' + ZID,
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
                      title: '申请成功',
                      duration: 2000,
                      success: function () {
                        that.onShow()
                      }
                    })
                  }
                  else if (res.data.code == 2){
                    wx.showToast({
                      title: res.data.meg,
                      icon:'loading',
                      duration: 2000,
                      success: function (e) {
                        wx.reLaunch({
                          url: '../uesr/uesr',
                        })
                      }
                    })
                  }
                  else{
                    wx.showToast({
                      title: res.data.meg,
                      icon: 'loading',
                      duration: 2000,
                    })
                  }

                }
              })
            }
        }
      }
    })
  },

  company_details:function(e){
    // console.log(e)
      wx.navigateTo({
        url: '../company_details/company_details?QID=' + e.currentTarget.id,
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
            if(res.data.code==0){
              that.wetoast.toast({
                title:'已取消关注',
                duration: 2000,
                success:function(e){
                  that.onShow();
                }
                    
               
              })
            }

          }
        })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.WeToast()
    
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    })
    this.setData({
      ZID: options.Zid
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
    
    var that = this 
    var ZID = this.data.ZID
    var user_ID = wx.getStorageSync('user_ID')
    if (user_ID==''){
      user_ID=0
    }
    // else{
      console.log(user_ID)
      wx.request({
        url: getApp().globalData.url + '/api/Applicant/Put/?ZID=' + ZID + '&UID=' + user_ID,
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
            job: res.data
          })

        }
      })
    // }
 

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