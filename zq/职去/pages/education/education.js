// pages/education/education.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    educations:['必填','高中及以下','大专','本科','研究生','博士'],
    educatio:'0',
    date: '必填',
    dates: '必填',
  },
//学历
  bindEducationChange: function (e) {
    console.log(e)
    var educations = this.data.educations
    console.log('picker发送选择改变，携带值为', educations[e.detail.value])
    this.setData({
      educatio: e.detail.value,
      education: educations[e.detail.value]
    })
  },
  // 开始时间
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //结束时间
  bindDatesChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  School:function(e){
    this.setData({
      School: e.detail.value
    })
  },
  major: function (e) {
    this.setData({
      major: e.detail.value
    })
  },
  save: function () {
    var that = this
    var School = this.data.School
    var Major = this.data.major
    var Education = this.data.education
    var BegTime = this.data.date
    var EndTime = this.data.dates
    // console.log('BegTime', BegTime)
    if (School == undefined || Major == undefined || BegTime == '必填' || EndTime == '必填' || Education == '必填') {
      this.wetoast.toast({
        title: '信息填写不完整',
        duration: 2000,
      })
    } else {
      // console.log('jinru')
      wx.getStorage({
        key: 'user_ID',
        success: function(res) {
          // console.log(res)
            wx.request({
              url: getApp().globalData.url + '/api/User/teach?UID=' + res.data + '&JID=1' + '&k=1',
              method:'POST',
              header:{
                //  'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
                  'content-type': 'application/json;charset=utf-8',
              },
              data:{
                  School: School,
                    Major: Major,
                    BegTime: BegTime,
                    EndTime: EndTime,
                    Education: Education,
              },
              success:function(r){
                  console.log(r)
                if (r.data.School!=''){
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
                // else{

                // }
              }
            })
        },
      })
    }
  },
  saves: function () {
    var that = this
    var School = this.data.School
    var Major = this.data.major
    var Education = this.data.education
    var BegTime = this.data.date
    var EndTime = this.data.dates
// 初始数据
    var education = this.data.education
    var Schools = education[0].profile1
    var Majors = education[0].profile2
    // var BegTimes = education[0].BegTime
    // var EndTimes = education[0].EndTime
    var Educations = education[0].profile3

    console.log('BegTime', BegTime)

    var schools = School == undefined ? Schools : School
    var majors = Major == undefined ? Majors : Major

    var id = this.data.id
      wx.getStorage({
        key: 'user_ID',
        success: function (res) {
          // console.log(res)
          wx.request({
            url: getApp().globalData.url + '/api/User/teach?UID=' + res.data + '&JID='+id + '&k=2',
            method: 'POST',
            header: {
               'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
              School: schools,
              Major: majors,
              BegTime: BegTime,
              EndTime: EndTime,
              Education: Education,
            },
            success: function (r) {
              console.log(r)
              if (r.data.School != '') {
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
              // else{

              // }
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
              var education = r.data
              console.log(education[0].profile3)
              that.setData({
                date: education[0].BegTime,
                dates: education[0].EndTime,
                educatio: education[0].profile3,
                education: education
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