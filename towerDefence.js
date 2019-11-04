预制节点 	tower 	节点尺寸 80*80
主公节点		player 	节点尺寸 80*80

Global.pathLayer 	地图路径图层
Global.gid_map 		地图gid分布
Global.road_data 	小怪行走路径数组
tower_layout 		塔的分布数组 草地（-1） 主公（1000）

tower 	this.curMonster
		this.curMonster.tower_arr
		tower_layout.setTag(this._x, this._y, -1);
        tower_layout.deleteTower(this._x, this._y);
		towerMgr.putNode(this.node);