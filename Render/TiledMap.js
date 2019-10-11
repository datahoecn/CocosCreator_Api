瓦块地图
    // 初始化地图的位置
    _initMapPos: function() {
        this.node.setPosition(cc.visibleRect.bottomLeft);
    },
	//设置移动方向的枚举值
	var MoveDirection = cc.Enum({
	    NONE: 0,
	    UP: 1,
	    DOWN: 2,
	    LEFT: 3,
	    RIGHT: 4
	});
	//移动处理函数
	_tryMoveToNewTile: function(newTile, mapMoveDir) {
		// var newTile = cc.v2(10, 10); 
		// mapMoveDir = 1;
		this._tiledMap = this.node.getComponent('cc.TiledMap');
        var mapSize = this._tiledMap.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return;
        //调用阻挡层相应格子中的数据，判断新格子是否有阻挡，如果有阻挡，直接返回
        if (this._layerBarrier.getTileGIDAt(newTile)) {
            cc.log('This way is blocked!');
            return false;
        }
        // 更新玩家位置
        this._curTile = newTile;
        this._updatePlayerPos();
        // 移动地图
        this._tryMoveMap(mapMoveDir);
        // 检查是否移动到终点，如果到终点了，显示胜利界面
        // check the player is success or not
        if (this._curTile.equals(this._endTile)) {
            cc.log('succeed');
            this._succeedLayer.active = true;
        }
    },
    // 更新主角的位置
    _updatePlayerPos: function() {
        //取得 _curTile 的格子坐标，并将主角精灵放置到这里
        var pos = this._layerFloor.getPositionAt(this._curTile);
        this._player.setPosition(pos);
    },

    //设置玩家当前所在格子距离屏幕边缘多少个格子时发生滚屏效果
	var minTilesCount = 2;
	//设置按键一次地图移动几个格子，这里设置移动 1 个格子
	var mapMoveStep = 1;

    //移动地图
    _tryMoveMap: function(moveDir) {
        // 取得地图的大小
        var mapContentSize = this.node.getContentSize();
        // 取得地图当前像素位置
        var mapPos = this.node.getPosition();
        // 取得玩家当前的像素位置
        var playerPos = this._player.getPosition();
        // 取得显示区域大小
        var viewSize = cc.size(cc.visibleRect.width, cc.visibleRect.height);
        // 取得格子大小
        var tileSize = this._tiledMap.getTileSize();
        // 取得玩家当前所在格子距离屏幕边缘多少像素时发生滚屏效果
        var minDisX = minTilesCount * tileSize.width;
        var minDisY = minTilesCount * tileSize.height;
        //玩家相对于地图的距离
        var disX = playerPos.x + mapPos.x;
        var disY = playerPos.y + mapPos.y;
        //新建变量存储地图的新位置
        var newPos;
        switch (moveDir) {
            case MoveDirection.UP://地图向上移动一格，计算像素位置向上偏移 mapMoveStep 个格子的高度
                if (disY < minDisY) {
                    newPos = cc.v2(mapPos.x, mapPos.y + tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.DOWN:
                if (viewSize.height - disY - tileSize.height < minDisY) {
                    newPos = cc.v2(mapPos.x, mapPos.y - tileSize.height * mapMoveStep);
                }
                break;
            case MoveDirection.LEFT:
                if (viewSize.width - disX - tileSize.width < minDisX) {
                    newPos = cc.v2(mapPos.x - tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            case MoveDirection.RIGHT:
                if (disX < minDisX) {
                    newPos = cc.v2(mapPos.x + tileSize.width * mapMoveStep, mapPos.y);
                }
                break;
            default:
                return;
        }
         //如果 newPos 有效
        if (newPos) {
            //计算滚屏的有效范围
            var minX = viewSize.width - mapContentSize.width - cc.visibleRect.left;
            var maxX = cc.visibleRect.left.x;
            var minY = viewSize.height - mapContentSize.height - cc.visibleRect.bottom;
            var maxY = cc.visibleRect.bottom.y;
            //把地图拉置限制在滚屏范围内
            if (newPos.x < minX) newPos.x = minX;
            if (newPos.x > maxX) newPos.x = maxX;
            if (newPos.y < minY) newPos.y = minY;
            if (newPos.y > maxY) newPos.y = maxY;
            //将地图位置设置为新位置
            if (!newPos.equals(mapPos)) {
                cc.log('Move the map to new position: ', newPos);
                this.node.setPosition(newPos);
            }
        }
	}


	// 代码创建
	CreateTileMap () {
		// 资源在 resources 下
        var url = 'tilemap/tile_iso_offset';
        this.onLoadTileMap(url);
    },
    onLoadTileMap (url) {
        cc.loader.loadRes(url, cc.TiledMapAsset, (err, tmxAsset) => {
            if (err) {
                cc.error(err);
                return;
            }
            this.onCreateTileMap(tmxAsset);
        });
    },
    onCreateTileMap (tmxAsset) {
    	// map_root 父节点
        this.map_root.destroyAllChildren();
        var node = new cc.Node();
        this.map_root.addChild(node);
        var tileMap = node.addComponent(cc.TiledMap);
        tileMap.tmxAsset = tmxAsset;
    },


	this._tiledMap = this.node.getComponent('cc.TiledMap');
	this._layerFloor = this._tiledMap.getLayer("floor");
	//获取左上角瓦片坐标为（0,0）的图块的像素坐标
	var pos = this._layerFloor.getPositionAt(0,0);
	//获得当前该图块的id，也就是gid（注意，这里的id是从1开始的，与TiledMap Editor中显示的不同，如果返回值为0，则为空）
	var gid = this._layerFloor.getTileGIDAt(0,0);

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

properties
	tmxAsset TiledMapAsset TiledMap 资源。
	__eventTargets Array Register all related EventTargets,...

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


TiledLayer

properties
	__eventTargets Array Register all related EventTargets 注册所有相关的事件目标

method
	getLayerName 	String	let layerName = tiledLayer.getLayerName(); 获取层的名称。
	SetLayerName 	tiledLayer.setLayerName("New Layer"); 设置层的名称
	getProperty 	Any		let property = tiledLayer.getProperty("info"); 获取指定属性名的值。
	getPositionAt 	Vec2	let pos = tiledLayer.getPositionAt(cc.v2(0, 0)); 获取指定 tile 的像素坐标。
							let pos = tiledLayer.getPositionAt(0, 0);
	setTileGIDAt 	tiledLayer.setTileGIDAt(tileGid, 10, 10, flag) // tileGid 需要加一
																	// flag 最好不填
													
	getTileGIDAt 	Number	let tileGid = tiledLayer.getTileGIDAt(0, 0);// tileGid 需要减一
						通过给定的 tile 坐标、flags（可选）返回 tile 的 GID. 
				 		如果它返回 0，则表示该 tile 为空。
				 							
	getTiledTileAt 	cc.TiledTile	let tile = tiledLayer.getTiledTileAt(100, 100, true);
					通过指定的 tile 坐标获取对应的 TiledTile。
					如果指定的坐标没有 tile，第三个参数为true 那么将会在指定的坐标创建一个新的 TiledTile 。
					在渲染这个 tile 的时候，将会使用 TiledTile 的节点的旋转、缩放、位移、颜色属性。
											
	setTiledTileAt 将指定的 tile 坐标替换为指定的 TiledTile。	
					参数列表 x Integer y Integer tiledTile cc.TiledTile
	getTexture 获取纹理。						Texture2D	let texture = tiledLayer.getTexture();
	setTexture 设置纹理。						tiledLayer.setTexture(texture);
	getLayerSize 获得层大小。					Size 	let size = tiledLayer.getLayerSize();
	getMapTileSize 获取 tile 的大小( tile 的大小可能会有所不同)。		Size  let mapTileSize = tiledLayer.getMapTileSize();
	getTileSet 获取 layer 的 info。									TMXTilesetInfo	let tileset = tiledLayer.getTileSet();
	setTileSet 设置 layer 的 info。									tiledLayer.setTileSet(tileset);
	getLayerOrientation 获取 Layer 方向(同地图方向)。					Number	let orientation = tiledLayer.getLayerOrientation();
	getProperties 获取 layer 的属性   	   							Array	let properties = tiledLayer.getProperties();
