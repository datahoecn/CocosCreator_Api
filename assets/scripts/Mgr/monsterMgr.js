
module.exports = {
    _pool: new cc.NodePool('enemy'),
    _prefab: null,

    setPrefab: function(prefab) {
        this._prefab = prefab;
    },

    putEnemy: function(node){
        this._pool.put(node);
    },
    
    getEnemy: function(){
        var newNode = this._pool.get();
        if (!newNode) {
            newNode = cc.instantiate(this._prefab);
        }
        return newNode;
    },

    clearPool: function () {
        this._pool.clear();
    }
}