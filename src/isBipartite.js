function bfs(graph, start, color) {
  let queue = [start];
  color[start] = 0;

  while (queue.length > 0) {
    let node = queue.shift();

    for (let neighbor of graph[node]) {
      if (color[neighbor] === -1) {
        color[neighbor] = 1 - color[node];
        queue.push(neighbor);
      } else if (color[neighbor] === color[node]) {
        return false;
      }
    }
  }
  return true;
}

function isBipartite(graph) {
  let color = new Array(graph.length).fill(-1);

  for (let i = 1; i < graph.length; i++) {
    if (color[i] === -1) {
      if (!bfs(graph, i, color)) {
        return false;
      }
    }
  }
  return true;
}

// 1 -- 2
// |    |
// 4 -- 3

const bipartiteGraph = [
  [], // Index 0 is unused in 1-based indexing
  [2, 4], // Neighbors of vertex 1
  [1, 3], // Neighbors of vertex 2
  [2, 4], // Neighbors of vertex 3
  [1, 3] // Neighbors of vertex 4
];
console.log("Is the graph bipartite?", isBipartite(bipartiteGraph)); // Logs true

//    1
//  / | \
// 2  3--4

const nonBipartiteGraph = [[], [2, 3, 4], [1], [1, 4], [1, 3]];
console.log("Is the graph bipartite?", isBipartite(nonBipartiteGraph)); // Logs false
