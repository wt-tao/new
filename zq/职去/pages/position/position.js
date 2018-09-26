// pages/position/position.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon1: true,
    icon2: true,
    icon3: true,
    icon4: false,
    display: 'none',
    sort: false,
    addres: false,
    xl: [],
    Welf: [],
    wa: [],
    show: 1,
    SingleCond: [{ 'id': 0, 'name': '智能排序' },
    { 'id': 1, 'name': '月薪从高到低' },
    { 'id': 2, 'name': '年龄从低到搞' },
    { 'id': 3, 'name': '工作经验要求从低到高' }]
  },
  // 面试
  interview: function () {
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
  // 发布
  release: function () {
    wx.reLaunch({
      url: '../release/release',
    })
  },
  // 签到
  sign_in: function () {
    wx.reLaunch({
      url: '../sign_in/sign_in',
    })
  },

  // 点击智能筛选
  sort: function () {
    this.setData({
      sort: true,
      addres: false,
      display: 'none',
    })
  },
  // 点击地区选择
  addres: function () {
    this.setData({
      addres: true,
      sort: false,
      display: 'none',
    })
  },
  // 点击智能筛选阴影
  bindSorttap: function (e) {
    this.setData({
      sort: false
    })
  },
  // 点击地区选择筛选阴影
  bindAddrestap: function (e) {
    this.setData({
      addres: false
    })
  },
  // 学历多选
  select_xuli: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var XueLi = this.data.XueLi
    var xl = this.data.xl
    XueLi[index].checked = !XueLi[index].checked
    if (XueLi[index].checked == true) {
      xl.push(e.currentTarget.dataset.name)
      // console.log('xl', xl)
    }

    else {
      console.log('xl', xl)
      for (var i = 0; i < xl.length; i++) {
        if (xl[i] == e.currentTarget.dataset.name) {
          // console.log('点击取消')
          xl.splice(i, 1)
          console.log('xls', xls)
          console.log('删除后', xl)
        }
      }
    }
    var xls = String(xl)
    console.log('xls', xls)
    this.setData({
      XueLi: XueLi,
      xls: xls
    });
  },
  // 福利选择
  select_date: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var Welfare = this.data.Welfare
    var Welf = this.data.Welf
    Welfare[index].checked = !Welfare[index].checked
    // for (var i = 0; i < welfare.length;i++){
    //   Welf.push(e.currentTarget.dataset.name)
    // }
    if (Welfare[index].checked == true) {
      Welf.push(e.currentTarget.dataset.name)
    }
    else {
      for (var i = 0; i < Welf.length; i++) {
        if (Welf[i] == e.currentTarget.dataset.name) {
          // console.log('点击取消')
          Welf.splice(i, 1)
          console.log('welfs', welfs)
          console.log('删除后', Welf)
        }
      }
    }
    var welfs = String(Welf)
    console.log('welfs', welfs)
    this.setData({
      Welfare: Welfare,
      welfs: welfs
    });
  },
  // 薪资多选
  select_wage: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var Wage = this.data.Wage
    var wa = this.data.wa
    Wage[index].checked = !Wage[index].checked
    if (Wage[index].checked == true) {
      wa.push(e.currentTarget.dataset.name)
    }
    else {
      for (var i = 0; i < wa.length; i++) {
        if (wa[i] == e.currentTarget.dataset.name) {
          // console.log('点击取消')
          wa.splice(i, 1)
          console.log('was', was)
          console.log('删除后', wa)
        }
      }
    }
    var was = String(wa)
    console.log('was', was)
    this.setData({
      Wage: Wage,
      was: was
    });
  },
  zw: function (e) {
    this.setData({
      zw: e.detail.value
    })
  },
  // 地区选择确定
  // 地区选择确定
  determine: function (e) {
    var that = this
    var add = this.data.adds
    wx.request({
      url: getApp().globalData.url + '/api/Search/AddScreen?add=' + add,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
      },
      success: function (res) {
        console.log(res)
        that.setData({
          Applicant: res.data,
          show: 3,
        })

      }
    })
    this.setData({
      addres: false
    })
  },
  // 筛选确定
  sure: function (e) {
    var that = this
    var zw = this.data.zw
    var was = this.data.was
    var welfs = this.data.welfs
    var xls = this.data.xls
    console.log('xls', xls)
    wx.request({
      // 职位list
      url: getApp().globalData.url + '/api/Search/Screen',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
        ZName: zw,
        Wage: was,
        Welfare: welfs,
        XueLi: xls,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          Applicant: res.data,
          show: 2,
        })

      }
    })
    this.setData({
      display: 'none',
    })
  },
  add: function (e) {
    var id = e.currentTarget.dataset.id
    var add = e.currentTarget.dataset.add

    this.setData({
      adds: add,
      ids: id
    })
  },
  // 只能筛选
  Cond: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    this.setData({
      ids: id
    })
    wx.request({
      url: getApp().globalData.url + '/api/Search/SingleCond?k=' + id,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
      },
      success: function (res) {
        console.log(res)
        that.setData({
          Applicant: res.data,
          show: 4,
        })

      }
    })

  },
  screen: function () {
    this.setData({
      sort: false,
      addres: false,
      display: 'block',
    })
  },
  // 筛选阴影
  display: function () {
    this.setData({
      display: 'none',
    })
  },
// 职位详情
  position_details:function(e){
      wx.navigateTo({
        url: '../position_details/position_details?id=' + e.currentTarget.id,
      })
  },
  del:function(e){
    var that=this
    var ZID = e.currentTarget.id
    wx.request({
      url: getApp().globalData.url + '/api/Recruit/delObtain?ZID=' + ZID,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
      },
      success: function (r) {
        console.log(r)
        if(r.data.code==0){
          wx.showToast({
            title: '删除成功',
            duration:2000,
            success:function(){
                that.onShow()
            }
          })
        }
        else{
          wx.showToast({
            title: r.data.meg,
            icon:"loading",
            duration: 2000,
          })
        }
   
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      // 职位list
      url: getApp().globalData.url + '/api/Search/condScreen',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
      },
      success: function (res) {
        console.log(res)
        that.setData({
          Wage: res.data.Wage,
          Welfare: res.data.Welfare,
          XueLi: res.data.XueLi,
        })

      }
    })
    // 地址
    wx.request({
      url: getApp().globalData.url + '/api/Search/Addcond',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        // 'content-type': 'application/json;charset=utf-8',
      },
      data: {
      },
      success: function (res) {
        console.log(res)
        that.setData({
          add: res.data
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
    var that = this
    wx.getStorage({
      key: 'company_ID',
      success: function (res) {
        wx.request({
          url: getApp().globalData.url + '/api/Recruit/Obtain?QID=' + res.data,
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值/
            // 'content-type': 'application/json;charset=utf-8',
          },
          data: {
          },
          success: function (r) {
            console.log(r)
            that.setData({
              Applicant: r.data
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