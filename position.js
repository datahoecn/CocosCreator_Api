Vec2
    cc.v2(0, 0);
    properties
        x Number
        y Number
    method
        constructor 构造函数，可查看 Cc/vec2:method 或者 cc.p
        clone 克隆一个 Vec2 对象
        set 设置向量值。
        equals 当前的向量是否与指定的向量相等。
        fuzzyEquals 近似判断两个点是否相等。
        toString 转换为方便阅读的字符串。
        lerp 线性插值。
        clampf 返回指定限制区域后的向量。
        // 返回 self(加之后)
        addSelf 向量加法。
        // 返回一个新 vec2
        add 向量加法，并返回新结果。
        subSelf 向量减法。
        sub 向量减法，并返回新结果。
        mulSelf 缩放当前向量。 var v = cc.v2(10, 10);  v.mulSelf(5);// return Vec2 {x: 50, y: 50};
        mul 缩放向量，并返回新结果。
        scaleSelf 分量相乘。
        scale 分量相乘，并返回新的结果。
        divSelf 向量除法。
        div 向量除法，并返回新的结果。
        negSelf 向量取反。
        neg 返回取反后的新向量。
        dot 当前向量与指定向量进行点乘。
        cross 当前向量与指定向量进行叉乘。
        mag 返回该向量的长度。
        magSqr 返回该向量的长度平方。
        normalizeSelf 向量归一化，让这个向量的长度为 1。
        normalize 返回归一化后的向量。
        angle 夹角的弧度。
        signAngle 带方向的夹角的弧度。
        rotate 返回旋转给定弧度后的新向量。
        rotateSelf 按指定弧度旋转向量。
        project 返回当前向量在指定 vector 向量上的投影向量。
        transformMat4 Transforms the vec2 with a mat4. 3rd vector component is implicitly '0', 4th vector component is implicitly '1'


//取得当前列表项在滚动视图中的纵向位置
    getPositionInView: function (item) { 
        //将相对 item.parent 的坐标，转换为世界坐标
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        //将 worldPos 转换为相对 this.scrollView.node 的坐标
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },


向量计算
    var v = cc.v2(10, 10);//向量减法，并返回新结果。
    v.sub(cc.v2(5, 5));      // return Vec2 {x: 5, y: 5};

计算两点之间距离
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
        this.node.position = this.node.position.add(direction.normalize().mul(this.speed * dt));
    }
    // 重置目标位置
    _refreshTargetPos ()  {
        var size = cc.view.getDesignResolutionSize();
        this._targetPos.x = Math.random() * size.width - size.width / 2;
        this._targetPos.y = Math.random() * size.height - size.height / 2;
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