// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    say:function(e){
        var that=this;
        var message=e.detail.value.message;
        console.log(message);
        wx.request({
            url: "https://way.jd.com/turing/turing?info=" + message +"&loc=北京市海淀区信息路28号&userid=222&appkey=19847aaa46c2775f8a3ac558ddf7bb0a",
            success:function(res){
                console.log(res.data.result);
                that.setData({
                    message:res.data.result
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})