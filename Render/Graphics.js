properties
    lineWidth Number 当前线条宽度
    lineJoin Graphics.LineJoin lineJoin 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性。
    lineCap Graphics.LineCap lineCap 指定如何绘制每一条线段末端。
    strokeColor Color 线段颜色
    fillColor Color 填充颜色
    miterLimit Number 设置斜接面限制比例
method
    moveTo 移动路径起点到坐标(x, y)
    lineTo 绘制直线路径
    bezierCurveTo 绘制三次贝赛尔曲线路径
    quadraticCurveTo 绘制二次贝赛尔曲线路径
    arc 绘制圆弧路径。
    ellipse 绘制椭圆路径。
    circle 绘制圆形路径。
    rect 绘制矩形路径。
    roundRect 绘制圆角矩形路径。
    fillRect 绘制填充矩形。
    clear 擦除之前绘制的所有内容的方法。
    close 将笔点返回到当前路径起始点的。
    stroke 根据当前的画线样式，绘制当前或已经存在的路径。
    fill 根据当前的画线样式，填充当前或已经存在的路径。



this.g = this.getComponent(cc.Graphics);
this.node.on('touchstart',function (event) {
    var pos = this.node.convertToNodeSpaceAR(event.getLocation());
    this.g.moveTo(this.pos.x, this.pos.y);
  }.bind(this));
this.node.on('touchmove',function (event) {
    var pos = this.node.convertToNodeSpaceAR(event.getLocation());
    this.g.lineTo(pos.x, pos.y);
    this.g.stroke();//绘出线条
    this.g.moveTo(pos.x, pos.y);
}.bind(this)); 


画线(lineto)
	var g = this.getComponent(cc.Graphics);
    g.lineWidth = 10;//绘制图形的线条宽度设置为 10
    g.fillColor.fromHEX('#ff0000');//内部填充颜色设置为红色,参数为 RGB 色值
    g.moveTo(-20, 0);//设置画笔的起点
    g.lineTo(0, -100);
    g.lineTo(20, 0);
    g.lineTo(0, 100);//终点
    g.close();//通知 Graphics 准备工作已完成
    g.stroke();//绘出线条
    g.fill();//填充内部颜色

绘制线条(linejoin)
	this.graphics = this.getComponent(cc.Graphics);
    this.graphics.lineWidth = 20;
    this.time = 0;
    this.radius = 100;

	let graphics = this.graphics;
    graphics.clear();//并清空屏幕

    let rx = this.radius * Math.sin(this.time);
    let ry = -this.radius * Math.cos(this.time);

    //线帽效果
	    // BUTT：默认效果，平直边缘。
		// ROUND：圆形线帽。
		// SQUARE：正方向线帽，经过肉眼观察，只是比 BUTT 稍长了一点。
    graphics.lineCap = LineCap.BUTT;

    //拐角处的关节
	 	// BEVEL：平角。
		// ROUND：圆角。
		// MITER：尖角。
    graphics.lineJoin = LineJoin.BEVEL;
    //每次调用 drawLine 都会根据 lineCap lineJoin 和参数绘制线条
    //如果加入close()会封口
    this.drawLine(-200, 0, rx, ry);

    drawLine: function (x, y, rx, ry) {
        let graphics = this.graphics;
        //移动到起点
        graphics.moveTo(x + rx, y + ry);
        //设置第一个线段的终点
        graphics.lineTo(x, y);
        //设置第二个线段的终点
        graphics.lineTo(x - rx, y + ry);
        //绘制出这两条线段
        graphics.stroke();
    }

绘制矩形(rect)
	var g = this.getComponent(cc.Graphics);
    g.lineWidth = 10;
    g.fillColor.fromHEX('#ff0000');
    //矩形
    //参数 1 表示左上角 X 位置，参数 2 表示左上角 Y 位置，参数 3 表示矩形宽度，参数 4 表示矩形高度。
    g.rect(-250,0, 200,100);
    //圆角矩形
    //前四个参数与 rect 函数参数的意义相同，第 5 个参数表示椭圆的圆角半径。
    g.roundRect(50,0, 200,100, 20);
    g.stroke();
    g.fill();

绘制圆形(circle)
	var g = this.getComponent(cc.Graphics);
	g.lineWidth = 10;
	g.fillColor.fromHEX('#ff0000');
	//用来绘制圆形，参数 1 表示圆心 X 位置，参数 2 表示圆心 Y 位置，参数 3 表示半径长度。
	g.circle(150,0, 100);
	//用来绘制椭圆，参数 1 表示左上角 X 位置，参数 2 表示左上角 Y 位置，参数 3 表示椭圆所处矩形的宽度，参数 4 表示椭圆所处矩形的高度。
	g.ellipse(-150,0, 100,70);
	g.stroke();
	g.fill();

绘制扇形(arc)
	var g = this.getComponent(cc.Graphics);

	g.lineWidth = 5;
	g.fillColor.fromHEX('#ff0000');
	//绘制扇形，
	//参数 1 表示圆心 X 位置，参数 2 表示圆心 Y 位置，参数 3 表示半径的尺寸
	//参数 4 表示起始弧度，参数 5 表示终止弧度，参数 6 表示绘制方向，逆时针是 true，顺时针为 false。
	g.arc(0, 0, 100, Math.PI/2, Math.PI, false);
	g.lineTo(0, 0);
	g.close();
	g.stroke();
	g.fill();

绘制曲线
	//本质上由一系列首尾相连的线段组成
	drawWave: function (time, options) {
		this.ctx = this.getComponent(cc.Graphics);
        this.ctx.lineCap = cc.Graphics.LineCap.BUTT;
        this.ctx.lineJoin = cc.Graphics.LineJoin.ROUND;
        this.ctx.clear();
        // 设置样式
        this.ctx.lineWidth = 1;
        this.ctx.strokeColor = cc.color(255, 255, 255, 100);

        // 设置第一条线段
        this.ctx.moveTo(0, cc.visibleRect.height/2);
        this.ctx.lineTo(cc.visibleRect.width, cc.visibleRect.height/2);
        //设置中间的线段
        for (let i = 0; i < this.waveWidth; i += options.segmentLength) {
            // Calculate where the next point is
            let point = this.getPoint(time, i, options);

            // Draw to it
            this.ctx.lineTo(point.x, point.y);
        }

        //设置最末条线段
        this.ctx.lineTo(this.width, this.yAxis);

        //绘制到屏幕
        this.ctx.stroke();
    },
