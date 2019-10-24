var tag = false;
var p = new Promise(function(resolve, reject) {
	if(tag){
		resolve("tag is true");
	} else {
		reject("tag is false");
	}
})

p.then(function(result) {
	console.log(result);
	console.log("=========================");
})
.catch(function(err) {
	console.log(err);
	console.log("=========================");
})

function fn_1(num) {
	return new Promise(function(resolve, reject) {
		if(typeof num == "number") {
			resolve();
		} else {
			reject();
		}
	}).then(function() {
		console.log("参数是一个number值");
		console.log("=========================");
	}).catch(function() {
		console.log("参数不是一个number值");
		console.log("=========================");
	})
}

fn_1("12");
console.log("next code");

function fn_2(num) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			if(typeof num == "number") {
				resolve(num);
			} else {
				var err = num + " is not a number.";
				reject(err);
			}
		}, 2000);
	})
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})
}
fn_2("abc");
console.log("next code");