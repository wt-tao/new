// pages/put_forward/put_forward.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      jf:options.jf
    })
    new app.WeToast()
  },
  money:function(e){
    this.setData({
      money:e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  sure:function(){
    var that=this
    var money = this.data.money
    var wxNum = this.data.phone
    var user_ID = wx.getStorageSync("user_ID")
    wx.request({
      url: getApp().globalData.url + '/api/User/Cash?UID=' + user_ID + '&money=' + money + '&wxNum=' + wxNum,
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
              that.wetoast.toast({
                title:'提交成功，请注意添加提现专用微信号17358650080为好友，我们将以转账的方式进行发放',
                duration:4000,
                success:function(){
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