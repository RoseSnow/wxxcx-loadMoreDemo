//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    hidden: true,
    windowHeight: 0,
    list:[],
    page: 3
  },

  // API接口：https://www.apiopen.top/meituApi?page=3
  
  onLoad(){
      // 获取屏幕高度
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight
        })
        console.log(res.windowHeight);
      }
    });
    this.getImages()
  },

  // 请求数据
  getImages(){
    const apiUrl = "https://www.apiopen.top/meituApi?" + this.data.page;
    wx.request({
        url: apiUrl,
        data:{
        },
        header:{
            'content-type': 'json'
        },
        success: (res)=>{
            this.setData({
            // 追加列表
            list: this.data.list.concat(res.data.data)
            })
        }
    })
  },
  
  // 上划加载更多
  loadMore(){
    //console.log(this.data.page);
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
    },1500)
      
  },

  updateMore() {
      
  },
  
})
