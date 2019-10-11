/**
使用方法
let locator = require('locator');
find(value, cb) {
    let root = cc.find('Canvas');
    locator.locateNode(root, value, (error, node) => {
        if (error) {
            cc.log(error);
            return;
        }
        cc.log('定位节点成功');
        let rect = this._focusToNode(node);
        if (cb) {
            cb(node, rect);
        }
    });
},
_focusToNode(node) {
        this._mask._graphics.clear();
        let rect = node.getBoundingBoxToWorld();
        let p = this.node.convertToNodeSpaceAR(rect.origin);   
        rect.x = p.x;
        rect.y = p.y;

        this._mask._graphics.fillRect(rect.x, rect.y, rect.width, rect.height);
        return rect;
    },
*/

/**
 * @object
 * Location主要用从场景树中检索UI节点
 */
let Locator = {

    timeout: 5000, //超时
    /**
     * 定位解析
     * @param locator
     * @returns {Array}
     */
    parse: function (locator) {
        cc.assert(locator, 'locator string is null');

        //使用正则表达示分隔名字
        let names = locator.split(/[.,//,>,#]/g);
        let segments = names.map(function (name) {
            let index = locator.indexOf(name);
            let symbol = locator[index - 1] || '>';
            return {symbol: symbol, name: name.trim()};
        });
        return segments;
    },

    /**
     * 通过节点名搜索节点对象
     * @param root
     * @param name
     * @returns {*}
     */
    seekNodeByName: function (root, name) {
        if (!root)
            return null;

        if (root.getName() == name)
            return root;
        let arrayRootChildren = root.getChildren();
        let length = arrayRootChildren.length;
        for (let i = 0; i < length; i++) {
            let child = arrayRootChildren[i];
            let res = this.seekNodeByName(child, name);
            if (res != null)
                return res;
        }
        return null;
    },

    /**
     * 在root节点中，定位locator
     * @param root
     * @param locator
     * @param cb
     */
    locateNode: function (root, locator, cb) {
        if (!this.locating) {
            this.startTime = Date.now();    
            this.locating = true;
        }
        
        let segments = this.parse(locator);
        cc.assert(segments && segments.length);
        //cc.log('locateNode:' + locator);
        let child, node = root;

        for (let i = 0; i < segments.length; i++) {
            let item = segments[i];
            switch (item.symbol) {
                case '/':
                    child = node.getChildByName(item.name);
                    break;
                case '.':
                    child = node[item.name];
                    break;
                case '>':
                    child = this.seekNodeByName(node, item.name);
                    break;
                case '#':
                    child = this.seekNodeByTag(node, item.name);
                    break;
            }

            if (!child) {
                node = null;
                break;
            }
            node = child;
        }

        if (node && node.active && cb) {
            this.locating = false;
            cb(null, node);
        } else if (cb) {
            if (Date.now() - this.startTime > this.timeout) {
                cb({error:'timeout', locator});
            }  else {
                setTimeout(function () {
                    Locator.locateNode(root, locator, cb);
                }, 10);
            }
        }

        return node;
    },

    getNodeFullPath(node) {
        let array = [];
        let temp = node;
        do {
            array.unshift(temp.name);
            temp = temp.parent;
        } while(temp && temp.name !== 'Canvas')
        return array.join('/');
    },
};

window.Locator = Locator;
module.exports = Locator;