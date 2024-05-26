function buildAdjacencyList(n, prefer1, prefer2) {
  const graph = [...Array(n + 1)].map(() => []);

  for (let i = 0; i < prefer1.length; i++) {
    graph[prefer1[i]].push(prefer2[i]);
    graph[prefer2[i]].push(prefer1[i]);
  }
  return graph;
}

function bfs(start, graph, markers) {
  const queue = [start];

  markers[start] = 0;

  while (queue.length > 0) {
    const node = queue.shift();

    for (let collaborator of graph[node]) {
      if (markers[collaborator] === null) {
        markers[collaborator] = 1 - markers[node];
        queue.push(collaborator);
      } else if (markers[collaborator] === markers[node]) {
        return false;
      }
    }
  }
  return true;
}

function canFormTeams(n, prefer1, prefer2) {
  const markers = Array(n + 1).fill(null);

  const graph = buildAdjacencyList(n, prefer1, prefer2);

  for (let i = 1; i <= n; i++) {
    if (markers[i] === null && !bfs(i, graph, markers)) {
      return false;
    }
  }
  return true;
}

const n = 5;
const prefer1 = [1, 2, 2, 3, 4];
const prefer2 = [3, 3, 5, 4, 5];

console.log("Can form teams:", canFormTeams(n, prefer1, prefer2));

console.log(
  "Cannot form teams:",
  canFormTeams(4, [1, 1, 1, 2, 3], [2, 3, 4, 3, 4])
);
