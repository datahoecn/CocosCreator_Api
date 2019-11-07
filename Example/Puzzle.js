//设置移动方向的枚举值
var MoveDirection = cc.Enum({
    NONE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
});
//设置玩家当前所在格子距离屏幕边缘多少个格子时发生滚屏效果
var minTilesCount = 2;
//设置按键一次地图移动几个格子，这里设置移动 1 个格子
var mapMoveStep = 1;
//判断触屏偏移的绝对值最小阙值
var minMoveValue = 50;

cc.Class({
    extends: cc.Component,
    editor: {
        requireComponent: cc.TiledMap
    },

    properties: {
        _touchStartPos: {
            default: null,
            serializable: false,
        },
        _touching: {
            default: false,
            serializable: false,
        },

        _isMapLoaded : {
            default: false,
            serializable: false,
        },
        //地表层的名称
        floorLayerName: {
            default: 'floor'
        },
        //山体阻挡层的名称
        barrierLayerName: {
            default: 'barrier'
        },
        //入口和出口所在的物品层的名称
        objectGroupName: {
            default: 'players'
        },
        //表示起点的 Object 名称
        startObjectName: {
            default:'SpawnPoint'
        },
        //成功到达终点后的界面显示节点名称
        successObjectName: {
            default:'SuccessPoint'
        }
    },

    // use this for initialization
    onLoad: function () {
        //从当前地图中取得 player 节点
        this._player = this.node.getChildByName('player');
        if (! this._isMapLoaded) {
            this._player.active = false;
        }
        //设置按键松开时的事件监听函数
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);
        //设置触屏点击时的响应函数，记录是否触屏，以及触屏位置点
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this._touching = true;
            this._touchStartPos = event.touch.getLocation();
        });
        //设置触屏离开时的响应函数，记录是否触屏，以及触屏位置点
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            if (!this._touching || !this._isMapLoaded || this._succeedLayer.active) return;
            //重置触屏标记
            this._touching = false;
            //取得当前触屏松开时位置点，然后与触屏点击时的位置点相减，计算偏移的横向和纵向移动距离
            var touchPos = event.touch.getLocation();
            var movedX = touchPos.x - this._touchStartPos.x;
            var movedY = touchPos.y - this._touchStartPos.y;
            var movedXValue = Math.abs(movedX);
            var movedYValue = Math.abs(movedY);
            if (movedXValue < minMoveValue && movedYValue < minMoveValue) {
                // touch moved not enough
                //如果移动距离小于最小阙值，直接返回，否则开始移动
                return;
            }
            //计算当前主角所在格子位置
            var newTile = cc.v2(this._curTile.x, this._curTile.y);
            var mapMoveDir = MoveDirection.NONE;
            //如果横向移动距离大于纵向移动距离，根据上面相减结果的正负值判断移动方向
            if (movedXValue >= movedYValue) {
                // move to right or left
                if (movedX > 0) {
                    newTile.x += 1;
                    mapMoveDir = MoveDirection.LEFT;
                } else {
                    newTile.x -= 1;
                    mapMoveDir = MoveDirection.RIGHT;
                }
            } else {
                // move to up or down
                if (movedY > 0) {
                    newTile.y -= 1;
                    mapMoveDir = MoveDirection.DOWN;
                } else {
                    newTile.y += 1;
                    mapMoveDir = MoveDirection.UP;
                }
            }
            this._tryMoveToNewTile(newTile, mapMoveDir);
        });
    },
    //场景被销毁时调用，释放对按键的监听
    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);
    },
    //重新开始游戏时调用的函数，对游戏进行重置
    restartGame: function() {
        //隐藏胜利界面
        this._succeedLayer.active = false;
        //初始化地图的位置
        this._initMapPos();
        //设置当前玩家所在格子为起点
        this._curTile = this._startTile;
        //更新主角的位置
        this._updatePlayerPos();
    },
    //场景加载完成后由系统调用开始函数，并做一些数据准备工作
    start: function(err) {
        if (err) return;

        //初始化地图的位置
        this._initMapPos();

        //取得胜利界面，并设置为隐藏
        this._succeedLayer = this.node.getParent().getChildByName('succeedLayer');
        this._succeedLayer.active = false;

        //取得当前 Tiled Map 组件
        this._tiledMap = this.node.getComponent('cc.TiledMap');
        // 通过 Tiled Map 组件的 getObjectGroup 函数取得物体层的物体容器
        var objectGroup = this._tiledMap.getObjectGroup(this.objectGroupName);
        if (!objectGroup) return;
        //通过参数名称取得起点和终点 Object
        var startObj = objectGroup.getObject(this.startObjectName);
        var endObj = objectGroup.getObject(this.successObjectName);
        if (!startObj || !endObj) return;
        //取得起点和终点对应的像素位置
        var startPos = cc.v2(startObj.x, startObj.y);
        var endPos = cc.v2(endObj.x, endObj.y);
         //通过参数名称调用 Tiled Map 的 getLayer 获取地表层和阻挡层
        this._layerFloor = this._tiledMap.getLayer(this.floorLayerName);
        this._layerBarrier = this._tiledMap.getLayer(this.barrierLayerName);
        if (!this._layerFloor || !this._layerBarrier) return;
        //设置当前位置所在的格子为起点所在的格子
        this._curTile = this._startTile = this._getTilePos(startPos);
        //设置终点格子的位置
        this._endTile = this._getTilePos(endPos);
        //如果主角存在，则更新主角位置，并显示主角
        if (this._player) {
            this._updatePlayerPos();
            this._player.active = true;
        }
        //设置地图加载完成
        this._isMapLoaded = true;
    },
    // 初始化地图的位置
    _initMapPos: function() {
        this.node.setPosition(cc.visibleRect.bottomLeft);
    },
    // 更新主角的位置
    _updatePlayerPos: function() {
        //取得 _curTile 的格子坐标，并将主角精灵放置到这里
        var pos = this._layerFloor.getPositionAt(this._curTile);
        this._player.setPosition(pos);
    },
    //取得格子的像素位置
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
    //按键监听函数
    _onKeyPressed: function(event) {
        //如果地图未加载成功或已胜利，直接返回即可
        if (!this._isMapLoaded || this._succeedLayer.active) return;
        //取得当前格子的列与行索引
        var newTile = cc.v2(this._curTile.x, this._curTile.y);
        //根据按键对格子索引进行操作，让地图移动到下一个格子里
        var mapMoveDir = MoveDirection.NONE;
        switch(event.keyCode) {
            case cc.macro.KEY.up:
                //按向上键，地图向下移动一格
                newTile.y -= 1;
                mapMoveDir = MoveDirection.DOWN;
                break;
            case cc.macro.KEY.down:
                //按向下键，地图向上移动一格
                newTile.y += 1;
                mapMoveDir = MoveDirection.UP;
                break;
            case cc.macro.KEY.left:
                newTile.x -= 1;
                mapMoveDir = MoveDirection.RIGHT;
                break;
            case cc.macro.KEY.right:
                newTile.x += 1;
                mapMoveDir = MoveDirection.LEFT;
                break;
            default:
                return;
        }
        //移动处理函数
        this._tryMoveToNewTile(newTile, mapMoveDir);
    },

    _tryMoveToNewTile: function(newTile, mapMoveDir) {
        var mapSize = this._tiledMap.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return;
        //调用阻挡层相应格子中的数据，判断新格子是否有阻挡，如果有阻挡，直接返回
        if (this._layerBarrier.getTileGIDAt(newTile)) {
            cc.log('This way is blocked!');
            return false;
        }
        // 更新玩家位置
        // update the player position
        this._curTile = newTile;
        this._updatePlayerPos();
        // 移动地图
        // move the map if necessary
        this._tryMoveMap(mapMoveDir);
        // 检查是否移动到终点，如果到终点了，显示胜利界面
        // check the player is success or not
        if (this._curTile.equals(this._endTile)) {
            cc.log('succeed');
            this._succeedLayer.active = true;
        }
    },
    //移动地图
    _tryMoveMap: function(moveDir) {
        // get necessary data
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
            // calculate the position range of map
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
});
