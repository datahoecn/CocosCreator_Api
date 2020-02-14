HTTP 方式下的消息处理
	//使用 XMLHttpRequest 对象发送 GET 请求
    sendXHR: function () {
        //调用 cc.loader 方法实例一个 XMLHttpRequest 对象 xhr
        var xhr = cc.loader.getXMLHttpRequest();
        //返回的信息显示在 xhrResp 这个 Label 上
        this.streamXHREventsToLabel(xhr, this.xhr, this.xhrResp, 'GET');
        //使用 GET 方式打开网址
        xhr.open("GET", "https://httpbin.org/get?show_env=1", true);
        //如果是 Native 方式，设置 HTTP 的 RequestHeader
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        }
        //设置超时时长为 5 秒，如果不设置超时时长，就会一直等待直至获取响应
        xhr.timeout = 5000;
        //发送
        xhr.send();
        //将 xhr 保存到 _xhrXHR
        this._xhrXHR = xhr;
    },
    //使用 XMLHttpRequest 对象发送 POST 请求
    sendXHRAB: function () {
        //调用 cc.loader 方法实例一个 XMLHttpRequest 对象 xhr
        var xhr = cc.loader.getXMLHttpRequest();
        //返回的信息显示在 xhrABResp 这个 Label 上
        this.streamXHREventsToLabel(xhr, this.xhrAB, this.xhrABResp, "POST");
        //使用 POST 方式打开网址
        xhr.open("POST", "https://httpbin.org/post");
        //设置 HTTP 的 RequestHeader，发送文本数据
        xhr.setRequestHeader("Content-Type","text/plain");
        //发送一串字符数组
        xhr.send(new Uint8Array([1,2,3,4,5]));
        //将 xhr 保存到 _xhrHRAB
        this._xhrHRAB = xhr;
    },
    streamXHREventsToLabel: function ( xhr, eventLabel, label, method, responseHandler ) {
        //判断返回
        var handler = responseHandler || function (response) {
            return method + " Response (30 chars): " + response.substring(0, 30) + "...";
        };

        var eventLabelOrigin = eventLabel.string;
        // 遍历事件，在每个事件的回调函数中设置 eventLabel 显示触发事件，如果超时，Label 则显示“(timeout)”
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
                eventLabel.string = eventLabelOrigin + "\nEvent : " + eventname;
                if (eventname === 'timeout') {
                    label.string = '(timeout)';
                }
            };
        });

        //如果 xhr 状态改变，则在相应 Label 上显示提示文字
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200) {
                label.string = handler(xhr.responseText);
            }
        };
    },

WebSocket 方式下的消息收发
	prepareWebSocket: function () {

        var self = this;
        var websocketLabel = this.websocket;
        var respLabel = this.websocketResp;
        //创建一个 websocket 对象，连接指定服务地址
        this._wsiSendBinary = new WebSocket("ws://echo.websocket.org");
        //设置数据类型为字符数组
        this._wsiSendBinary.binaryType = "arraybuffer";
        //设置打开服务地址时的回调函数，websocketLabel 显示文字提示
        this._wsiSendBinary.onopen = function(evt) {
            websocketLabel.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.5");
        };
        //设置接收到消息后的回调函数
        this._wsiSendBinary.onmessage = function(evt) {
            //使用字符数组接收数据
            var binary = new Uint16Array(evt.data);
            var binaryStr = 'response bin msg: ';
            //解析字符数组，并转换成字符串
            var str = '';
            for (var i = 0; i < binary.length; i++) {
                if (binary[i] === 0)
                {
                    str += "\'\\0\'";
                }
                else
                {
                    var hexChar = '0x' + binary[i].toString('16').toUpperCase();
                    str += String.fromCharCode(hexChar);
                }
            }

            binaryStr += str;
            //将字符串设置为对应 Label 的显示文字
            respLabel.string = binaryStr;
            //websocketLabel 显示文字提示
            websocketLabel.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.6");
        };
        //设置接收消息出错时的回调函数
        this._wsiSendBinary.onerror = function(evt) {
            //websocketLabel 显示文字提示
            websocketLabel.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.7");
        };
        //设置 WebSocket 关闭时的回调函数
        this._wsiSendBinary.onclose = function(evt) {
            //websocketLabel 显示文字提示
            websocketLabel.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.8");
            //关闭后 WebSocket 不能再使用，置空
            self._wsiSendBinary = null;
        };
        //1 秒后调用一次 sendWebSocketBinary 函数
        this.scheduleOnce(this.sendWebSocketBinary, 1);
    },
    //调用 WebSocket，向服务网址发送消息
    sendWebSocketBinary: function(sender) {
        //如果 WebSocket 无效直接退出
        if (!this._wsiSendBinary) { return; }
        //如果 WebSocket 为打开状态
        if (this._wsiSendBinary.readyState === WebSocket.OPEN)
        {
            //设置提示文字
            this.websocket.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.9");
            //将字符串转换为字符数组
            var buf = "Hello WebSocket中文,\0 I'm\0 a\0 binary\0 message\0.";

            var arrData = new Uint16Array(buf.length);
            for (var i = 0; i < buf.length; i++) {
                arrData[i] = buf.charCodeAt(i);
            }
            //调用 send 函数将字符数组发送到服务网址
            this._wsiSendBinary.send(arrData.buffer);
        }
        else
        {
            //显示提示文字
            var warningStr = "send binary websocket instance wasn't ready...";
            this.websocket.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.10") + warningStr;
            //等 1 秒后尝试再次发送
            this.scheduleOnce(function () {
                this.sendWebSocketBinary();
            }, 1);
        }
    },

原始 Socket 方式下的消息收发
	//原生 Socket 方式进行事件测试时的响应函数
    testevent: function(data) {
        //如果原生 Socket 无效，直接退出
        if (!this.socketIO) { return; }

        var msg = this.tag + " says 'testevent' with data: " + data;
        this.socketIO.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.11") + msg;
    },
    //原生 Socket 方式收到消息后的响应函数
    message: function(data) {
        //如果原生 Socket 无效直接退出
        if (!this.socketIO) { return; }
        //设置 socketIOResp 显示接收到的消息
        var msg = this.tag + " received message: " + data;
        this.socketIOResp.string = msg;
    },
    //原生 Socket 方式被断开后的响应函数
    disconnection: function() {
        //如果原生 Socket 无效直接退出
        if (!this.socketIO) { return; }
        //设置 socketIOResp 显示断开提示
        var msg = this.tag + " disconnected!";
        this.socketIO.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.12") + msg;
    },
然后，创建 Socket，并添加监听函数的处理方法。

    //使用原生 Socket 发送消息
    sendSocketIO: function () {
        //如果没有导入 io 类，则不能使用，只好返回
        var self = this;
        if (typeof io === 'undefined') {
            cc.error('You should import the socket.io.js as a plugin!');
            return;
        }
        //调用 io 的 connect 方法连接服务器地址相应端口，返回 Socket
        var sioclient = io.connect("ws://tools.itharbors.com:4000", {"force new connection" : true});
        //存储 Socket
        this._sioClient = sioclient;
        //
        this.tag = sioclient.tag = "Test Client";

        //设置连接成功时的回调函数
        sioclient.on("connect", function() {
            //判断相应的 Label 是否有效，无效则返回
            if (!self.socketIO) { return; }
            //设置 Label 显示相应的连接提示
            var msg = sioclient.tag + " Connected!";
            self.socketIO.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.13") + msg;

            //调用 Socket 的 send 方法发送一个字符串
            self._sioClient.send("Hello Socket.IO!");
        });

        //设置收到消息时的回调函数为 message
        sioclient.on("message", this.message.bind(this));
        //设置打印收到测试返回时的回调函数
        sioclient.on("echotest", function (data) {
            if (!self.socketIO) { return; }

            cc.log("echotest 'on' callback fired!");
            var msg = self.tag + " says 'echotest' with data: " + data;
            self.socketIO.textKey = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.14") + msg;
        });
        //设置进行测试事件时的回调函数
        sioclient.on("testevent", this.testevent.bind(this));
        //设置断开连接时的回调函数
        sioclient.on("disconnect", this.disconnection.bind(this));
    },