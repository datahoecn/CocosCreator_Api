
CocosCreator中可视区域外的节点依然会被渲染，所以屏幕外和mask外的节点需要自己手动active=false，
对于TileMap，需要添加：cc.macro.ENABLE_TILEDMAP_CULLING = true;

TileMap坐标转换
    TileMap坐标：以地图左上角为原点(0,0)，X轴向右增加，Y轴向下增加
    OpenGL坐标：以地图左下角为原点(0,0)，X轴向右增加，Y轴向上增加
    Creator坐标：以节点中心点为原点(0,0)，X轴向右增加，向左减少，Y轴向上增加，向下减少

正常地图
    public tileToOpengl(point: cc.Vec2) {
      let mapSize = this._tileMap.getMapSize();
      let tileSize = this._tileMap.getTileSize();
      let x = point.x * tileSize.width + tileSize.width / 2;
      let y = (mapSize.height - point.y) * tileSize.height - tileSize.height / 2;

      return cc.v2(x, y);
    }

    public openglToTile(point: cc.Vec2) {
      let mapSize = this._tileMap.getMapSize();
      let tileSize = this._tileMap.getTileSize();
      let x = Math.floor(point.x / tileSize.width);
      let y = Math.floor((mapSize.height * tileSize.height - point.y) / tileSize.height);

      return cc.v2(x, y);
    }

45 度交错
    public tileToOpengl(point: cc.Vec2) {
      let mapSize = this._tileMap.getMapSize();
      let tileSize = this._tileMap.getTileSize();
      let x = point.x * tileSize.width + Math.floor(point.y % 2) * tileSize.width / 2;
      let y = (mapSize.height - (point.y + 1)) * tileSize.height / 2 - tileSize.height / 2;

      return cc.v2(x, y);
    }

    public openglToTile(point: cc.Vec2) {
      let mapSize = this._tileMap.getMapSize();
      let tileSize = this._tileMap.getTileSize();
      let y = Math.floor((mapSize.height - 2 - ((2 * Math.floor(point.y) / Math.floor(tileSize.height)))));
      let x = Math.floor(point.x / tileSize.width - (y % 2) / 2);

      return cc.v2(x, y);
    }


public openglToScreen(point: cc.Vec2) {
  let mapSize = this._tileMap.getMapSize();
  let tileSize = this._tileMap.getTileSize();
  let x = point.x - mapSize.width * tileSize.width / 2;
  let y = point.y - mapSize.height * tileSize.height / 2;

  return cc.v2(x, y);
}

public screenToOpengl(point: cc.Vec2) {
  let mapSize = this._tileMap.getMapSize();
  let tileSize = this._tileMap.getTileSize();
  let x = point.x + mapSize.width * tileSize.width / 2;
  let y = point.y + mapSize.height * tileSize.height / 2;

  return cc.v2(x, y);
}



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