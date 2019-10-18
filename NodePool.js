
var nodeMgr = {
    _pool: new cc.NodePool('boxs'),
    prefab: null,
    putNode: function(node) {
        cc.log(this._pool.size());
        if(node){
            this._pool.put(node);
        } 
    },
    getNode: function () {
        let node = null;
        if (this._pool.size() > 0) {
            node = this._pool.get();
            node.stopAllActions();
        } else {
            node = cc.instantiate(this.prefab);
        }
        return node;
    },
}

module.exports = nodeMgr;

最好在切换场景或其他不再需要对象池的时候手动调用 clear 方法来清空缓存节点。
myPool.clear();

// 可以传入任意数量类型的参数，这些参数会被原样传递给 reuse 方法
this._pool.get(this);

// boxs.js  
// new cc.NodePool('boxs'), 参数必须和脚本名相同，才能触发下面函数

// _pool.put(node) 回收节点后，就会调用 unuse 方法
unuse: function () {
        cc.log("unuse");
    },
// _pool.get() 获取节点后，就会调用 reuse 方法
reuse: function () {
    cc.log("reuse");
}






ts
// import NodeMgr from "./NodeMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NodeMgr {
    private static mBoxNodePool: cc.NodePool = null;

    public static putBox(box: cc.Node){
        if(this.mBoxNodePool == null){
            this.mBoxNodePool = new cc.NodePool('boxs');
        }

        if(box != null){
            this.mBoxNodePool.put(box);
        } 
    }

    public static getBox(){
        if(this.mBoxNodePool != null && this.mBoxNodePool.size() > 0){
            let box = this.mBoxNodePool.get();
            box.stopAllActions();
            return box;
        }else{
            return null;
        }
    }
}

