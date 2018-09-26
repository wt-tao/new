//index.js
//获取应用实例
let app = getApp()

Page({
  data: {
    url: getApp().globalData.urls 
  },
  // 电话号码
  phone: function (e) {
    console.log(e)
    this.setData({
      phone: e.detail.value
    })

  },
  // 密码
  password: function (e) {
    console.log(e)
    this.setData({
      password: e.detail.value
    })
  },
  //事件处理函数
  main: function() {
    var that=this
    var phone=this.data.phone
    var password = this.data.password
    if (phone==undefined||password==undefined){
      this.wetoast.toast({
        title:'手机号或密码为空',
        duration:2000,
      })
    }else{
      wx.request({
        url: getApp().globalData.url + '/api/Number/Get?phone=' + phone + '&pwd=' + password,
        method: "GET",
        data: {},
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
        },
        success: function (res) {
          console.log(res)
          if (res.data.code==0){
            console.log('招聘方')
            wx.setStorage({
              key: 'company_ID',
              data: res.data.Id,
            })
            that.wetoast.toast({
              title: '登录成功',
              duration: 2000,
              success: function () {
                wx.reLaunch({
                  url: '../release/release',
                })
              }
            })
          }
        else  if (res.data.code == -1) {
            console.log('求职者')
            wx.setStorage({
              key: 'user_ID',
              data: res.data.Id,
            })
            that.wetoast.toast({
              title: '登录成功',
              duration: 2000,
              success: function () {
                wx.reLaunch({
                  url: '../main/main',
                })
              }        
            })            
          }
          else{
            that.wetoast.toast({
              title: res.data.meg,
              duration: 2000,
            })
          }
        }
      })
    }
    // wx.navigateTo({
    //   url: '../main/main'
    // })
  },
  register:function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  forget_password:function(){
    wx.navigateTo({
      url: '../forget_password/forget_password',
    })
  },
 
  getPhoneNumber: function (e) { 
    var that=this
    wx.login({
      success: res => {
          wx.request({
            url: getApp().globalData.url + '/api/Number/Get?code=' + res.code + '&iv=' + e.detail.iv + '&encryptedData=' + e.detail.encryptedData,
            data: {
            },
            method: 'GET', 
            header: {
              'content-type': 'application/json'
            },
            success:function(res){
              console.log(res)
              var phoneNumbers=JSON.parse(res.data)
              console.log('phoneNumber', phoneNumbers)
              // wx.showToast({
              //   title: '登录中...',
              //   icon: 'loading',
              //   duration:2000,
              //   success:function(){
                  wx.request({
                    url: getApp().globalData.url + '/api/Number/post?phone=' + phoneNumbers.phoneNumber,
                    data: {
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/json'
                    },
                    success:function(r){
                      console.log(r)
                      if (r.data.code == 0) {
                        console.log('招聘方')
                        wx.setStorage({
                          key: 'company_ID',
                          data: r.data.Id,
                        })
                        that.wetoast.toast({
                          title: '登录成功',
                          duration: 2000,
                          success: function () {
                            wx.reLaunch({
                              url: '../sign_in/sign_in',
                            })
                          }
                        })
                      }
                      else  if (r.data.code == -1) {
                        console.log('求职者')
                        wx.setStorage({
                          key: 'user_ID',
                          data: r.data.Id,
                        })
                        that.wetoast.toast({
                          title: '登录成功',
                          duration: 2000,
                          success: function () {
                            wx.reLaunch({
                              url: '../main/main',
                            })
                          }
                        })
                      }
                      else {
                        that.wetoast.toast({
                          title: r.data.meg,
                          duration: 2000,
                        })
                      }
                    }
                  })
              //   }
              // })
            }
          })
      
      }
    })
   
  } ,
  onLoad: function () {
    //创建可重复使用的WeToast实例，并附加到this上，通过this.wetoast访问
    new app.WeToast()

    // var _this = this;
    // console.log(_this.WeToast)
    // this.wetoast.toast({
    //   title: '发送成功',
    //   duration: 2000,
    // })
  },

})
