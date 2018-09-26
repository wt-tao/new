// pages/animation/animation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "Page animation",
    animation: '',
    display: 'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 1000,
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 100,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'left top 50%',
      success: function (res) {
        console.log(res)
      }
    })
  },
  /**
    * 旋转
    */
  rotate: function () {
    //顺时针旋转270度
    //scale:放大两倍
    // y平移10px>x,y顺时针倾斜>改变样式和设置宽度宽度
    // this.animation.rotate(270).step()
    this.animation.scale(3).step()
    // .translate(10).step().skew(10).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
  rotates:function() {
    //顺时针旋转270度
    //scale:放大两倍
    // y平移10px>x,y顺时针倾斜>改变样式和设置宽度宽度
    // this.animation.rotate(270).step()
    this.animation.scale(0).step()
    // .translate(10).step().skew(10).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
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