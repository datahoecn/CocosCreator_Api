瓦块地图

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
	__eventTargets Array Register all related EventTargets,...

method
	getLayerName 获取层的名称。				String	let layerName = tiledLayer.getLayerName();
	SetLayerName 设置层的名称							tiledLayer.setLayerName("New Layer");
	getProperty 获取指定属性名的值。			Any		let property = tiledLayer.getProperty("info");
	getPositionAt 获取指定 tile 的像素坐标。	Vec2	let pos = tiledLayer.getPositionAt(cc.v2(0, 0));
													let pos = tiledLayer.getPositionAt(0, 0);
	setTileGIDAt 设置给定坐标的 tile 的 gid (gid = tile 全局 id)， tile 的 GID 可以使用方法 “tileGIDAt” 来获得。
				 如果一个 tile 已经放在那个位置，那么它将被删除。
													tiledLayer.setTileGIDAt(1001, 10, 10, 1)
	getTileGIDAt 通过给定的 tile 坐标、flags（可选）返回 tile 的 GID. 
				 如果它返回 0，则表示该 tile 为空。
				 							Number	let tileGid = tiledLayer.getTileGIDAt(0, 0);
	getTiledTileAt 通过指定的 tile 坐标获取对应的 TiledTile。
				如果指定的坐标没有 tile，并且设置了 forceCreate 那么将会在指定的坐标创建一个新的 TiledTile 。
				在渲染这个 tile 的时候，将会使用 TiledTile 的节点的旋转、缩放、位移、颜色属性。
											cc.TiledTile	let tile = tiledLayer.getTiledTileAt(100, 100, true);
	setTiledTileAt 将指定的 tile 坐标替换为指定的 TiledTile。	参数列表 x Integer
																	y Integer
																	tiledTile cc.TiledTile
	getTexture 获取纹理。						Texture2D	let texture = tiledLayer.getTexture();
	setTexture 设置纹理。						tiledLayer.setTexture(texture);
	getLayerSize 获得层大小。					Size 	let size = tiledLayer.getLayerSize();
	getMapTileSize 获取 tile 的大小( tile 的大小可能会有所不同)。		Size  let mapTileSize = tiledLayer.getMapTileSize();
	getTileSet 获取 layer 的 Tileset 信息。									TMXTilesetInfo	let tileset = tiledLayer.getTileSet();
	setTileSet 设置 layer 的 Tileset 信息。									tiledLayer.setTileSet(tileset);
	getLayerOrientation 获取 Layer 方向(同地图方向)。					Number	let orientation = tiledLayer.getLayerOrientation();
	getProperties 获取 layer 的属性，可以使用 Tiled 编辑器添加属性。	Array	let properties = tiledLayer.getProperties();
