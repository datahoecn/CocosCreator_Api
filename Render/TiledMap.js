瓦块地图
	// 代码创建
	CreateTileMap () {
        var url = 'tilemap/tile_iso_offset';
        cc.loader.loadRes(url, cc.TiledMapAsset, (err, tmxAsset) => {
            if (err) {
                cc.error(err);
                return;
            }
            var node = new cc.Node();
            this.parentNode.addChild(node);
            var tileMap = node.addComponent(cc.TiledMap);
            tileMap.tmxAsset = tmxAsset;
        });
    },



	this._tiledMap = this.node.getComponent('cc.TiledMap');
	this._layerFloor = this._tiledMap.getLayer("floor");

	//将像素坐标转化为瓦片坐标，posInPixel：目标节点的position
    _getTilePos: function(posInPixel) {
        //取得地图的大小
        var mapSize = this.node.getContentSize();
        //取得格子的大小
        var tileSize = this._tiledMap.getTileSize();
        //用像素位置除以格子大小，取整，计算格子的列与行索引
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
        //返回格子的列与行索引组成的 Vec2 值
        return cc.v2(x, y);
    },

瓦片图资源（TiledMap）
		地图所需资源有：
		.tmx 地图数据
		.png 图集纹理
		.tsx tileset 数据配置文件（部分 tmx 文件需要）

Tiled Map 官网
	https://www.mapeditor.org/
	单击官网右上角的“Download at itch.io”按钮，可下载最新版本

TiledMap
	propertie:
		只有 Tmx Asset 编辑框，用来选择 Tiled Map 编辑器制作的地图文件，后缀名为 tmx

    method
    	getMapSize 获取地图大小。							Size 			let mapSize = tiledMap.getMapSize();
    	getTileSize 获取地图背景中 tile 元素的大小。		Size 			let tileSize = tiledMap.getTileSize();
    	getMapOrientation 获取地图方向。					Number			let mapOrientation = tiledMap.getMapOrientation();
    	getObjectGroups 获取所有的对象层。					TiledObjectGroup[]		let objGroups = titledMap.getObjectGroups();
    	getObjectGroup 获取指定的 TMXObjectGroup。		TiledObjectGroup	let group = titledMap.getObjectGroup("Players");
    	getProperties 获取地图的属性。						Object[]		let properties = titledMap.getProperties();
    	getLayers 返回包含所有 layer 的数组。				TiledLayer[]	let layers = titledMap.getLayers();
    	getLayer 获取指定名称的 layer。					TiledLayer		let layer = titledMap.getLayer("Player");
    	getProperty 通过属性名称，获取指定的属性。			String			let property = titledMap.getProperty("info");
    	getPropertiesForGID 通过 GID ，获取指定的属性。	Object 			let properties = titledMap.getPropertiesForGID(GID);