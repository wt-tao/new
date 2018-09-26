// pages/interview/interview.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon1: true,
    icon2: true,
    icon3: false,
    icon4: true,
    currentTab: 0,
  },
  // 签到
  sign_in:function(){
      wx.reLaunch({
        url: '../sign_in/sign_in',
      })
  },
  // 消息
  job_news: function () {
    wx.reLaunch({
      url: '../job_news/job_news',
    })
  },
  // 发布
  release: function () {
    wx.reLaunch({
      url: '../release/release',
    })
  },
  // 职位
  position: function () {
    wx.reLaunch({
      url: '../position/position',
    })
  },
  resume_details:function(e){
      wx.navigateTo({
        url: '../resume_details/resume_details',
      })
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
      wx.getStorage({
        key: 'company_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/Recruit/Obtain?QID=' + res.data + '&k=1',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
            },
            success: function (r) {
              console.log(r)
              // var 
              that.setData({
                // ids:
                jobc: r.data
              })
            }
          })
        },
      })
    }
    if (currentTab==1){
      wx.getStorage({
        key: 'company_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/Recruit/Obtain?QID=' + res.data + '&k=2',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
            },
            success: function (r) {
              console.log(r)
              // var 
              that.setData({
                // ids:
                yjob: r.data
              })
            }
          })
        },
      })
    }
    if (currentTab == 2) {
      wx.getStorage({
        key: 'company_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/Recruit/position?QID=' + res.data + '&k=3',
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
                yjobs: r.data
              })
            }
          })
        },
      })
    }
    if (currentTab == 3) {
      wx.getStorage({
        key: 'company_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/Recruit/position?QID=' + res.data + '&k=4',
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
                yjobss: r.data
              })
            }
          })
        },
      })
    }
  },
  content:function(e){
    console.log(e)
    this.setData({
      content: e.detail.value
    })
  },
  // 未到
  not: function (e) {
    var that = this
    var PID = e.currentTarget.id
    var Content = this.data.content
    wx.request({
      url: getApp().globalData.url + '/api/Recruit/upState?PID=' + PID + '&k=1' + '&Content=0',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
      },
      success: function (r) {
        console.log(r)
        if (r.data.code == 0) {
          wx.showToast({
            title: '通知成功',
            duration: 2000,
            success: function () {
              that.onLoad()
            }
          })
        }
      }
    })
  },
  
  // 通过
  pass: function (e) {
    var that = this
    var PID = e.currentTarget.id
    var Content = this.data.content
    wx.request({
      url: getApp().globalData.url + '/api/Recruit/upState?PID=' + PID + '&k=2' + '&Content=1',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
      },
      success: function (r) {
        console.log(r)
          if(r.data.code==0){
            wx.showToast({
              title: '通知成功',
              duration:2000,
              success:function(){
                that.onLoad()
              }
            })
          }
      }
    })
  },
  not_pass:function(e){
    var that = this
    var PID = e.currentTarget.id
    var Content = this.data.content
    console.log('Content', Content)
    if (Content==undefined){
      this.wetoast.toast({
        title:'请填写未通过原因',
        duration: 2000,
      })
    }
    else{
      wx.request({
        url: getApp().globalData.url + '/api/Recruit/upState?PID=' + PID + '&k=3' + '&Content=' + Content,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
          // 'content-type': 'application/json;charset=utf-8',
        },
        data: {
        },
        success: function (r) {
          console.log(r)
          if (r.data.code == 0) {
            wx.showToast({
              title: '通知成功',
              duration: 2000,
              success: function () {
                that.onLoad()
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
  onLoad: function () {
    new app.WeToast()
    var that=this
    wx.getStorage({
      key: 'company_ID',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/Recruit/Obtain?QID=' + res.data+'&k=1',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
            // 'content-type': 'application/json;charset=utf-8',
          },
          data: {
          },
          success: function (r) {
            console.log(r)
          // var 
            that.setData({
              // ids:
              jobc:r.data
            })
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