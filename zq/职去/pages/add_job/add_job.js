// pages/add_job/add_job.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'必填',
    dates: '必填',
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
  company:function(e){
    this.setData({
      company: e.detail.value
    })
  },
  position: function (e) {
    this.setData({
      position: e.detail.value
    })
  },
  text: function (e) {
    this.setData({
      text: e.detail.value
    })
  },

  save:function(){
    var that=this
    var Company = this.data.company
    var position = this.data.position
    var BegTime = this.data.date
    var EndTime = this.data.dates
    var Content = this.data.text
    // console.log('BegTime', BegTime)
    if (Company == undefined || position == undefined || BegTime == '必填' || EndTime =='必填'||Content==undefined){
      this.wetoast.toast({
        title: '信息填写不完整',
        duration: 2000,
      })
    }else{
        wx.getStorage({
          key: 'user_ID',
          success: function(res) {
            wx.request({
              url: getApp().globalData.url + '/api/User/job?UID=' + res.data +'&JID=0' + '&k=1',
              method: "POST",
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
                // 'content-type': 'application/json;charset=utf-8',
              },
              data:{
                  Company: Company,
                  position: position,
                  BegTime: BegTime,
                  EndTime: EndTime,
                  Content: Content,
              },
              success:function(r){
                console.log(r)
                if(r.data.ID!=0){
                  that.wetoast.toast({
                    title: '保存成功',
                    duration: 2000,
                    success: function () {
                      wx.navigateBack({
                        delta:1
                      })
                    }
                  })
                }
                else{
                  that.wetoast.toast({
                    title: r.data.meg,
                    duration: 2000,
                  })
                }
              }
            })
          },
        })
    }
  },
  saves: function () {
    var that = this
    var company = this.data.company
    var position = this.data.position
    var BegTime = this.data.date
    var EndTime = this.data.dates
    var Content = this.data.text

    // 初始数据
    var job=this.data.job
    var companys = job[0].profile1
    var positions = job[0].profile2
    // var BegTimes = job[0].BegTime
    // var EndTimes = job[0].EndTime
    var Contents = job[0].profile6

    console.log('BegTime', BegTime)

    var Company = company == undefined ? companys : company
    var Position = position == undefined ? positions : position
    var content = Content == undefined ? Contents : Content
    // console.log('BegTime', BegTime)
    // if (company == undefined || position == undefined || BegTime == '必填' || EndTime == '必填' || Content == undefined) {
    //   this.wetoast.toast({
    //     title: '信息填写不完整',
    //     duration: 2000,
    //   })
    // } 
    // else {
      var id=this.data.id
      wx.getStorage({
        key: 'user_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/User/job?UID=' + res.data + '&JID='+id+  '&k=2',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
              Company: Company,
              position: Position,
              BegTime: BegTime,
              EndTime: EndTime,
              Content: content,
            },
            success: function (r) {
              console.log(r)
              if (r.data.Company != '') {
                that.wetoast.toast({
                  title: '修改成功',
                  duration: 2000,
                  success: function () {
                    wx.navigateBack({
                      delta: 1
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
        },
      })
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    new app.WeToast()
    this.setData({
      id:options.id
    })
    if (options.id!=undefined){
      wx.getStorage({
        key: 'user_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/User/details?JID=' + options.id,
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
            },
            success: function (r) {
              console.log(r)
              var job = r.data
              // console.log(job[0].BegTime)
              that.setData({
                date: job[0].BegTime,
                dates: job[0].EndTime,
                job: job
              })
            }
          })
        },
      })
    }

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