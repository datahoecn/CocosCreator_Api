const WIDTH = 700;
const HEIGHT = 700;
const COST_GOLD = 100;


var NodeType = cc.Enum({
    Empty: 0,

    Row: 1,
    Col: 2,
    Cross: 3,
    RightUp: 4,
    RightDown: 5,
    LeftUp: 6,
    LeftDown: 7,
    Up: 8,
    Down: 9,
    Left: 10,
    Right: 11,

    Start: 12,

    End: 13,
    Grass: 14,

    Start_0: 120,
    Start_1: 121,
    Start_2: 122,
    Start_3: 123,

    NewRow: -1,
    NewCol: -2,
    NewCross: -3,
    NewRightUp: -4,
    NewRightDown: -5,
    NewLeftUp: -6,
    NewLeftDown: -7,
    NewUp: -8,
    NewDown: -9,
    NewLeft: -10,
    NewRight: -11,
})

var ClickState = cc.Enum({
    Normall: 0,
    Click: 1,
    Move: 2,
    gameOver: 3,
})

function Ball(val, row, col, pre, next) {
    this.val = val;
    this.row = row;
    this.col = col;
    this.pre = pre;
    this.next = next;
}

cc.Class({
    extends: cc.Component,

    properties: {
        diamondAtlas: cc.SpriteAtlas,
        waterAtlas: cc.SpriteAtlas,
        level_lab: cc.Label,
        gold_lab: cc.Label,
        diamondBgNode: cc.Node,
        containerNode: cc.Node,
        // end_spr: cc.SpriteFrame,
        // sprArr: [cc.SpriteFrame],
        // waterArr: [cc.SpriteFrame],
        bgTip_node: cc.Node,
        popupNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        gb.game = this;
    },

    start() {
        this.containerNode.on(cc.Node.EventType.TOUCH_START, this.click_start, this);
        this.containerNode.on(cc.Node.EventType.TOUCH_MOVE, this.click_move, this);
        this.containerNode.on(cc.Node.EventType.TOUCH_END, this.end_click, this);
        this.containerNode.on(cc.Node.EventType.TOUCH_CANCEL, this.cancel_click, this);

        this.diamondSprs = this.diamondAtlas._spriteFrames;
        this.waterSprs = this.waterAtlas._spriteFrames;
    },

    init() {
        if (!gb.main.diamondPre) {
            setTimeout(() => {
                this.init();
            }, 200);
            return;
        }

        this.level_lab.string = gb.level - 1;
        this.levelAni(this.level_lab);

        gb.aniMgr.closeFlower();

        this.gold_lab.string = gb.goldNum;
        this.popupNode.active = false;

        this.loadJson(gb.level);

        this.clickState = ClickState.Normall;

        if (gb.level == 1) {
            cc.loader.loadRes("prefabs/guide", function (err, prefab) {
                var newNode = cc.instantiate(prefab);
                gb.main.node.addChild(newNode);
            }.bind(this));
        }

        if (gb.level == 2) {
            if (gb.guide) {
                gb.guide.init();
            }
        }
    },

    levelAni(level_lab) {
        var parentNode = level_lab.node.parent;
        parentNode.runAction(cc.sequence(
            cc.moveTo(0.4, cc.v2(98, 140)),
            cc.callFunc(() => {
                level_lab.string = gb.level;
            }),
            cc.moveTo(0.4, cc.v2(98, 22)),
        ))
    },

    loadJson(num) {
        num = num % 20;
        if (num == 0) {
            num = 20;
        }
        var path;
        if (num < 10) {
            path = "configs/00" + num;
        } else if (num < 100) {
            path = "configs/0" + num;
        } else {
            path = "configs/" + num;
        }
        cc.log("=========== 关卡配置 ============" + path);
        cc.loader.loadRes(path, function (err, jsonAsset) {
            this.updateLayout(jsonAsset.json);
            this.json = jsonAsset.json;
        }.bind(this));
    },

    updateLayout(json) {
        cc.log(json);
        var chidrens = this.containerNode.children;
        var childrenCount = this.containerNode.childrenCount;
        var index = 0;

        var rowNum = json.length;
        var colNum = json[0].length;
        this.rowNum = rowNum;
        this.colNum = colNum;
        var row_itv = Math.floor(WIDTH / rowNum);
        var col_itv = Math.floor(HEIGHT / colNum);
        var new_itv = Math.min(row_itv, col_itv);
        this.interval = new_itv;
        var start_x = -Math.floor(colNum / 2) * new_itv + ((colNum + 1) % 2) * new_itv / 2;
        var start_y = -Math.floor(rowNum / 2) * new_itv + ((rowNum + 1) % 2) * new_itv / 2;
        this.start_x = start_x;
        this.start_y = start_y;
        var diamondPre = gb.main.diamondPre;
        this.layout = [];
        this.begin = [];
        this.over = [];
        if (rowNum == 4) {
            this.diamondBgNode.scale = 1.5;
            this.diamondBgNode.position = cc.v2(0,0);
        } else if (rowNum == 5) {
            this.diamondBgNode.scale = 1.2;
            this.diamondBgNode.position = cc.v2(-70,70);
        } else if (rowNum == 6) {
            this.diamondBgNode.scale = 1;
            this.diamondBgNode.position = cc.v2(0,0);
        } else {
            this.diamondBgNode.scale = 1;
            this.diamondBgNode.position = cc.v2(0,0);
        }
        for (let row = 0; row < rowNum; row++) {
            this.layout[row] = [];
            for (let col = 0; col < colNum; col++) {
                let val = json[row][col];
                this.layout[row][col] = val;

                if (val == NodeType.Empty) continue;

                if (val == NodeType.End) {
                    this.over.push([row, col]);
                }

                let newNode;
                if (index < childrenCount) {
                    newNode = chidrens[index];
                    newNode.active = true;
                    newNode.rotation = 0;
                } else {
                    newNode = cc.instantiate(diamondPre);
                    this.containerNode.addChild(newNode);
                }
                index++;

                newNode.width = new_itv;
                newNode.height = new_itv;
                newNode.x = start_x + new_itv * col;
                newNode.y = start_y + new_itv * row;
                newNode.name = row + "_" + col;

                if (Math.floor(val / 10) == NodeType.Start) {
                    this.begin.push([row, col]);
                    newNode.getComponent(cc.Sprite).spriteFrame = this.diamondSprs[NodeType.Start];
                    newNode.rotation = 90 * Math.floor(val % 10);
                } else {
                    newNode.getComponent(cc.Sprite).spriteFrame = this.diamondSprs[val];
                }

                var waterNode = newNode.getChildByName("water");
                waterNode.active = false;

                newNode.scale = 0.2;
                newNode.runAction(cc.scaleTo(0.4, 1));
                
            }
        }
        if (index < childrenCount) {
            for (let i = index; i < childrenCount; i++) {
                chidrens[i].active = false;
                chidrens[i].name = "";
            }
        }
        cc.log("节点数: " + this.containerNode.childrenCount);
    },

    click_start(e) {
        if (this.clickState != ClickState.Normall) return;
        var pos = this.containerNode.convertToNodeSpaceAR(e.getLocation());
        this.startCol = Math.floor((pos.x - this.start_x + this.interval / 2) / this.interval);
        this.startRow = Math.floor((pos.y - this.start_y + this.interval / 2) / this.interval);
        if (this.startCol >= this.colNum || this.startCol < 0 || this.startRow >= this.rowNum || this.startRow < 0) {
        } else {
            let _val = this.layout[this.startRow][this.startCol];
            if (_val < 0 ||_val == NodeType.Empty || _val == NodeType.Grass || Math.floor(_val / 10) == NodeType.Start || _val == NodeType.End) return;
            this.clickState = ClickState.Click;
        }
    },
    click_move(e) {
        if (this.clickState != ClickState.Click) return;
        var pos = this.containerNode.convertToNodeSpaceAR(e.getLocation());
        var col = Math.floor((pos.x - this.start_x + this.interval / 2) / this.interval);
        var row = Math.floor((pos.y - this.start_y + this.interval / 2) / this.interval);
        if (col >= this.colNum || col < 0 || row >= this.rowNum || row < 0) return;

        var subCol = col - this.startCol;
        var subRow = row - this.startRow;
        if (Math.abs(subCol) == 1 && subRow == 0) {
        } else if (Math.abs(subRow) == 1 && subCol == 0) {
        } else {
            return;
        }
        let _val = this.layout[row][col];
        if (_val == NodeType.Empty) {
            this.exchange_pos(col, row, this.startCol, this.startRow);
        }
    },

    end_click(e) {
        if (this.clickState == ClickState.Click) {
            this.clickState = ClickState.Normall;
        }
    },

    cancel_click(e) {
        if (this.clickState == ClickState.Click) {
            this.clickState = ClickState.Normall;
        }
    },

    exchange_pos(endCol, endRow, startCol, startRow) {
        gb.VoiceMgr.playMove();
        this.clickState = ClickState.Move;

        var startVal = this.layout[startRow][startCol];
        this.layout[startRow][startCol] = NodeType.Empty;
        this.layout[endRow][endCol] = startVal;

        var startNode = this.containerNode.getChildByName(startRow + "_" + startCol);
        startNode.name = endRow + "_" + endCol;
        var pos = cc.v2(this.start_x + this.interval * endCol, this.start_y + this.interval * endRow);
        startNode.runAction(cc.sequence(cc.moveTo(0.2, pos), cc.delayTime(0.2), cc.callFunc(() => {
            this.clickState = ClickState.Normall;
            this.isWin();
        })));
    },

    isWin() {
        if (this.begin.length > 1) {
            cc.error("起点不止一个 " + this.begin.length);
        }
        if (this.over.length < 1) {
            cc.error("没有终点 " + this.over.length);
        }
        var row = this.begin[0][0];
        var col = this.begin[0][1];
        var _val = this.layout[row][col];
        this.pathLayout = [];
        this.tempArr = [];
        var startBall = new Ball(_val, row, col, null, null);
        if (_val == NodeType.Start_0) {
            this.nextRowCol(row, col, row - 1, col, startBall);
        } else if (_val == NodeType.Start_1) {
            this.nextRowCol(row, col, row, col - 1, startBall);
        } else if (_val == NodeType.Start_2) {
            this.nextRowCol(row, col, row + 1, col, startBall);
        } else if (_val == NodeType.Start_3) {
            this.nextRowCol(row, col, row, col + 1, startBall);
        } else {
            cc.log("出错：" + _val);
        }
        
        cc.log("成功路径：", this.pathLayout);
        if (this.pathLayout.length == this.over.length) {
            // this.displayTip("恭喜通关");
            this.playWinAni();
        } else {
            // gb.VoiceMgr.playLose();
            // this.displayTip("失败");
        }
    },

    nextRowCol(preRow, preCol, row, col, preBall) {
        if (col >= this.colNum || col < 0 || row >= this.rowNum || row < 0) return false;
        if (this.tempArr.includes(row + "_" + col))return;
        this.tempArr.push(row + "_" + col);
        var _preRow = row;
        var _preCol = col;
        var val = this.layout[row][col];
        var arr = [];
        var isOk = false;
        switch (Math.abs(val)) {
            case NodeType.Row:
                col -= 1;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col += 2;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.Col:
                row -= 1;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                row += 2;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.Cross:
                col -= 1;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col += 2;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col -= 1;
                row -= 1;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                row += 2;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.RightUp:
                col += 1;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col -= 1;
                row += 1;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.RightDown:
                col += 1;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col -= 1;
                row -= 1;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.LeftUp:
                col -= 1;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col += 1;
                row += 1;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.LeftDown:
                col -= 1;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col += 1;
                row -= 1;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.Up:
                col -= 1;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col += 2;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col -= 1;
                row += 1;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.Down:
                col -= 1;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col += 2;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col -= 1;
                row -= 1;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.Left:
                col -= 1;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col += 1;
                row -= 1;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                row += 2;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.Right:
                col += 1;
                if (preCol != col) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                col -= 1;
                row -= 1;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                row += 2;
                if (preRow != row) {
                    arr.push([row, col]);
                } else {
                    isOk = true;
                }
                if (!isOk) {
                    arr = [];
                }
                break;

            case NodeType.End:
                let newBall = new Ball(val, _preRow, _preCol, preBall, null);
                let isSame = false;
                for (let index = 0; index < this.pathLayout.length; index++) {
                    if (this.pathLayout[index].row == newBall.row && this.pathLayout[index].col == newBall.col) {
                        isSame = true;
                        break;
                    } 
                }
                if (!isSame) {
                    this.pathLayout.push(newBall);
                }
                break;

            default:
                cc.log("不处理值: " + val);
                break;
        }
        if (arr.length > 0) {
            for (let index = 0; index < arr.length; index++) {
                let newBall = new Ball(val, _preRow, _preCol, preBall, null);
                this.nextRowCol(_preRow, _preCol, arr[index][0], arr[index][1], newBall);
            }
        }
    },

    playWinAni() {
        this.clickState = ClickState.gameOver;
        gb.main.updateLevel();
        // this.displayTip("+" + COST_GOLD / 5);
        // gb.updateGold(COST_GOLD / 5, this.gold_lab);

        var pathArr = [];
        for (let index = 0; index < this.pathLayout.length; index++) {
            pathArr[index] = [];
            let ball = this.pathLayout[index];
            pathArr[index].push(ball);
            while (ball.pre) {
                if (!ball.pre.next) {
                    ball.pre.next = [];
                }
                ball.pre.next.push(ball);
                ball = ball.pre;
                pathArr[index].unshift(ball);
            }
        }

        cc.log(pathArr);
        var count = 0;
        for (let index = 0; index < pathArr.length; index++) {
            let path = pathArr[index];
            count = Math.max(count, path.length);
            for (let i = 0; i < path.length; i++) {
                // let name = path[i].row + "_" + path[i].col;
                // let node = this.containerNode.getChildByName(name);
                setTimeout(() => {
                    this.playAni(path[i]);
                }, i * 500 + 200);
            }
        }

        setTimeout(() => {
            gb.main.gameOverInterface();
        }, count * 500 + 1400);
    },

    playAni(ball) {
        // if (!ball.pre || !ball.next) return;
        var val = ball.val;
        var name = ball.row + "_" + ball.col;
        var node = this.containerNode.getChildByName(name);
        
        if (Math.floor(val/10) == NodeType.Start || val == NodeType.Start) {

        } else if (val == NodeType.End) {
            node.getComponent(cc.Sprite).spriteFrame = this.diamondSprs[NodeType.Grass];
            gb.aniMgr.playFlower(node);
        } else {
            var waterNode = node.getChildByName("water");
            waterNode.active = true;
            waterNode.width = this.interval;
            waterNode.height = this.interval;
            waterNode.getComponent(cc.Sprite).spriteFrame = this.waterSprs[Math.abs(val)];
        }
    },

    btn_home() {
        if (this.clickState != ClickState.Normall) return;
        gb.VoiceMgr.playClick();
        gb.main.homeInterface();
    },

    btn_refresh() {
        if (this.clickState != ClickState.Normall) return;
        gb.VoiceMgr.playClick();
        gb.main.gameInterface();
    },

    btn_skip() {
        if (this.clickState != ClickState.Normall) return;
        gb.VoiceMgr.playClick();
        if (gb.goldNum < COST_GOLD) {
            this.displayTip("金币不足");
            return;
        }
        this.popupNode.active = true;
    },

    btn_close() {
        gb.VoiceMgr.playClick();
        this.popupNode.active = false;
    },

    btn_sure() {
        gb.VoiceMgr.playClick();
        this.popupNode.active = false;
        this.clickState = ClickState.gameOver;
        this.displayTip(-COST_GOLD);
        gb.updateGold(-COST_GOLD, this.gold_lab);
        gb.main.updateLevel();
        setTimeout(() => {
            gb.main.gameInterface();
        }, 1400);
    },

    displayTip(str) {
        this.bgTip_node.stopAllActions();
        this.bgTip_node.y = 200;
        this.bgTip_node.active = true;
        var _label = this.bgTip_node.getChildByName("tip").getComponent(cc.Label);
        _label.string = str;
        this.bgTip_node.runAction(cc.sequence(
            cc.moveBy(0.3, cc.v2(0, 100)),
            cc.delayTime(0.8),
            cc.callFunc(() => {
                this.bgTip_node.active = false;
            })
        ))
    },
});
