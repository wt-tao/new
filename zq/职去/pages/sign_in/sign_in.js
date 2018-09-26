// pages/sign_in/sign_in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon1: true,
    icon2: false,
    icon3: true,
    icon4: true,
    currentTab:0,
    display: 'none',
    date: '选择时间',
    dates: '选择时间',

    true1:true,
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindDatesChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  // 搜索
  fly: function (e) {
    this.setData({
      count: e.detail.value
    })
  },
  search: function (e) {
    var that = this
    var count = this.data.count
    if (count == undefined) {
      wx.showToast({
        title: '未搜到结果...',
        icon: 'loading',
        duration: 2000,
      })
    } else {
      wx.getStorage({
        key: 'company_ID',
        success: function(res) {
          wx.request({
            url: getApp().globalData.url + '/api/Search/rySearch?k=' + count + '&QID='+res.data + '&pageIndex=1',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
            },
            success: function (res) {
              console.log(res)
              wx.showToast({
                title: '加载中...',
                icon: 'loading',
                duration: 2000,
                success: function () {
                  that.setData({
                    true1: false,
                    list: res.data
                  })
                }
              })


            }
          })
        },
      })

    }
  },


  // 面试
  interview: function () {
    wx.reLaunch({
      url: '../interview/interview',
    })
  },
  // 消息
  job_news: function () {
    wx.reLaunch({
      url: '../job_news/job_news',
    })
  },
  // 发布
  release:function(){
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
  saix:function(){
    this.setData({
      display: 'block',
    })
  },
  // 筛选阴影
  display: function () {
    this.setData({
      display: 'none',
    })
  },
  cx: function () {
    this.setData({
      display: 'none',
    })
  },
  Content:function(e){
    console.log(e)
    this.setData({
      Content:e.detail.value
    })
  },
  sign:function(e){
    console.log(e)
    var that=this
      var ID=e.currentTarget.id
      var UID=e.currentTarget.dataset.uid
    var Content = this.data.Content
    wx.request({
      url: getApp().globalData.url + '/api/Recruit/updSign?ID=' + ID +'&UID='+UID+'&k=1' +'&Content=0',
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
            title: '签到成功',
            duration:2000,
            success:function(){
              that.onLoad()
            }
          })
        } else {
          wx.showToast({
            title: r.data.meg,
            duration: 2000,
            success: function () {
              that.onLoad()
            }
          })
        }

      }
    })
  },
  lz: function (e) {
    console.log(e)
    var that = this
    var ID = e.currentTarget.id
    var UID = e.currentTarget.dataset.uid
    var Content = this.data.Content
    if (Content==undefined){
        wx.showToast({
          title: '请填写原因',
          icon:'loading',
          duration:2000,
        })
    }else{
      
    wx.request({
      url: getApp().globalData.url + '/api/Recruit/updSign?ID=' + ID + '&k=2' + '&Content=' + Content+'&UID='+UID,
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
            title: '离职成功',
            duration: 2000,
            success: function () {
              wx.reLaunch({
                url: '../sign_in/sign_in',
              })
            }
          })
        }
        else{
          wx.showToast({
            title: r.data.meg,
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
      var that = this
      wx.getStorage({
        key: 'company_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/Recruit/Sign?QID=' + res.data,
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
                job: r.data
              })
            }
          })
        },
      })
    }
    if (currentTab == 1) {
      var that = this
      wx.getStorage({
        key: 'company_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/Recruit/position?QID=' + res.data+'&k=4',
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
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this
    wx.getStorage({
      key: 'company_ID',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/Recruit/Sign?QID=' + res.data ,
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
              job: r.data
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