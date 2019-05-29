(function(){
	var getLogin = function() {
		var a = parseInt(Math.random() * 10).toFixed(0);
		if (a % 2 == 0) {
			return  { login: false}
		}

		return {
			login: true,
			userinfo: {
				nickname: "jask",
				vip: 11,
				userid: "666666"
			}
		}
	}

	var withLogin = function(basicFn) {
		var loginInfo = getLogin();
		return basicFn.bind(null, loginInfo);
	}
	window.withLogin = withLogin;
})();

(function() {
	var withLogin = window.withLogin;
	var randerIndex = function(loginInfo) {
		if (loginInfo.login) {

		} else {

		}
	}

	window.renderIndex = withLogin(renderIndex)
})();


