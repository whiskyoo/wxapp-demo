const util = require('../../utils/util');

const app = getApp();
Page({
  data: {
    motto: 'Hello lsdsdfsdffh',
    userInfo: {},

  },
  // 事件处理函数
  bindViewTap() {
    const env = process.env.NODE_ENV;
    wx.navigateTo({
      url: '../logs/logs',
    });
  },
  onLoad() {
    const date = new Date();
    console.log(util.formatTime(date));
    const list = [...[1, 2, 3]];
    const that = this;
    // 调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo) => {
      // 更新数据
      that.setData({
        userInfo,
      });
    });
  },
});
