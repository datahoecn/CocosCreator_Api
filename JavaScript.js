Date.now()
Number.toFixed(num)//四舍五入,规定小数的位数，是 0 ~ 20 之间的值
if (!a || b === c) return;//||且

a < b && c
a -= b * c
a = b <= c

typeof(a)
this._audioSource instanceof cc.AudioSource//检测某个对象是不是另一个对象的实例


stringObject.split(separator,howmany)//separator字符串或正则表达式，从该参数指定的地方分割 stringObject。
	//howmany可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组
	
arrayObject.length//获取数组长度
arrayObject.splice(index,howmany,item1,.....,itemX)//index位置，howmany要删除的项目数量，如果设置为 0，则不会删除项目
										//item1,.....,itemX可选。向数组添加的新项目。

stringObject.indexOf(searchvalue,fromindex)//返回某个指定的字符串值在字符串中首次出现的位置。
	//searchvalue需检索的字符串值。
	//fromindex可选，开始检索的位置。值0到stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。

//对数组的每个元素执行一次提供的函数
array.forEach(function(element) {
  console.log(element);
});