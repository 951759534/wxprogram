Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1:"back",
    id2:"clear",
    id3:"addOr",
    id4:"+",
    id5:"9",
    id6: "8",
    id7: "7",
    id8: "-",
    id9: "6",
    id10: "7",
    id11: "4",
    id12: "*",
    id13: "3",
    id14: "2",
    id15: "1",
    id16: "/",
    id17: "0",
    id18: ".",
    id19: "history",
    id20: "=",
    screenData:"0",
    lastIsOperator:false,
    arr:[]   //通过一个数组维护键入的数
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
  history:function(){
      wx.navigateTo({
        url: '../list/list',
      })
  },
  btnclick:function (e) {
    var id = e.target.id;
    var sd = this.data.screenData;
      var data;
      if(id==this.data.id1){  //点击退格键
         data = this.data.screenData;
        if(data == 0){
          return;
        }
        data = data.substring(0,data.length-1);
        if(data == ""||data == "-"){
          data = 0;
        }
        this.setData({screenData:data});
        this.data.arr.pop();
      }else if(id == this.data.id2){//点击清屏键
        this.setData({ screenData:0})
        this.data.arr = [];
      }else if(id == this.data.id3){  //点击正负号键
          data = this.data.screenData;
          if(data == 0){
            return;
          }
          var firstWord = data.substring(0,1);
          if(firstWord == "-"){
              data = data.substring(1);
              this.data.arr.shift();
          }else{
            data = "-"+data;
            this.data.arr.unshift("-");
          }
          this.setData({ screenData: data })
      }else if(id == this.data.id20){
        data = this.data.screenData;
        if(data == 0){
          return;
        }
        var lastWord = data.substring(data.length-1);
        if(isNaN(lastWord)){
          return;
        }
        var arr = this.data.arr;
        var result = Number(arr[0]);
        for (var i = 1; i < arr.length;i++){
          if (isNaN(arr[i])){
            if (arr[i] == this.data.id4){
              result += Number(arr[i+1]);
            } else if (arr[i] == this.data.id8){
              result -= Number(arr[i+1]);
            } else if (arr[i] == this.data.id12){
              result *= Number(arr[i+1]);
            } else if (arr[i] == this.data.id16){
              result /= Number(arr[i+1])
            }
          }
        }
      var logs = wx.getStorageSync('callogs');
      if(!logs){
        logs = [];
      }      
       logs.push(data+"="+result);
       wx.setStorageSync("callogs", logs);
        this.data.arr = [];
        this.data.arr.push(result);
        this.setData({screenData:result});
      }else{
        if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
          if (this.data.lastIsOperator || this.data.screenData == 0) {
            return;
          }
        }
        if (sd == 0) {
          data = id;
        } else {
          data = sd + id;
        }
        this.setData({ screenData: data });
        this.data.arr.push(id);
        if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
          this.setData({ lastIsOperator: true })
        } else {
          this.setData({ lastIsOperator: false })
        }
      }
  
  }
}) 