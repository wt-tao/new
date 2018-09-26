// pages/skill/skill.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '必填',
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  text: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  save: function () {
    var that = this
    var name = this.data.name
    var BegTime = this.data.date
    var Content = this.data.text
    // console.log('BegTime', BegTime)
    if (name == undefined || BegTime == '必填'  || Content == undefined) {
      this.wetoast.toast({
        title: '信息填写不完整',
        duration: 2000,
      })
    } else {
      wx.getStorage({
        key: 'user_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/User/art?UID=' + res.data + '&JID=0' + '&k=1',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
              SkillName: name,
              GetTime: BegTime,
              Remarks: Content,
            },
            success: function (r) {
              console.log(r)
              if (r.data.SkillName != '') {
                that.wetoast.toast({
                  title: '保存成功',
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
    }
  },


  saves: function () {
    var that = this
    var name = this.data.name
    var BegTime = this.data.date
    var Content = this.data.text
    // console.log('BegTime', BegTime)
    // if (name == undefined || BegTime == '必填' || Content == undefined) {
    //   this.wetoast.toast({
    //     title: '信息填写不完整',
    //     duration: 2000,
    //   })
    // } else {


    // 初始数据
    var skill = this.data.skill
    var names = skill[0].profile1
    var Contents = skill[0].profile6

    var SkillName = name == undefined ? names : name
    var Remarks = Content == undefined ? Contents : Content

    var id = this.data.id
      wx.getStorage({
        key: 'user_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/User/art?UID=' + res.data + '&JID='+id + '&k=2',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
              SkillName: name,
              GetTime: BegTime,
              Remarks: Content,
            },
            success: function (r) {
              console.log(r)
              if (r.data.SkillName != '') {
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
    var that = this
    console.log(options)
    new app.WeToast()
    this.setData({
      id: options.id
    })
    if (options.id != undefined) {
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
              var project = r.data
              // console.log(project[0].profile3)
              that.setData({
                date: project[0].BegTime,
                skill: project
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