interface Node {
  id: number;
  label: string;
}

interface Edge {
  source: number;
  target: number;
}

const nodes: Node[] = [
  { id: 1, label: "Anna" },
  { id: 2, label: "Andrzej" },
  { id: 3, label: "Jan" },
  { id: 4, label: "Paula" },
];

const edges: Edge[] = [
  { source: 1, target: 2 },
  { source: 2, target: 3 },
  { source: 3, target: 4 },
];

function buildAdjacencyList(nodes: Node[], edges: Edge[]) {
  // create adjacency array
  const adjacency = new Map<number, number[]>();

  //iterate over each node
  for (const node of nodes) {
    adjacency.set(node.id, []);
  }

  //iterate over edges
  for (const edge of edges) {
    adjacency.get(edge.source)?.push(edge.target);
  }

  return adjacency;
}

const adjacency = buildAdjacencyList(nodes, edges);
console.log(adjacency);

// Build DFS algo for graph

function dfs(
  adjacency: Map<number, number[]>,
  start: number,
  visited = new Set<number>(),
) {
  // set start to visited
  if (visited.has(start)) return;
  visited.add(start);
  //iterate over neighbors
  console.log("Visiting:", start);
  for (const neighbor of adjacency.get(start) ?? []) {
    if (!visited.has(neighbor)) {
      dfs(adjacency, neighbor, visited);
    }
  }
  return visited;
}

dfs(adjacency, 1);

function hasCycle(adjacency: Map<number, number[]>) {
  const visited = new Set<number>();
  const inStack = new Set<number>();

  function dfs(node: number) {
    if (inStack.has(node)) return true; //cycle
    if (visited.has(node)) return false;

    visited.add(node);
    inStack.add(node);

    for (const neighbor of adjacency.get(node) ?? []) {
      if (dfs(neighbor)) return true;
    }
    inStack.delete(node);
    return false;
  }
  for (const node of adjacency.keys()) {
    if (dfs(node)) return true;
  }
  return false;
}
console.log("Has Cycle:", hasCycle(adjacency));

function topologicalSort(adjacency: Map<number, number[]>) {
  const visited = new Set<number>();
  const result: number[] = [];

  function dfs(node: number) {
    if (visited.has(node)) return;
    visited.add(node);

    for (const neighbor of adjacency.get(node) ?? []) {
      dfs(neighbor);
    }
    result.push(node);
  }
  for (const node of adjacency.keys()) {
    dfs(node);
  }
  console.log("Result reverced:", result.reverse());
  return result.reverse();
}
topologicalSort(adjacency);
