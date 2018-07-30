Page({
    data: {
        message: [],
        inputMsg: "",
        scrollTop: 0
    },
    onLoad: function (options) {
        var message = wx.getStorageSync('message');
        var top = message.length * 100;
        this.setData({
            message: message || [],
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
        wx.setStorageSync('message', this.data.message);
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
                    console.log(res.data.result);
                    var reply = {
                        type: 1,
                        src: "../../images/timg.jpg",
                        content: res.data.result.text
                    };
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
        wx.setStorageSync('message', this.data.message);
    }
})