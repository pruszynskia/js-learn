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

function