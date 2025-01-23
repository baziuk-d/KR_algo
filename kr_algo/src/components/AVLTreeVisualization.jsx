import React from 'react';
import '../styles/AVLTreeVisualization.css';

function AVLTreeVisualization({ tree, highlightedNodes }) {
    const renderTree = (node, x, y, level, stepX, stepY) => {
        if (!node) return null;

        const leftX = x - stepX / Math.pow(2, level);
        const rightX = x + stepX / Math.pow(2, level);
        const childY = y + stepY;

        return (
            <React.Fragment key={node.value}>
                {node.left && (
                    <line
                        x1={x}
                        y1={y}
                        x2={leftX}
                        y2={childY}
                        stroke="black"
                        strokeWidth="2"
                    />
                )}
                {node.right && (
                    <line
                        x1={x}
                        y1={y}
                        x2={rightX}
                        y2={childY}
                        stroke="black"
                        strokeWidth="2"
                    />
                )}
                <circle
                    cx={x}
                    cy={y}
                    r={highlightedNodes.includes(node.value) ? 20 : 15}
                    fill={highlightedNodes.includes(node.value) ? 'green' : 'blue'}
                />
                <text
                    x={x}
                    y={y}
                    dy="5"
                    textAnchor="middle"
                    fontSize="12"
                    fill="white"
                >
                    {node.value}
                </text>
                {renderTree(node.left, leftX, childY, level + 1, stepX, stepY)}
                {renderTree(node.right, rightX, childY, level + 1, stepX, stepY)}
            </React.Fragment>
        );
    };

    const width = 400;
    const height = 300;
    const startX = width / 2;
    const startY = 25;
    const stepX = 150;
    const stepY = 50;

    return (
        <div className="avl-tree-container">
            <svg width={width} height={height}>
                {tree && renderTree(tree, startX, startY, 1, stepX, stepY)}
            </svg>
        </div>
    );
}

export default AVLTreeVisualization;
