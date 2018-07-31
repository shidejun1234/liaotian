var nowTime = require('../../utils/nowTime.js');
Page({
    data: {
        message: [],
        inputMsg: "",
        scrollTop: 0,
        time: nowTime.formatTime(new Date())
    },
    onLoad: function (options) {
        var message = wx.getStorageSync('message');
        var top = message.length * 100;
        this.setData({
            message: message || [{
                content: "我是你老大",
                src: "../../images/timg.jpg",
                type: "1"
            }],
            scrollTop: top
        })

    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onUnload: function () {
        //wx.setStorageSync('message', this.data.message);
    },
    inputMsg: function (e) {
        this.setData({
            inputMsg: e.detail.value
        })
    },
    sendMessage: function (e) {
        var message = e.detail.value.input;
        this.setData({
            inputMsg: message
        })
        var that = this;
        if (this.data.inputMsg != "") {
            var msg = {
                type: 0,
                src: "https://wx.qlogo.cn/mmopen/vi_32/ugOPN01U8N9AL9iaVNyaqW1pOKawaMhyIicNlWRzczyZzPibOeU8FuNMDTPL8dA43wlXRx7Y84OwzaZjAeDeLgicfA/132",
                content: this.data.inputMsg
            };
            var inputMsg1 = this.data.inputMsg;
            var time = this.data.time;
            //发送信息
            this.setMessage(msg);
            //回复
            wx.request({
                url: "https://way.jd.com/turing/turing?info=" + message + "&loc=北京市海淀区信息路28号&userid=222&appkey=19847aaa46c2775f8a3ac558ddf7bb0a",
                header: {
                    "Content-type": "application/json"
                },
                data: {
                    info: msg.content
                },
                success: function (res) {
                    var reply = {
                        type: 1,
                        src: "../../images/timg.jpg",
                        content: res.data.result.text
                    };
                    wx.request({
                        url: 'http://120.77.251.239/message.php',
                        data:{
                            inputMsg: inputMsg1,
                            content: res.data.result.text,
                            time:time
                        }
                    })
                    that.setMessage(reply);
                    that.setData({
                        scrollTop: that.data.scrollTop + 300
                    })
                }
            })
        }
    },
    setMessage: function (msg) {
        var msgList = this.data.message;
        msgList.push(msg);
        this.setData({
            message: msgList,
            inputMsg: "",
        });
        // wx.request({
        //     url: 'http://localhost/message.php',
        //     data:{
        //         message: msgList
        //     },
        //     success:function(res){
        //         console.log(res);
        //     }
        // })
    }
})