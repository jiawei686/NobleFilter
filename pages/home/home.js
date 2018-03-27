// pages/home/home.js
Page({
  data: {
    animationData: {},
    BackgroundAnimation: {}
  },
  /**
   * 页面的初始数据
   */
  navi: function(){
    var BackgroundAnimation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    BackgroundAnimation.opacity(1).step();
    this.setData({
      BackgroundAnimation: BackgroundAnimation.export()
    })
    setTimeout(function(){
      wx.navigateTo({
        url: '/pages/album/album',
      })
    },1000)
    
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var BackgroundAnimation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    BackgroundAnimation.scale(0,0).step();
    this.setData({
      BackgroundAnimation: BackgroundAnimation.export()
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
  
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})