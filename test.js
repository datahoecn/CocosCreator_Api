// 旋转指定角度
var pos_x = 3;
var pos_y = 1;
var angle = 90 / 180 * Math.PI;
var cosVal = Math.cos(angle);
var sinVal = Math.sin(angle);
var new_x = pos_x * cosVal - pos_y * sinVal;
var new_y = pos_x * sinVal + pos_y * cosVal;
console.log(new_x,new_y);