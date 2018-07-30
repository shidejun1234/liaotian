var winWidth = 0
var winHeight = 0
var diameter = 10
var time = 0

Page({
    data: {
        numX: 1,
        numY: 1
    },
    xy: {
        //小球的xy坐标
        x: 10,
        y: 10
    },

    onLoad: function (options) {
        var that=this;
        //进来先获取手机的屏幕宽度和高度
        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                winHeight = res.windowHeight;
                winWidth = res.windowWidth;
                that.setData({
                    winHeight: winHeight,
                    winWidth: winWidth
                });
            }
        })
    },

    onReady: function () {
        //循环滚动小球
        for (var i = 0; i < 1; i++) {
            //随机一个滚动的速度
            time = (1 + Math.random() * 10)
            setInterval(this.move, time);
            console.log(time)
        }
    },
    move() {
        //x 
        if (this.data.numX == 1) {
            this.xy.x++
        } else {
            this.xy.x--
        }

        //判断x轴的状态
        if (this.xy.x == winWidth - diameter) {
            this.data.numX = 2
        }
        if (this.xy.x == diameter) {
            this.data.numX = 1
        }

        //y
        if (this.data.numY == 1) {
            this.xy.y++
        } else {
            this.xy.y--
        }

        //判断y轴的状态
        if (this.xy.y == winHeight - diameter) {
            this.data.numY = 2
        }
        if (this.xy.y == diameter) {
            this.data.numY = 1
        }

        //画图
        this.ballMove(this.xy.x, this.xy.y);
    },


    ballMove(x, y) {
        // 使用 wx.createContext 获取绘图上下文 context
        var context = wx.createContext()
        // context.setShadow(0,1,6,'#000000')//阴影效果
        context.setFillStyle("#FF4500")//球的颜色
        context.setLineWidth(2)
        context.arc(x, y, diameter, 0, 2 * Math.PI, true)
        context.fill()

        // 调用 wx.drawCanvas，通过 canvasId 指定在哪张画布上绘制，通过 actions 指定绘制行为
        wx.drawCanvas({
            canvasId: 'ball',
            actions: context.getActions() // 获取绘图动作数组
        })
    }
})