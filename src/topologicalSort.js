function dfs(course, graph, visited, stack) {
  if (visited.get(course) === "visiting") {
    throw new Error("The graph contains a cycle.");
  }

  if (visited.get(course) === "visited") {
    return;
  }

  visited.set(course, "visiting");

  graph.get(course).forEach((neighbor) => {
    if (visited.get(neighbor) !== "visited") {
      dfs(neighbor, graph, visited, stack);
    }
  });

  visited.set(course, "visited");
  stack.push(course);
}

function topologicalSort(courses, prerequisites) {
  let graph = new Map();
  let visited = new Map();
  let stack = [];

  courses.forEach((course) => {
    graph.set(course, []);
    visited.set(course, "unvisited");
  });

  prerequisites.forEach(([course, prereq]) => {
    graph.get(prereq).push(course);
  });

  try {
    courses.forEach((course) => {
      if (visited.get(course) === "unvisited") {
        dfs(course, graph, visited, stack);
      }
    });
  } catch (e) {
    return e.message;
  }

  return stack.reverse();
}

const courses1 = [
  "Intro to Programming",
  "Data Structures",
  "Algorithms",
  "Web Development"
];
const prerequisites1 = [
  ["Data Structures", "Intro to Programming"],
  ["Algorithms", "Data Structures"]
];

console.log(
  "Topological Sort of Basic Coding Curriculum:",
  topologicalSort(courses1, prerequisites1)
);

const courses2 = [
  "Advanced JavaScript",
  "React Development",
  "Node.js Development",
  "Full Stack Capstone"
];
const prerequisites2 = [
  ["React Development", "Advanced JavaScript"],
  ["Node.js Development", "Advanced JavaScript"],
  ["Full Stack Capstone", "React Development"],
  ["Full Stack Capstone", "Node.js Development"]
];

console.log(
  "Topological Sort of Advanced Coding Curriculum:",
  topologicalSort(courses2, prerequisites2)
);
