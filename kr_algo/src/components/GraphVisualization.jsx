import React, { useEffect, useState } from 'react';
import '../styles/GraphVisualization.css';
import { buildAdjacencyList } from '../utils/graphUtils';

function GraphVisualization({ graphEdges, startNode, dfsProgress }) {
    const [nodeCoordinates, setNodeCoordinates] = useState({});

    useEffect(() => {
        if (!graphEdges || graphEdges.length === 0) return;

        const adjacencyList = buildAdjacencyList(graphEdges);

        const nodes = Object.keys(adjacencyList);
        const radius = 200;
        const centerX = 300;
        const centerY = 300;
        const coordinates = nodes.reduce((acc, node, index) => {
            const angle = (2 * Math.PI * index) / nodes.length;
            acc[node] = {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
            };
            return acc;
        }, {});
        setNodeCoordinates(coordinates);
    }, [graphEdges]);

    return (
        <svg id="graph-container" width="600" height="600">
            {graphEdges.map(([start, end], index) => (
                <line
                    key={index}
                    x1={nodeCoordinates[start]?.x}
                    y1={nodeCoordinates[start]?.y}
                    x2={nodeCoordinates[end]?.x}
                    y2={nodeCoordinates[end]?.y}
                    className={dfsProgress.edgesVisited.includes(`${start}-${end}`) ? 'line visited' : 'line'}
                />
            ))}

            {Object.entries(nodeCoordinates).map(([node, {x, y}]) => (
                <g key={node}>
                    <circle
                        cx={x}
                        cy={y}
                        r="15"
                        className={dfsProgress.nodesVisited.includes(Number(node)) ? 'node visited' : 'node'}
                    />
                    <text x={x} y={y} dy="5">
                        {node}
                    </text>
                </g>
            ))}
        </svg>
    );
}

export default GraphVisualization;
