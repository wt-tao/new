// pages/release/release.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    index:'',
    xl:'',
    age:'',
    experience:'',
    icon1:true,
    icon2: true,
    icon3: true,
    icon4: true,
    currentTab: 0,
    Welf:[],
    ImgUrl1:'',
    ImgUrl2:'',
    ImgUrl3:'',
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
// 工资
  bindPickerChange: function (e) {
    var money = this.data.money
    console.log('工资发送选择改变，携带值为', money[e.detail.value].Dwname)
    this.setData({
      index: e.detail.value,
      Wage: money[e.detail.value].Dwname
    })
  },
  // 学历
  bindXlarrayrChange: function (e) {
    var education = this.data.education
    console.log('学历发送选择改变，携带值为', education[e.detail.value].Dwname)
    this.setData({
      xl: e.detail.value,
      XueLi: education[e.detail.value].Dwname
    })
  },
  // 年龄
  bindAgeArrayrChange: function (e) {
    var ages = this.data.ages
    console.log('年龄发送选择改变，携带值为', ages[e.detail.value].Dwname)
    this.setData({
      age: e.detail.value,
      Age: ages[e.detail.value].Dwname
    })
  },
  // 经验
  bindExperienceArrayChange: function (e) {
    var exp = this.data.exp
    console.log('经验发送选择改变，携带值为', exp[e.detail.value].Dwname)
    this.setData({
      experience: e.detail.value,
      Exp: exp[e.detail.value].Dwname
    })
  },
  // 职位名称
  job_name:function(e){
    this.setData({
      JobName: e.detail.value,
    })
  },
  // 积分
  jf: function (e) {
    this.setData({
      jf: e.detail.value,
    })
  },
  // 入职补助
  Subsidy:function(e){
    this.setData({
      Subsidy: e.detail.value,
    })
  },
  // 工作内容
  WorkC:function(e){
    this.setData({
      WorkC: e.detail.value,
    })
  },
  // 福利补充
  Supply:function(e) {
    this.setData({
      Supply: e.detail.value,
    })
  },
  // 公司地址
  Add: function (e) {
    this.setData({
      Add: e.detail.value
    })
  },
  // 福利选择
  select_date:function(e){
    console.log(e)
    var index = e.currentTarget.dataset.index
    var welfare = this.data.welfare
    var Welf = this.data.Welf
    welfare[index].checked = !welfare[index].checked
    // for (var i = 0; i < welfare.length;i++){
    //   Welf.push(e.currentTarget.dataset.name)
    // }
    if (welfare[index].checked==true){
      Welf.push(e.currentTarget.dataset.name) 
    }
    else{
      for(var i=0;i<Welf.length;i++){
        if (Welf[i] == e.currentTarget.dataset.name){
          // console.log('点击取消')
          Welf.splice(i,1)
          console.log('welfs', welfs)
          console.log('删除后',Welf)
        }
      }
    }
    var welfs = String(Welf)
    console.log('welfs', welfs)
     this.setData({
       welfare: welfare,
       welfs: welfs
           });
  },
  fb:function(e){
    console.log(e)
      var that=this
      var Adds=this.data.Add
    var add=e.currentTarget.dataset.add
    var JobName = this.data.JobName
    var XueLi = this.data.XueLi
    var Subsidy = this.data.Subsidy
    var Wage = this.data.Wage
    var Age = this.data.Age
    var Exp = this.data.Exp
    var jf=this.data.jf
    var WorkC = this.data.WorkC
    var Welfs = this.data.welfs
    var Supply = this.data.Supply
    var Add = Adds == undefined ? add : Adds
    // console.log('WorkC', WorkC)
    // console.log('Welfs', Welfs)
    // console.log('Supply', Supply)
    if (WorkC == undefined || Welfs == undefined || Supply == undefined || JobName == undefined || Subsidy == undefined || Wage == undefined || Age == undefined || Exp == undefined || XueLi == undefined ||jf==undefined){
      this.wetoast.toast({
        title: '信息未填写完整',
      duration: 2000,
      })
    }else{
      wx.getStorage({
        key: 'company_ID',
        success: function (resp) {
          console.log(resp)
            wx.request({
              url: getApp().globalData.url + '/api/Recruit/Post',
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
                // 'content-type': 'application/json;charset=utf-8',
              },
              data: {
                Add: Add,
                JobName: JobName,
                XueLi: XueLi,
                Subsidy: Subsidy,
                Wage: Wage,
                Age: Age,
                JiFen:jf,
                Exp: Exp,
                WorkC: WorkC,
                Welfare: Welfs,
                Supply: Supply,
                ID: resp.data,
              },
              success: function (res) {
                console.log(res)
                // wx.showToast({
                //   icon:'loading',
                //   duration:2000
                // })
                if(res.data.code==0){
                  that.wetoast.toast({
                    title: '已提交审核，审核通过自动发布',
                    duration:2000,
                    success:function(){
                      wx.reLaunch({
                        url: '../release/release',
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
                // that.setData({
                //   welfare: res.data
                // })

              }
            })
        },
      })
    }
    
  },
  
  qx:function(){
      wx.reLaunch({
        url: '../release/release',
      })
  },
  // 面试
  interview:function(){
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
  // 签到
  sign_in: function () {
    wx.reLaunch({
      url: '../sign_in/sign_in',
    })
  },
 
  // 职位
  position:function() {
    wx.reLaunch({
      url: '../position/position',
    })
  },
  // 发布动态
  // 标题
  title:function(e){
    console.log(e)
    this.setData({
      Title: e.detail.value
    })
  },
  // 详细内容
  Content: function (e) {
    this.setData({
      Content: e.detail.value
    })
  },
  ImgUrl1:function(){
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
            if(re.code==0){
              that.setData({
                ImgUrl1: re.url
              })
            }else{
              that.wetoast.toast({
                title:re.meg,
                duration:2000,
              })
            }

          }
        })
      }
    })
  },
  ImgUrl2: function () {
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
                ImgUrl2: re.url
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
  ImgUrl3: function () {
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
                ImgUrl3: re.url
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
  dongtfa:function(){
    var that=this
    var Title = this.data.Title
    var Content = this.data.Content
    var ImgUrl1 = this.data.ImgUrl1
    var ImgUrl2 = this.data.ImgUrl2
    var ImgUrl3 = this.data.ImgUrl3
    if (Title==undefined||Content==undefined){
      this.wetoast.toast({
        title:'请填写标题或内容',
        duration: 2000,
      })
    }else{
    wx.getStorage({
      key: 'company_ID',
      success: function (resp) {
        console.log(resp)
        wx.request({
          url: getApp().globalData.url + '/api/Recruit/put',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            // 'content-type': 'application/json;charset=utf-8',
          },
          data: {
            Title: Title,
            Content: Content,
            ImgUrl1: ImgUrl1,
            ImgUrl2: ImgUrl2,
            ImgUrl3: ImgUrl3,
            ID: resp.data,
          },
          success: function (res) {
            console.log(res)
            // wx.showToast({
            //   icon: 'loading',
            //   duration: 2000
            // })
            if (res.data.code == 0) {
              that.wetoast.toast({
                title: res.data.meg ,
                duration: 2000,
                success: function () {
                  wx.reLaunch({
                    url: '../release/release',
                  })
                }
              })
            }
            else {
              that.wetoast.toast({
                title: res.data.meg,
                duration: 2000,
              })
            }

          }
        })
      },
    })
    }
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
    wx.showToast({
      icon:'loading',
      duration:2000,
    })
    var that = this
    wx.getStorage({
      key: 'company_ID',
      success: function(res) {
        wx.request({
          // 职位福利
          url: getApp().globalData.url + '/api/Recruit/Get/'+res.data,
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
              Add:res.data
            })
          }
        })
      },
    })
    wx.request({  
      // 职位福利
      url: getApp().globalData.url + '/api/Down/Get/117',
      method: "GET",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        'content-type': 'application/json;charset=utf-8',
      },
      data: {
      },
      success: function (res) {
        // console.log(res)
        // for (var i = 0; i < res.data.length;i++){

        // }
        that.setData({
          welfare: res.data
        })

      }
    })
    wx.request({
      // 薪酬
      url: getApp().globalData.url + '/api/Down/Get/118',
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
          money: res.data
        })

      }
    })
    wx.request({
      // 学历
      url: getApp().globalData.url + '/api/Down/Get/119',
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
          education: res.data
        })

      }
    })
    wx.request({
      // 经验
      url: getApp().globalData.url + '/api/Down/Get/120',
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
          exp: res.data
        })

      }
    })
    wx.request({
      // 年龄
      url: getApp().globalData.url + '/api/Down/Get/123',
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
          ages: res.data
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