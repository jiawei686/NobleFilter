
var app = getApp()
Page({
  data: {
    imgRoute : "",
    buttonDisplay : "",
    alertDisplay: "hideElement",
    filterDisplay : "hideElementFilter",
    alertText: "",
    filterNames: ["Normal","Cherry","Rose","Starlight","Gingham","Aden"],
    mainCanvasHeight: 0,
    mainCanvasWidth: 375,
    smallCanvasHeight: 0,
    touchLeft: 0,
    oldTouchX: -1,
    alreadySaved: 0,
    rightButtonFunction: 'confirmImg',
    rightButtonText: '确认',
    showModalStatus: false,
    rightButton: '',
    block_height: 0
  },


  // 弹出层
  powerDrawer: function (e) {
    var currentStatu = "open";
    if (e) {
      currentStatu = e.currentTarget.dataset.statu;
    }
    this.util(currentStatu);
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 0, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });
    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 0)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },






  //事件处理函数

  setImgRoute: function(route){
    this.setData({
        imgRoute : route
    })
  },
  setButtonDisplay: function(){
    this.setData({
        buttonDisplay : "hideElement"
    })
  },
  setFilterDisplay: function(){
    this.setData({
      filterDisplay : "displayElementFilter"
    })
  },
  setFilterUnDisplay: function () {
    this.setData({
      filterDisplay: "hideElementFilter"
    })
  },
  setAlertText: function(alertText){
      this.setData({
          alertText: alertText
      })
  },
  setMainImg: function(route){
      var that = this;
      const ctx = wx.createCanvasContext('mainCanvas');
            // const ctx2 = wx.createCanvasContext('mainCanvas');
            
      ctx.drawImage(route, 0, 0, that.data.mainCanvasWidth , that.data.mainCanvasHeight);
      console.log(that.data.mainCanvasHeight);
      ctx.setGlobalAlpha(0.9);
      ctx.draw();
  },
  setFilterImg: function(route){
    var that = this;
    for (var i = 0 ; i <= that.data.filterNames.length; i++){
      // const ctx = wx.createCanvasContext(that.data.filterNames[i]);
      // ctx.drawImage(route, 0, 0, 100, 60);
      // ctx.setGlobalAlpha(0.9);
      // ctx.draw();
      that.setAbsoluteFilter(that.data.filterNames[i],that.data.filterNames[i]);
    }
      
  },
  setAbsoluteFilter(filterImgName,filterName){
    var that = this;
    var canvasHeight = that.data.smallCanvasHeight,canvasWidth = 100;
    if(filterImgName == "mainCanvas") {
      canvasHeight = that.data.mainCanvasHeight;
      canvasWidth = that.data.mainCanvasWidth;
    }
    
    const ctx = wx.createCanvasContext(filterImgName);
    switch (filterName){
      case "Normal":{
        ctx.drawImage(that.data.imgRoute, 0, 0, canvasWidth,canvasHeight);
        ctx.draw();
        break;
      }
      case "Cherry":{
        ctx.setFillStyle('#AEAEEE');
        ctx.fillRect(0, 0, canvasWidth,canvasHeight)
        ctx.setGlobalAlpha(0.9);
        ctx.drawImage(that.data.imgRoute, 0, 0, canvasWidth,canvasHeight);
        ctx.draw();
        break;
      }
      case "Rose":{
        ctx.setFillStyle('brown');
        ctx.fillRect(0, 0, canvasWidth,canvasHeight)
        ctx.setGlobalAlpha(0.95);
        ctx.drawImage(that.data.imgRoute, 0, 0, canvasWidth,canvasHeight);
        ctx.draw();
        break;
      }
      case "Starlight":{
        ctx.setFillStyle('white');
        ctx.fillRect(0, 0, canvasWidth,canvasHeight)
        ctx.setGlobalAlpha(0.8);
        ctx.drawImage(that.data.imgRoute, 0, 0, canvasWidth,canvasHeight);
        ctx.draw();
        break;
      }
      case "Gingham": {
        ctx.setFillStyle('pink');
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        ctx.setGlobalAlpha(0.8);
        ctx.drawImage(that.data.imgRoute, 0, 0, canvasWidth, canvasHeight);
        ctx.draw();
        break;
      }
      case "Aden": {
        ctx.setFillStyle('#AEAEEE');
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        ctx.setGlobalAlpha(0.8);
        ctx.drawImage(that.data.imgRoute, 0, 0, canvasWidth, canvasHeight);
        ctx.draw();
        break;
      }
      default:{}
    }
  },
  chooseImg: function (){
    var that = this;
    
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            wx.getImageInfo({
              src: res.tempFilePaths[0],
              success: function (res) {
                console.log(res);
                if (res.height < 440 && res.width < 375) {
                  that.setData({
                    mainCanvasHeight: res.height,
                    mainCanvasWidth: res.width
                  })
                }
                else if (res.height >= 440 && res.height / 440 >= res.width / 375) {
                  that.setData({
                    mainCanvasHeight: 440,
                    mainCanvasWidth: 440 / res.height * res.width
                  })
                }
                else if (res.width >= 375 && res.height / 440 < res.width / 375) {
                  that.setData({
                    mainCanvasHeight: 375 / res.width * res.height,
                    mainCanvasWidth: 375
                  })
                }
                if (that.data.mainCanvasHeight < 440) {
                  that.setData({
                    block_height: (440 - that.data.mainCanvasHeight) / 2
                  })
                }
                else {
                  that.setData({
                    block_height: 0
                  })
                }

                that.setMainImg(tempFilePaths[0]);
                that.setImgRoute(tempFilePaths[0]);
                if (that.data.alertText) that.setAlertText("");
                that.setData({
                  rightButtonText: '确认',
                  rightButtonFunction: 'confirmImg',
                  rightButton: ''
                })
                that.setFilterUnDisplay();

              }
            })
            // that.setMainImg(tempFilePaths[0]);
            // that.setImgRoute(tempFilePaths[0]);
            // if(that.data.alertText) that.setAlertText("");
            
        }
    })
  },

  confirmImg : function(){
    if(!this.data.imgRoute){
      wx.showModal({
        title: '提示',
        content: '请选择图片！',
        showCancel: false
      })
    } 
    else {
      this.setFilterImg(this.data.imgRoute);
      console.log(this.data.imgRoute);
      // this.setButtonDisplay();
      this.setFilterDisplay();
      this.setData({
        rightButtonText: '保存',
        rightButtonFunction: 'savePictures',
        rightButton: 'rightButton'
      })
    }
  },
  changeFilter: function(event){
    var that = this;
    that.setAbsoluteFilter("mainCanvas",event.currentTarget.id)

  },


  // filterTouchMove: function (e) {
  //   if (this.data.oldTouchX == -1) {
  //     this.setData({
  //       oldTouchX: e.touches[0].clientX
  //     })

  //   }
  //   else {
  //     if (this.data.touchLeft + e.touches[0].clientX - this.data.oldTouchX > 0) {
  //       this.setData({
  //         touchLeft: 0,
  //         oldTouchX: -1
  //       });
  //     }
  //     else if (this.data.touchLeft + e.touches[0].clientX - this.data.oldTouchX < -140) {
  //       this.setData({
  //         touchLeft: -140,
  //         oldTouchX: -1
  //       });
  //     }
  //     else {
  //       this.setData({
  //         touchLeft: this.data.touchLeft + e.touches[0].clientX - this.data.oldTouchX,
  //         oldTouchX: e.touches[0].clientX
  //       });
  //     }


  //   }

  // },

  // filterTouchEnd: function () {
  //   this.setData({
  //     oldTouchX: -1
  //   })
  // },
  
  savePictures: function(){
    var that = this;
        // wx.getSetting({
          // success(res) {
          //   if (!res['scope.writePhotosAlbum']) {
          //     wx.authorize({
          //       scope: 'scope.writePhotosAlbum',
          //       success() {
    wx.canvasToTempFilePath({
      canvasId: 'mainCanvas',
      success: function success(res) {
        var tempFilePaths = res.tempFilePath;
        console.log(tempFilePaths);
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePaths,
          success(res) {
            wx.showToast({
              title: '保存成功',
            })
          }
        })

      },
      complete: function complete(e) {
        console.log(e.errMsg);
      }
    });
        //         }
        //       })
        //     }
        //   }
        // })
        
    //   }
    // })
    
  },

  cancelAlert: function(){
    this.setData({
      alertDisplay : "hideElement"
    })
  },


  onLoad: function () {
    console.log('onLoad');
    // this.setData({
    //   imgRoute: 'wxfile://tmp_1955374540o6zAJs2cOTlMkcuxYsaJKBse994w4a844d6606f0d9162c4ee903e4ee0e8d.png'
    // })
    // this.confirmImg();
    this.chooseImg();

    var that = this;


    // try {
    //   var value = wx.getStorageSync('version')
    //   if (!value || value != 'v2.0.0') {
    //     that.powerDrawer();
    //     try {
    //       wx.setStorageSync('version', 'v2.0.0');
    //     } catch (e) {
    //     }
    //   }
    // } catch (e) {
      
    // }
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },





  // 分享层
  onShareAppMessage: function () {
    return {
      title: 'Noble图片美化',
      path: 'pages/album/album',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
