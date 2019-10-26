

向量计算
    var v = cc.v2(10, 10);//向量减法，并返回新结果。
    v.sub(cc.v2(5, 5));      // return Vec2 {x: 5, y: 5};

根据两点位置计算两点之间距离
    var dist = this.node.position.sub(playerPos).mag();

// 判断是否在目标位置，周围50
pos_1.fuzzyEquals(pos_2, 50);

Role.ts
// 挂在目标节点上
const {ccclass, property} = cc._decorator;

@ccclass
export default class Role extends cc.Component {

    @property
    // 移动速度
    speed: number = 10;

    private _targetPos: cc.Vec2 = cc.v2(0,0);

    start () {
        this._refreshTargetPos();
    }

    update (dt) {
        // 判断是否到达目标位置，this.speed范围
        if (this.node.getPosition().fuzzyEquals(this._targetPos, this.speed)) {
            this._refreshTargetPos();
        }
        // 获取目标位置与本节点位置差
        var direction = this._targetPos.sub(this.node.position);
        // 更新本节点位置，normalize 归一化，mul缩放向量
        this.node.position = this.node.position.add(direction.normalize().mul(this.speed));
    }
    // 重置目标位置
    _refreshTargetPos ()  {
        var size = cc.view.getDesignResolutionSize();
        this._targetPos.x = Math.random() * size.width - size.width / 2;
        this._targetPos.y = Math.random() * size.height - size.height / 2;
    }
}


Item.ts
// 挂在追踪节点上
import Role from "./Role";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    @property(Role)
    role: Role = null;

    @property
    speed: number = 10;

    update (dt) {
        // 判断是否追上目标，50范围算追上
        if (this.node.position.fuzzyEquals(this.role.node.position, 50)) {
            this.node.removeFromParent(true);
        }
        // 获取目标与本节点位置差
        var direction = this.role.node.position.sub(this.node.position);
        // 更新本节点位置，normalize 归一化，mul缩放向量
        this.node.position = this.node.position.add(direction.normalize().mul(this.speed * dt));
    }
}


CreateItem.ts
// 创建追踪节点
import Role from "./Role";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CreateItem extends cc.Component {
    // 追踪预制节点
    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property(Role)
    role: Role = null;

    // 按钮响应函数
    // 创建追踪节点
    create () {
        var size = cc.view.getDesignResolutionSize();
        var node = cc.instantiate(this.prefab);
        var item = node.getComponent("Item");
        item.role = this.role;
        node.x = Math.random() * size.width - size.width / 2;
        node.y = Math.random() * size.height - size.height / 2;
        this.node.addChild(node);
    }

}

// 节点移动
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 40
    },

    start () {
        // 移动点位置集合
        this.road_data = [cc.v2(100,100), cc.v2(100, 0), cc.v2(0,0), cc.v2(0,100), cc.v2(100,100)]
        this.is_walking = false;
        this.walk_on_road();
    },

    walk_on_road() {
        if(this.road_data.length < 2) {
            return;
        }
        // 初始化位置
        this.node.setPosition(this.road_data[0]);
        this.next_step = 1;
        this.walk_to_next();
    },

    walk_to_next() {
        // 无限循环
        if(this.next_step >= this.road_data.length) {
            this.next_step = 1;
            this.speed = this.speed + 100;
            if(this.speed >= 500) {
                this.speed = 500;
            }
        }

        var src = this.node.getPosition();
        // 获取下个位置坐标
        var dst = this.road_data[this.next_step];
        // 获取差
        var dir = dst.sub(src);
        // 获取长度
        var len = dir.mag();

        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
        // 运动时间
        this.walk_time = len / this.speed;
        this.passed_time = 0;
        this.is_walking = true;
    },

    update(dt) {
        if(this.is_walking === false) {
            return;
        }

        this.passed_time += dt;
        if(this.passed_time > this.walk_time) {
            dt -= (this.passed_time - this.walk_time);
        }
        // 更新位置
        this.node.x += (this.vx * dt);
        this.node.y += (this.vy * dt);

        if(this.passed_time >= this.walk_time) {
            this.next_step++;
            this.walk_to_next();
        }
    }

});