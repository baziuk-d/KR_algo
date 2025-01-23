export function buildAdjacencyList(edges) {
  const adjacencyList = {};
  edges.forEach(([start, end]) => {
    if (!adjacencyList[start]) adjacencyList[start] = [];
    if (!adjacencyList[end]) adjacencyList[end] = [];
    adjacencyList[start].push(end);
    adjacencyList[end].push(start);
  });
  return adjacencyList;
}