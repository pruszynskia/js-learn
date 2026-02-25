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

// Level 1 Fundamentals
function buildAdjacencyList(
  nodes: Node[],
  edges: Edge[],
): Map<number, number[]> {
  const adjacency = new Map<number, number[]>(); // map: node -> neighbos list

  // Initialization of empty lists for every node
  for (const node of nodes) {
    adjacency.set(node.id, []);
  }

  // Adding edges
  for (const edge of edges) {
    adjacency.get(edge.source)!.push(edge.target);
  }

  return adjacency;
}

const adjacency = buildAdjacencyList(nodes, edges);
console.log(adjacency);

// DFS - Depth First Search

function dfs(
  adjacency: Map<number, number[]>,
  start: number,
  visited = new Set<number>(),
) {
  // Visit current node
  console.log("Visiting:", start);
  visited.add(start);

  // Iterate over neighbors
  for (const neighbor of adjacency.get(start) ?? []) {
    if (!visited.has(neighbor)) {
      dfs(adjacency, neighbor, visited); // Rekurency
    }
  }
}

dfs(adjacency, 1); // Call dfs begining from 1

// BFS - Breadth First Search

function bfs(adjacency: Map<number, number[]>, start: number) {
  const visited = new Set<number>();
  const queue: number[] = [start];

  visited.add(start);

  while (queue.length > 0) {
    const current = queue.shift()!;
    console.log("Visiting:", current);

    for (const neighbor of adjacency.get(current)!) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor); // mark as visited
        queue.push(neighbor); // add to the end of queue
      }
    }
  }
}

bfs(adjacency, 1);
