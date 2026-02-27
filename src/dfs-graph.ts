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

interface Node2 {
  id: number;
  type: "value" | "add" | "multiply" | "subtract";
  value?: number[];
}

const nodes2: Node2[] = [
  { id: 1, type: "value", value: [2] },
  { id: 2, type: "value", value: [3] },
  { id: 3, type: "add", value: [1, 2] },
  { id: 4, type: "multiply", value: [3, 2] },
];
function executeGraph(
  nodes: Map<number, Node2>,
  adjacency: Map<number, number[]>,
) {
  if (hasCycle(adjacency)) {
    throw new Error("Circular dependency detected");
  }

  const order = topologicalSort(adjacency);
  const results = new Map<number, number>();

  for (const nodeId of order) {
    const node = nodes.get(nodeId);
    if (!node) continue;

    const inputs = adjacency.get(nodeId) ?? [];

    switch (node.type) {
      case "value":
        results.set(nodeId, node.value?.[0] ?? 0);
        break;

      case "add":
        results.set(
          nodeId,
          inputs.reduce((sum, id) => sum + (results.get(id) ?? 0), 0),
        );
        break;

      case "multiply":
        results.set(
          nodeId,
          inputs.reduce((prod, id) => prod * (results.get(id) ?? 1), 1),
        );
        break;

      case "subtract":
        if (inputs.length === 0) {
          results.set(nodeId, 0);
          break;
        }

        const [first, ...rest] = inputs;
        const base = results.get(first) ?? 0;

        const subtractValue = rest.reduce(
          (acc, id) => acc + (results.get(id) ?? 0),
          0,
        );

        results.set(nodeId, base - subtractValue);
        break;
    }
  }

  return results;
}
