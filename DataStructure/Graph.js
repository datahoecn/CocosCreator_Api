

// function Vertex(label, wasVisited) {
// 	this.label = label;
// 	this.wasVisited = wasVisited;
// }

// function Graph(v) {
// 	this.vertices = v;
// 	this.edges = 0;
// 	this.adj = [];
// 	for (var i = 0; i < this.vertices; i++) {
// 		this.adj[i] = [];
// 		// this.adj[i].push("");
// 	}
// 	this.addEdge = addEdge;
// 	this.showGraph = showGraph;
// 	// 确定一个指定顶点可以到达其他哪些顶点
// 	this.dfs = dfs; // 深度优先搜索
// 	this.bfs = bfs; // 广度优先搜索
// 	this.edgeTo = [];
// 	this.marked = [];
// 	for (var i = 0; i < this.vertices; i++) {
// 		this.marked[i] = false;
// 	}

// 	this.pathTo = pathTo;
// 	this.hasPathTo = hasPathTo;
// }

// function addEdge(v, w) {
// 	this.adj[v].push(w);
// 	this.adj[w].push(v);
// 	this.edges++;
// }

// function showGraph() {
// 	for (var i = 0; i < this.vertices; i++) {
// 		console.log("=== " + i + " ===");
// 		for (var j = 0; j < this.vertices; j++) {
// 			if(this.adj[i][j] != undefined) {
// 				console.log(this.adj[i][j]);
// 			}
// 		}
// 		console.log(" ");
// 	}
// }

// function dfs(v) {
// 	this.marked[v] = true;
// 	if (this.adj[v] != undefined) {
// 		console.log("Visited vertex: " + v);
// 	}
// 	for (var j = 0; j < this.adj[v].length; j++) {
// 		if(!this.marked[this.adj[v][j]]) {
// 			this.dfs(this.adj[v][j]);
// 		}
// 	}
// }

// function bfs(s) {
// 	var queue = [];
// 	this.marked[s] = true;
// 	queue.push(s);
// 	while (queue.length > 0) {
// 		var v = queue.shift();
// 		if(this.adj[v] != undefined) {
// 			console.log("Visited vertex: + " + v);
// 		}

// 		for (var j = 0; j < this.adj[v].length; j++) {
// 			var w = this.adj[v][j];
// 			if(!this.marked[w]) {
// 				this.marked[w] = true;
// 				queue.push(w);
// 				this.edgeTo[w] = v;
// 			}
// 		}
// 	}
// }

// function pathTo(v) {
// 	var source = 0;
// 	if(!this.hasPathTo(v)) {
// 		return undefined;
// 	}
// 	var path = [];
// 	for (var i = v; i != source; i = this.edgeTo[i]) {
// 		path.push(i);
// 	}
// 	path.push(source);
// 	return path;
// }

// function hasPathTo(v) {
// 	return this.marked[v];
// }

// var g = new Graph(5);
// g.addEdge(0,1);
// g.addEdge(0,2);
// g.addEdge(1,3);
// g.addEdge(2,4);
// g.showGraph();
// g.bfs(0);
// var vertex = 4;
// var paths = g.pathTo(vertex);
// while (paths.length > 0) {
// 	if(paths.length > 1) {
// 		console.log(paths.pop() + "-");
// 	} else {
// 		console.log(paths.pop());
// 	}
// }

// 拓扑排序
function Graph(v) {
	this.vertices = v;
	this.vertexList = [];
	this.edges = 0;
	this.adj = [];
	for (var i = 0; i < this.vertices; i++) {
		this.adj[i] = [];
		// this.adj[i].push("");
	}
	this.addEdge = addEdge;
	this.showGraph = showGraph;
	// 确定一个指定顶点可以到达其他哪些顶点
	this.marked = [];
	for (var i = 0; i < this.vertices; i++) {
		this.marked[i] = false;
	}
	this.topSortHelper = topSortHelper;
	this.topSort = topSort;
}

function topSort() {
	var stack = [];
	var visited = [];
	for (var i = 0; i < this.vertices; i++) {
		visited[i] = false;
	}
	for (var i = 0; i < this.vertices; i++) {
		if(visited[i] == false) {
			this.topSortHelper(i,visited, stack);
		}
	}
	for (var i = 0; i < stack.length; i++) {
		console.log(this.vertexList[stack[i]]);
	}


}

function topSortHelper(v, visited, stack) {
	visited[v] = true;
	if(this.adj[v]){
		for (var j = 0; j < this.adj[v].length; j++) {
			var w = this.adj[v][j];
			if(!visited[w]) {
				this.topSortHelper(w, visited, stack);
			}
		}
		stack.push(v);
	}
	
}

function addEdge(v, w) {
	this.adj[v].push(w);
	this.adj[w].push(v);
	this.edges++;
}

function showGraph() {
	for (var i = 0; i < this.vertices; i++) {
		console.log("=====================");
		console.log(i,this.vertexList[i]);
		for (var j = 0; j < this.vertices; j++) {
			var w = this.adj[i][j]
			if(w != undefined) {
				console.log(w, this.vertexList[w]);
			}
		}
	}
}

var g = new Graph(6);
g.addEdge(1,2);
g.addEdge(2,5);
g.addEdge(1,3);
g.addEdge(1,4);
g.addEdge(0,1);
g.vertexList = ["CS1", "CS2", "Data Structures", "Assembly Language", "Operating Systems", "Algorithms"];
// g.showGraph();
g.topSort();

