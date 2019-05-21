ProgressBar//进度条
	BarSprite：精灵节点
	Mode：用来设置进度条的类型，包括横向、纵向、圆型三种类型。
	TotalLength：当进度条为横向类型时，用来设置进度达到最大值时精灵的长度。
	Progress：表示当前默认的进度值，这里的 0.3 表示 30%。
	Reverse：用来设置进度条沿 X 轴正向还是 X 轴反向变化，取消选中，表示沿 X 轴正向。

	this.verticalBar.progress = 0;

	圆型
		BarSprite 的 type 要设为 FILLED RADIAL