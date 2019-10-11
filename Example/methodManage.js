//event-listener.js

const EventListener = function (obj) {
  let Register = {};
  obj.on = function (name, method) {
    if (!Register.hasOwnProperty(name)){
        Register[name] = [];
    }
    Register[name].push(method);
  };

  obj.fire = function (name) {
    if (Register.hasOwnProperty(name)){
      let handlerList = Register[name];
      for (let i = 0 ; i < handlerList.length ; i ++){
        let handler = handlerList[i];
        let args = [];
        for (let j = 1 ; j < arguments.length ; j ++){
          args.push(arguments[j]);
        }
        // apply() 方法接受数组形式的参数。
        // 加个apply只是为了数组args，this还是本object
        handler.apply(this, args);
      }
    }
  };
  
  obj.off = function (name, method) {
    if (Register.hasOwnProperty(name)){
      let handleList = Register[name];
      for (let i = 0 ; i < handleList.length ; i ++){
        if (handleList[i] === method){
          handleList.splice(i, 1);
        }
      }
    }
  };
  return obj;
};
export default EventListener;



//global.js
import EventListener from './event-listener'
let global = {} || global;
global.gameEvent = EventListener({});
export default global;

//main.js
// 添加方法
global.gameEvent.on("build_tower", (target)=>{
    cc.log("build tower" + target.name);
    // getBuildMenuNodePos 是本js的方法
    let node = this.getBuildMenuNodePos();
})

// 调用方法，target是节点
global.gameEvent.fire("build_tower", target);