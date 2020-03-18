
// 访问属性、调用方法运算符"."的优先级高于赋值运算符。
var a = {n: 1}
var b = a;
a.x = a = {n: 2};
console.log(a.x);
console.log(b.x)


收集参数 柯里化
// length 是js函数对象的一个属性值，该值是指 “该函数有多少个必须要传入的参数”，即形参的个数
function createCurry(func, arity, args) {
    var arity = arity || func.length;
    var args = args || [];
    var wrapper = function() {
        var _args= [].slice.call(arguments);
        [].push.apply(args, _args);

        if(_args.length < arity) {
            arity -= _args.length;
            return createCurry(func, arity, args);
        }

        return func.apply(func, args);
    }

    return wrapper;
}

function add(a,b,c) {
    return a + b + c;
}
var _add = createCurry(add);
var a = _add(1)(2, 3);


// 可以获取 -0.5 ~ 0.5
Math.random() - 0.5


封装私有变量
	var dirty = false;
	module.exports = {
	    setDirty: function () {
	        dirty = true;
	    },
	    isDirty: function () {
	        return dirty;
	    },
	};	

    
// 计算数组中每个元素出现的次数
let nameNum = names.reduce((pre,cur)=>{
  if(cur in pre){
    pre[cur]++
  }else{
    pre[cur] = 1 
  }
  return pre
},{})
console.log(nameNum); //{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}

// 数组去重
let newArr = arr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
},[])
console.log(newArr);// [1, 2, 3, 4]

// 将二维数组转化为一维
let arr = [[0, 1], [2, 3], [4, 5]]
let newArr = arr.reduce((pre,cur)=>{
    return pre.concat(cur)
},[])
console.log(newArr); // [0, 1, 2, 3, 4, 5]

// 将多维数组转化为一维
let arr = [[0, 1], [2, 3], [4,[5,6,7]]]
const newArr = function(arr){
   return arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
}
console.log(newArr(arr)); //[0, 1, 2, 3, 4, 5, 6, 7]

// 对象里的属性求和
var result = [
    {
        subject: 'math',
        score: 10
    },
    {
        subject: 'chinese',
        score: 20
    },
    {
        subject: 'english',
        score: 30
    }
];

var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
console.log(sum) //60