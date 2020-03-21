	function Graph(v) {
		this.vertices = v;
		this.vertexList = [];
		this.adj = [];
		for (var i = 0; i < this.vertices; i++) {
			this.adj[i] = [];
		}

		this.marked = [];
		for (var i = 0; i < this.vertices; i++) {
			this.marked[i] = false;
		}

		this.addEdge = addEdge;
		this.showGraph = showGraph;
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
