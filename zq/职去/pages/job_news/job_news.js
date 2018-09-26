// pages/job_news/job_news.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: 'none',
    icon1: false,
    icon2: true,
    icon3: true,
    icon4: true,
    currentTab: 1,
  },
  // 签到
  sign_in: function () {
    wx.reLaunch({
      url: '../sign_in/sign_in',
    })
  },
  // 面试
  interview: function () {
    wx.reLaunch({
      url: '../interview/interview',
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
  resume: function(e) {
    wx.navigateTo({
      url: '../resume_details/resume_details?id='+e.currentTarget.id,
    })
  },
  ms: function (e) {
    console.log(e)
    this.setData({
      UID: e.currentTarget.id,
      ZID: e.currentTarget.dataset.zid,
      display: 'block',
    })
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
  //地点
  add:function(e){
    this.setData({
      Add: e.detail.value
    })
  },
  // 资料
  material: function (e) {
    this.setData({
      material: e.detail.value
    })
  },
  // 取消
  hideview: function (e) {
    
    this.setData({
      display: 'none',
    })
  },
  // 通知
  hideviews: function (e) {
      var that=this
      var UID=this.data.UID
    var ZID = this.data.ZID
      var date=this.data.date
    var dates = this.data.dates
    var material = this.data.material
    var Add=this.data.Add
  console.log(UID)
    if (date==undefined||dates==undefined||Add==undefined||material==undefined){
      this.wetoast.toast({
        title:'信息填写不完整',
        duration:2000,
      })
    }else{
      wx.getStorage({
        key: 'company_ID',
        success: function(res) {
          wx.request({
            // 职位福利
            url: getApp().globalData.url + '/api/Recruit/Post?QID=' + res.data + '&UID=' + UID + '&ZID=' + ZID,
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
              date: date,
              dates: dates,
              material: material,
              Add: Add,
            },
            success: function (res) {
              console.log(res)
              if(res.data.code==0){
                that.wetoast.toast({
                  title: '通知成功',
                  duration: 2000,
                  success:function(){
                    that.onShow()
                    that.setData({
                    display: 'none',
                  })
                  }
                })
              }else{
                that.wetoast.toast({
                  title: res.data.meg,
                  duration: 2000,
                })
              }

              // that.setData({
              //   system: res.data,
              // })

            }
          })
        },
      })
  
    }
 
  },

  currentTabs:function(e){
    var that=this
    var currentTab = e.detail.current
    this.setData({
      currentTab: e.detail.current
    })
    if (currentTab == 0) {

      wx.request({
        // 职位福利
        url: getApp().globalData.url + '/api/Public/Get?lmid=116&pageIndex=1&pageSize=10',
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
            system: res.data,
          })

        }
      })
    }
    else{
      console.log('currentTab',1)
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
      if (e.target.dataset.current==0){

        wx.request({
          //
          url: getApp().globalData.url + '/api/Public/Get?lmid=116&pageIndex=1&pageSize=10',
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
              system: res.data
            })

          }
        })
      }
      else{

      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    new app.WeToast()
    wx.showToast({
      icon: 'loading',
      duration: 2000,
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
    wx.getStorage({
      key: 'company_ID',
      success: function(res) {
        wx.request({
          //
          url: getApp().globalData.url + '/api/Recruit/put?QID='+res.data,
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
              news: res.data
            })

          }
        })
      },
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