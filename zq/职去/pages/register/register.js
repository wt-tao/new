// pages/register/register.js
var codes = require('../../utils/time.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.urls,
    ImgUrl1:'',
    tempFilePaths:'',
    currentTab: 0,
    isShow: false,         //默认按钮1显示，按钮2不显示
    sec: "60",　
      // 行业
    index:'0',
    // 性质
    indexs: '0',
  },
  // 行业
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value
    })
  },
  // 性质
  bindPickersChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexs: e.detail.value
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
  },
  // 求职者
  // 电话号码
  q_phone: function (e) {
    console.log(e)
    this.setData({
      q_phone: e.detail.value
    })

  },
  // 验证码
  q_yzm: function (e) {
    console.log(e)
    this.setData({
      q_yzm: e.detail.value
    })
  },
  // 密码
  q_password: function (e) {
    console.log(e)
    this.setData({
      q_password: e.detail.value
    })
  },
  // 注册
  mains:function(){
    var that=this
    var phone = this.data.q_phone
    var yzm = this.data.q_yzm
    var password = this.data.q_password
    if (phone == undefined || yzm == undefined || password == undefined){
      this.wetoast.toast({
        title: '信息填写不完整',
        duration: 2000,
      })
    }else{
      wx.request({
        url: getApp().globalData.url + '/api/Number/post?phone=' + phone + '&Code=' + yzm + '&Password=' + password ,
        method:'POST',
        data:{},
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
        },
        success:function(res){
          console.log(res)
          if(res.data.code==0){
            wx.request({
              url: getApp().globalData.url + '/api/Number/Get?phone=' + phone + '&pwd=' + password,
              method: "GET",
              data: {},
              header: {
                // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                'content-type': 'application/json;charset=utf-8',
              },
              success: function (re) {
                console.log(re)
                if (re.data.code == -1) {
                  wx.setStorage({
                    key: 'user_ID',
                    data: re.data.Id,
                  })
                  that.wetoast.toast({
                    title: '注册成功',
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
                    title: re.data.meg,
                    duration: 2000,
                  })
                }
              }
            })
          }
          else {
            that.wetoast.toast({
              title: '注册失败',
              duration: 2000,
            })
          }
        }
      })
    }
  },
  // 招聘方
  // 电话号码
  phone: function (e) {
    console.log(e)
    this.setData({
      phone: e.detail.value
    })

  },
  // 验证码
  yzm:function(e) {
    console.log(e)
    this.setData({
      yzm: e.detail.value
    })
  },
  // 密码
  password:function(e) {
    console.log(e)
    this.setData({
      password: e.detail.value
    })
  },
  // 公司名称
  company: function (e) {
    console.log(e)
    this.setData({
      company: e.detail.value
    })
  },
  // 公司地址
  company_addres:function(e) {
    console.log(e)
    this.setData({
      company_addres: e.detail.value
    })
  },
  // 公司详细地址
  Street: function (e) {
    console.log(e)
    this.setData({
      Street: e.detail.value
    })
  },
  img:function(){
    var that = this
    // var pics = this.data.pics
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
          that.setData({
            tempFilePaths: tempFilePaths,
          })
      }
    })
  },
  main:function(e){
    console.log(e)
    var that=this
    var phone = this.data.phone
    var ImgUrl1 = this.data.ImgUrl1
    console.log('ImgUrl1', ImgUrl1)
    var yzm = this.data.yzm
    var password = this.data.password
    var company = this.data.company
    var Street = this.data.Street
    var tempFilePaths = this.data.tempFilePaths
    var hy = e.currentTarget.dataset.hy
    
    var xz = e.currentTarget.dataset.xz
    console.log('hy',hy)
    console.log('tempFilePaths', tempFilePaths)
    
    var company_addres = this.data.company_addres
    console.log('company_addres', company_addres)
    if (phone == undefined || yzm == undefined || Street == undefined || password == undefined || company == undefined || company_addres == undefined || hy == undefined || xz == undefined  ){
        this.wetoast.toast({
          title: '信息填写不完整',
          duration: 2000,
        })
    }
    else if (tempFilePaths == undefined){
      this.wetoast.toast({
        title: '请上传营业执照',
        duration: 2000,
      })
    }
    else if (ImgUrl1 == '') {
      this.wetoast.toast({
        title: '请上传公司logo',
        duration: 2000,
      })
    }
    else{
      wx.uploadFile({
        url: getApp().globalData.url + '/api/Number/post?code=' + yzm + '&lmid=110',
        filePath: tempFilePaths,
        name: 'YyImg',
        method: "POST",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
        },
        formData: {
          HeadImg: ImgUrl1,
          Phone: phone,
          Password: password,
          CompanyNmae: company,
          Address: company_addres,
          YyImg: tempFilePaths,
          HyId: hy,
          XzId: xz,
        },
        success: function (res) {
          console.log(res)
          var re = JSON.parse(res.data);
          console.log(re)
          if (re.code ==0){
           
            wx.request({
              url: getApp().globalData.url + '/api/Number/Get?phone=' + phone + '&pwd=' + password,
              method: "GET",
              data:{},
              header: {
                // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                'content-type': 'application/json;charset=utf-8',
              },
              success:function(res){
                console.log(res)
                if (res.data.code == 0) {
                      wx.setStorage({
                        key: 'company_ID',
                        data: res.data.Id,
                      })
                      that.wetoast.toast({
                        title: '注册成功',
                        duration: 2000,
                        success: function () {
                          wx.reLaunch({
                            url: '../sign_in/sign_in',
                          })
                        }
                      })
                }
                else{
                  that.wetoast.toast({
                    title: re.data.meg,
                    duration: 2000,
                  })
                }
              }
            })
          }
          else{
            that.wetoast.toast({
              title: re.meg,
              duration: 2000,
            })
          }

        }
      })
    }
      
  },
    // 招聘方发送验证码
  getCode: function () {
    var phone = this.data.phone
    console.log(phone)
    var _this = this;　　　　//防止this对象的混杂，用一个变量来保存
    var time = _this.data.sec　　//获取最初的秒数
   
    if (phone==undefined||phone.length<11){
      _this.wetoast.toast({
        title: '请输入正确手机号',
        duration: 2000,
      })
    }else{
      codes.getCode(_this, time);　　//调用倒计时函数
    wx.request({
      url: getApp().globalData.url + '/api/Number/Get',
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8', 
      },
      data: {
        phone: phone,
      },
      success: function (res) {
        console.log(res)
       if(res.data==0){
         _this.wetoast.toast({
            title: '发送成功',
            duration: 2000,
          })
       }
       else if (res.data == -1) {
          _this.wetoast.toast({
            title: '手机号已注册',
            duration: 2000,
          })
        }
       else if (res.data == -2) {
         _this.wetoast.toast({
           title: '手机号格式错误',
           duration: 2000,
         })
       }
       else{
         _this.wetoast.toast({
           title: '发送失败',
           duration: 2000,
         })
       }

      }
    })
    }
  },
  // 求职者发送验证码
  getCodes: function () {
    var phone = this.data.q_phone
    console.log(phone)
    var _this = this;　　　　//防止this对象的混杂，用一个变量来保存
    var time = _this.data.sec　　//获取最初的秒数

    if (phone == undefined || phone.length < 11) {
      _this.wetoast.toast({
        title: '请输入正确手机号',
        duration: 2000,
      })
    } else {
      codes.getCode(_this, time);　　//调用倒计时函数
      wx.request({
        url: getApp().globalData.url + '/api/Number/Get',
        method: "GET",
        header: {
          // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
          'content-type': 'application/json;charset=utf-8',
        },
        data: {
          phone: phone,
        },
        success: function (res) {
          console.log(res)
          if (res.data == 0) {
            _this.wetoast.toast({
              title: '发送成功',
              duration: 2000,
            })
          }
          else if (res.data == -1) {
            _this.wetoast.toast({
              title: '手机号已注册',
              duration: 2000,
            })
          }
          else if (res.data == -2) {
            _this.wetoast.toast({
              title: '手机号格式错误',
              duration: 2000,
            })
          }
          else {
            _this.wetoast.toast({
              title: '发送失败',
              duration: 2000,
            })
          }

        }
      })
    }
  },
  ImgUrl1: function () {
    var that = this
    // var pics = this.data.pics
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
        // that.setData({
        //   tempFilePaths: tempFilePaths,
        // })
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
              that.setData({
                ImgUrl1: re.url
              })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //创建可重复使用的WeToast实例，并附加到this上，通过this.wetoast访问
    new app.WeToast()
    // this.wetoast.toast({
    //   title: '发送成功',
    //   duration: 2000,
    // })
    var that=this
    wx.request({
      url: getApp().globalData.url + '/api/Down/Get/111',
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
          Dwname:res.data
        })

      }
    })
    wx.request({
      url: getApp().globalData.url + '/api/Down/Get/112',
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
          Dwnamexz: res.data
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