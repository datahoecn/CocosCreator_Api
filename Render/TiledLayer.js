properties
	_tiles 	array Gid的分布数组
	_mapTileSize	size 单个tile宽和高

method
	getLayerName 	String	let layerName = tiledLayer.getLayerName(); 获取层的名称。
	SetLayerName 	tiledLayer.setLayerName("New Layer"); 设置层的名称
	getProperty 	Any		let property = tiledLayer.getProperty("info"); 获取指定属性名的值。
	getPositionAt 	获取以左下角为原点的像素坐标 	Vec2	let pos = tiledLayer.getPositionAt(cc.v2(0, 0)); 
														let pos = tiledLayer.getPositionAt(0, 0);
	setTileGIDAt 	重新设置纹理，根据gid		tiledLayer.setTileGIDAt(tileGid, 10, 10) // tileGid 需要加一
													
	getTileGIDAt 	Number	let tileGid = tiledLayer.getTileGIDAt(0, 0);// tileGid 需要减一
						返回 tile 的 GID. 
				 		如果它返回 0，则表示该 tile 为空。
	getTexture 		获取纹理。	Texture2D	let texture = tiledLayer.getTexture();
	setTexture 		设置纹理。	tiledLayer.setTexture(texture);
	getLayerSize 	获得层大小。		Size 	let size = tiledLayer.getLayerSize();
	getMapTileSize  获取 tile 的大小( tile 的大小可能会有所不同)。		Size  let mapTileSize = tiledLayer.getMapTileSize();
	getTileSet 		获取layer 总览信息	TMXTilesetInfo	let tileset = tiledLayer.getTileSet();
	setTileSet 		设置 layer 的 Tileset 信息	tiledLayer.setTileSet(tileset);
	getLayerOrientation 获取 Layer 方向(同地图方向)。	Number	let orientation = tiledLayer.getLayerOrientation();
	getProperties   获取 layer 的属性   	  Array	let properties = tiledLayer.getProperties();
	
    // 只能获取到玩家自己创建的 TiledTile
    getTiledTileAt 	cc.TiledTile	let tile = tiledLayer.getTiledTileAt(100, 100, true);
					通过指定的 tile 坐标获取对应的 TiledTile。
					如果指定的坐标没有 tile，第三个参数为true 那么将会在指定的坐标创建一个新的 TiledTile 。
											
	setTiledTileAt 	将指定的 tile 坐标替换为指定的 TiledTile。	let newTiledTile = tiledLayer.setTiledTileAt (x, y, tiledTile)

TMXTilesetInfo
	firstGid: 1
	imageSize: Size {width: 1280, height: 720}
	margin: 0
	name: "new"
	sourceImage: cc_Texture2D {_super: null, _name: "", _objFlags: 0, _native: ".jpg", _hasMipmap: false, …}
	spacing: 0
	tileOffset: Vec2 {x: 0, y: 0}
	_tileSize: Size {width: 80, height: 80}
