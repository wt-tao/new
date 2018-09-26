// pages/resume/resume.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['男','女'],
    index:'0',
    // 当前身份
    identity:['学生','在职','待业'],
    ident:'0',
    // 城市
    // city:['大邑县','武侯区','高新区'],
    // city:'0',
  },
  // 选择性别
  bindPickerChange: function (e) {
    var array = this.data.array
    console.log('性别发送选择改变，携带值为', array[e.detail.value],)
    this.setData({
      sexs: array[e.detail.value],
      index: e.detail.value
    })
  },
  // 选择身份
  bindIdentityChange:function(e) {
    var identity = this.data.identity
    console.log('身份发送选择改变，携带值为', identity[e.detail.value],)
    this.setData({
      identitys: identity[e.detail.value],
      ident: e.detail.value
    })
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  day: function (e) {
    this.setData({
      day: e.detail.value
    })
  },
  city: function (e) {
    this.setData({
      city: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  emali: function (e) {
    this.setData({
      emali: e.detail.value
    })
  },
  educa: function (e) {
    this.setData({
      educa: e.detail.value
    })
  },
  exp: function (e) {
    this.setData({
      exp: e.detail.value
    })
  },
  save: function (e) {
    console.log(e)
    var that = this
    var xl = this.data.educa
    var exc = this.data.exp
    var resume = this.data.resume
    var name=this.data.name 
    var sex = this.data.sexs
    var identitys = this.data.identitys
    var day = this.data.day
    var city = this.data.city
    var phone = this.data.phone
    var emali = this.data.emali
    console.log('sex', sex)
    // 默认值
    var names = e.currentTarget.dataset.name
    var sexs = e.currentTarget.dataset.sex
    var idtity = e.currentTarget.dataset.idtity
    var days = e.currentTarget.dataset.day
    var citys = e.currentTarget.dataset.city
    var phones = e.currentTarget.dataset.phone
    var emalis = e.currentTarget.dataset.emali
    var EXC = e.currentTarget.dataset.exc
    var Xl = e.currentTarget.dataset.xl
    console.log('idtity', idtity)

    // 修改确定默认值
    let Name = name == undefined ? names : name
    let Sex = sex == undefined ? sexs : sex
    let Idtity = identitys == undefined ? idtity : identitys
    let Day = day == undefined ? days : day
    let City = city == undefined ? citys : city
    let Phone = phone == undefined ? phones : phone
    let Emali = emali == undefined ? emalis : emali
    let Exc = exc == undefined ? EXC : exc
    let XL = xl == undefined ? Xl : xl
    console.log('Exc', Exc)
    console.log('XL', XL)

    if (Name == '输入您的姓名' || Day == '列（2018-01）' || City == "请填写您的城市" || Phone == '请输入电话' || Emali == '请输入邮箱' || Exc == '例：1-3年' || XL == '例：本科') {
      this.wetoast.toast({
        title: '信息填写不完整',
        duration: 2000,
      })
    }
    else{
      wx.getStorage({
        key: 'user_ID',
        success: function (res) {
          wx.request({
            url: getApp().globalData.url + '/api/User/Post?UID=' + res.data,
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
              // 'content-type': 'application/json;charset=utf-8',
            },
            data: {
              ID: res.data,
              Name: Name,
              Sex: Sex,
              Idtity: Idtity,
              Day: Day,
              City: City,
              Phone: Phone,
              Emali: Emali,
              XL: XL,
              Exc: Exc,
            },
            success: function (r) {
              console.log(r)
              if(r.data.code==0){
                that.wetoast.toast({
                  title: '保存成功',
                  duration: 2000,
                  success:function(){
                    wx.reLaunch({
                      url: '../uesr/uesr',
                    })
                  }
                })
              }
            }
          })
        },
      })
   
    }
   

  },
   // 选择城市
  // bindCityChange:function(e) {
  //   console.log('城市发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     ident: e.detail.value
  //   })
  // },
  add_job:function(e){
      wx.navigateTo({
        url: '../add_job/add_job',
      })
  },
  education:function(e){
    wx.navigateTo({
      url: '../education/education',
    })
  },
  project:function(){
      wx.navigateTo({
        url: '../project/project',
      })
  },
  skill:function(){
      wx.navigateTo({
        url: '../skill/skill',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new app.WeToast()
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
      key: 'user_ID',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/User/Get?UID=' + res.data ,
          method: "GET",
          header: {
            // 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
            'content-type': 'application/json;charset=utf-8',
          },
          data: {
          },
          success: function (r) {
            console.log(r)
              that.setData({
                resume:r.data
              })
          }
        })
      },
    })
  },
  job_details:function(e){
    wx.navigateTo({
      url: '../add_job/add_job?id='+e.currentTarget.id,
    })
  },
  jeducation_details: function (e) {
    wx.navigateTo({
      url: '../education/education?id=' + e.currentTarget.id,
    })
  },
  project_details: function (e) {
    wx.navigateTo({
      url: '../project/project?id=' + e.currentTarget.id,
    })
  },
  Skill_details: function (e) {
    wx.navigateTo({
      url: '../skill/skill?id=' + e.currentTarget.id,
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