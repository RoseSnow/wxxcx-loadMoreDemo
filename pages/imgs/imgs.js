//获取应用实例
const app = getApp()

Page({
  data:{
    hidden: true,
    windowHeight: 0,
    list:[],
    page: 1
  },

  // API接口：https://www.apiopen.top/meituApi?page=3
  
  onLoad(){
      // 获取屏幕高度
    wx.getSystemInfo({
      success: res => {
        this.setData({
          windowHeight: res.windowHeight
        })
        // console.log(res.windowHeight);
      }
    });

    // 调用getImages
    this.getImages();
  },

  // 请求数据
  // api: https://www.apiopen.top/meituApi?
  getImages(){
    // 模板字符串
    const apiUrl=`https://www.easy-mock.com/mock/5c36b5d2be0a1c39bfd57589/img/page=${this.data.page}`
    
    // const apiUrl = "https://www.apiopen.top/meituApi?page=" + this.data.page;
    wx.request({
      url: apiUrl,
      data:{
      },
      header:{
          'content-type': 'json'
      },
      success: res => {
        // console.log(res.data);
        // console.log(res.data.data.length);
          this.setData({
          // 把请求的数据存放到 data中的list中
          // list: res.data.data
          // 追加列表
          list: this.data.list.concat(res.data.data),
          })
      }
    })
  },
  
  //上划加载更多
  loadMore(){
    console.log(this.data.page);
    // console.log(this.data.listLength);
    if(this.data.page < 2){
      this.setData({
        page: this.data.page + 1,
        // 显示加载动画
        hidden: false
      });
      
      // 持续1.5秒的加载动画，并执行加载操作
      setTimeout( () => {
          this.setData({
              hidden: true  //隐藏加载动画
          })
          this.getImages()
      },1500);
    }else{
      wx.showLoading({
        title: "玩儿命加载中..."
      })
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast({
          title: '已经到底啦!'
        })
      }, 1000)
      
    }
  }
})