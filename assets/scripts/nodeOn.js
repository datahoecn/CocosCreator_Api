var ClickState = cc.Enum({
    Normall: 0,
    Click: 1,
    Move: 2,
    gameOver: 3,
})
// 拖动交换位置
start() {
    this.clickState = ClickState.Normall;
    this.containerNode.on(cc.Node.EventType.TOUCH_START, this.click_start, this);
    this.containerNode.on(cc.Node.EventType.TOUCH_MOVE, this.click_move, this);
},
click_start(e){
    if (this.clickState != ClickState.Normall) return;
    var pos = this.containerNode.convertToNodeSpaceAR(e.getLocation());
    this.startCol = Math.floor((pos.x - this.start_x + this.interval / 2) / this.interval);
    this.startRow = Math.floor((pos.y - this.start_y + this.interval / 2) / this.interval);
    if(this.startCol >= this.colNum - 1 || this.startCol < 1 || this.startRow >= this.rowNum - 1 || this.startRow < 1) {
    } else {
        this.clickState = ClickState.Click;
    }
},
click_move(e){
    if (this.clickState != ClickState.Click) return;
    var pos = this.containerNode.convertToNodeSpaceAR(e.getLocation());
    var col = Math.floor((pos.x - this.start_x + this.interval / 2) / this.interval);
    var row = Math.floor((pos.y - this.start_y + this.interval / 2) / this.interval);
    if(col >= this.colNum - 1 || col < 1 || row >= this.rowNum - 1 || row < 1)return;
    var subCol = col - this.startCol;
    var subRow = row - this.startRow;
    if (Math.abs(subCol) == 1 && subRow == 0) {
    } else if (Math.abs(subRow) == 1 && subCol == 0) {
    } else {
        return;
    }
    this.exchange_pos(col,row,this.startCol,this.startRow);
},
exchange_pos(endCol,endRow,startCol,startRow){
    this.clickState = ClickState.Move;

    var startVal = this.layout[startRow][startCol];
    this.layout[startRow][startCol] = this.layout[endRow][endCol];
    this.layout[endRow][endCol] = startVal;

    var startNode = this.containerNode.getChildByName(startRow + "_" + startCol);
    var endNode = this.containerNode.getChildByName(endRow + "_" + endCol);
    var startName = startNode.name;
    startNode.name = endNode.name;
    endNode.name = startName;

    startNode.runAction(cc.moveTo(0.2, endNode.position));
    endNode.runAction(cc.sequence(cc.moveTo(0.2,startNode.position),cc.delayTime(0.2),cc.callFunc(()=>{
        this.isWin();
    })));
},