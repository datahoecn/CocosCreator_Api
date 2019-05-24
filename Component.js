
type: 'Integer'
this.enabled = false;//不用时，禁用组件，防止再调用
使用统一的控制脚本来初始化其他脚本
	const Player = require('Player');
	const Enemy = require('Enemy');
	const Menu = require('Menu');

	cc.Class({
	    extends: cc.Component,
	    properties: {
	        player: Player,
	        enemy: Enemy,
	        menu: Menu
	    },

	    onLoad: function () {
	        this.player.init();
	        this.enemy.init();
	        this.menu.init();
	    }
	});

在 Update 中用自定义方法控制更新顺序
	update: function (dt) {
        this.player.updatePlayer(dt);
        this.enemy.updateEnemy(dt);
        this.menu.updateMenu(dt);
    }

控制同一个节点上的组件执行顺序
	排列在上的组件会先于排列在下的组件执行

	设置组件执行优先级
	extends: cc.Component,
    editor: {
        executionOrder: -1
    },
    executionOrder 越小，该组件相对其它组件就会越先执行。
    executionOrder 默认为 0，因此设置为负数的话，就会在其它默认的组件之前执行。 
    executionOrder 只对 onLoad, onEnable, start, update 和 lateUpdate 有效，对 onDisable 和 onDestroy 无效。



对象池
	在运行时进行节点的创建(cc.instantiate)和销毁(node.destroy)操作是非常耗费性能的
	通过创建 cc.NodePool 的实例来初始化一种节点的对象池

	初始化对象池
		properties: {
		    enemyPrefab: cc.Prefab
		},
		onLoad: function () {
		    this.enemyPool = new cc.NodePool();
		    let initCount = 5;
		    for (let i = 0; i < initCount; ++i) {
		        let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
		        this.enemyPool.put(enemy); // 通过 put 接口放入对象池
		    }
		}

	从对象池请求对象
		createEnemy: function (parentNode) {
		    let enemy = null;
		    if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
		        enemy = this.enemyPool.get();
		    } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
		        enemy = cc.instantiate(this.enemyPrefab);
		    }
		    enemy.parent = parentNode; // 将生成的敌人加入节点树
		    enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
		}

	将对象返回对象池
		onEnemyKilled: function (enemy) {
		    // enemy 应该是一个 cc.Node
		    this.enemyPool.put(enemy); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
		}

	使用构造函数创建对象池时，可以指定一个组件类型或名称
	作为挂载在节点上用于处理节点回收和复用事件的组件。
	每个菜单项上有一个 MenuItem.js 组件
	// MenuItem.js
	cc.Class({
	    extends: cc.Component,

	    onLoad: function () {
	        this.node.selected = false;
	        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect, this.node);
	    },

	    unuse: function () {
	        this.node.off(cc.Node.EventType.TOUCH_END, this.onSelect, this.node);
	    },

	    reuse: function () {
	        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect, this.node);
	    }
	});
	let menuItemPool = new cc.NodePool('MenuItem');
	当使用 menuItemPool.get() 获取节点后，就会调用 MenuItem 里的 reuse 方法,注册点击事件
	当使用 menuItemPool.put(menuItemNode) 回收节点后，会调用 MenuItem 里的 unuse 方法,点击事件的反注册
	cc.NodePool.get() 可以传入任意数量类型的参数，这些参数会被原样传递给 reuse 方法

	清除对象池
		myPool.clear(); // 调用这个方法就可以清空对象池

