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

js
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
