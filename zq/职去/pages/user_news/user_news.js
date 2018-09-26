// pages/user_news/user_news.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  uesr_name:function(){
    wx.navigateTo({
      url: '../uesr_name/uesr_name',
    })
  },
  phone: function () {
    wx.navigateTo({
      url: '../uesr_phone/uesr_phone',
    })
  },
  img:function(){
    var that = this
    // var pics = this.data.pics
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
        wx.uploadFile({
          url: getApp().globalData.url + '/api/Public/post',
          filePath: tempFilePaths,
          name: 'img',
          method: "POST",
          header: {
            // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            'content-type': 'application/json;charset=utf-8',
          },
          formData: {
            img: tempFilePaths
          },
          success: function (res) {
            console.log(res)
            var re = JSON.parse(res.data);
            console.log(re)
            if (re.code == 0) {
              wx.getStorage({
                key: 'user_ID',
                success: function (res) {
                  wx.request({
                    // 职位福利
                    url: getApp().globalData.url + '/api/User/Post?UID=' + res.data + '&val=' + re.url + '&k=1',
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
                            title: '修改成功',
                            duration: 2000,
                            success:function(){
                              that.onShow()
                            }
                          })
                        }
                      

                    }
                  })
                },
              })
              // that.setData({
              //   ImgUrl1: re.url
              // })
            } else {
              that.wetoast.toast({
                title: re.meg,
                duration: 2000,
              })
            }

          }
        })

     
  
      }
    })
  },
 
  /**
   *
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.WeToast()
    console.log(options)
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
    wx.getStorage({
      key: 'user_ID',
      success: function (res) {
        wx.request({
          // 职位福利
          url: getApp().globalData.url + '/api/User/Get?UID=' + res.data + '&lmid=113',
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