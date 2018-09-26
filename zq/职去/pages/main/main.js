// pages/main/main.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // opacity:0,
    // display:'none',
    url:getApp().globalData.urls ,
    true1:true,
    true2:false,
  },
  daily_new:function(){
      wx.navigateTo({
        url: '../daily_new/daily_new',
      })
  },
  hot_position:function(){
      wx.navigateTo({
        url: '../hot_position/hot_position',
      })
  },
  all_position: function () {
    wx.navigateTo({
      url: '../all_position/all_position',
    })
  },
  tz: function() {
    wx.navigateTo({
      url: '../all_position/all_position',
    })
  },
  // 职位详情
  job_details:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../job_details/job_details?Zid=' + e.currentTarget.id,
    })
  },
  // 搜索
  fly:function(e){
      this.setData({
        count:e.detail.value
      })
  },
  search:function(e){
      var that=this
    var count = this.data.count
    if (count==undefined){
      wx.showToast({
        title:'未搜到结果...',
        icon:'loading',
        duration:2000,
      })
    }else{
      wx.request({
        url: getApp().globalData.url + '/api/Search/pstSearch?k=' + count +'&&pageIndex=1&pageSize=10',
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
            success:function(){
              that.setData({
                true1: false,
                true2: true,
                list: res.data
              })
            }
          })
         

        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
wx.showToast({
  title: '加载中...',
  icon:'loading',
  duration:2000
})


    var that=this
    // banner
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
        banner:res.data
      })

      }
    })
 
  },
  // map:function(){
  //   var that=this
  //   var ulat = this.data.ulat
  //   var ulng = this.data.ulng
  //   console.log('ulat', ulat)
  //   wx.openLocation({
  //     latitude: 30.640678,
  //     longitude: 104.036312,
  //   })
  // },
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
    wx.getLocation({
      success: function (res) {
        type: 'wgs84',// 默认wgs84
        console.log('地址', res)
        that.setData({
          ulat: res.latitude,
          ulng: res.longitude
        })
        wx.request({
          // 职位list
          url: getApp().globalData.url + '/api/Applicant/Get?term=1' + '&ulat=' + res.latitude + '&ulng=' + res.longitude,
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
              
              Applicant: res.data
            })

          }
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