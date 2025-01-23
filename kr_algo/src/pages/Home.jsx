import React, { useState, useRef } from 'react';
import GraphVisualization from '../components/GraphVisualization';
import GraphControls from '../components/GraphControls';
import GraphTables from '../components/GraphTables';
import {Link} from 'react-router-dom';

function Home() {
    const [graphEdges, setGraphEdges] = useState([]);
    const [dfsSteps, setDfsSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const addNode = (node) => {
        setGraphEdges((prev) => [...prev, [node, node]]);
    };

    const addEdge = (start, end) => {
        setGraphEdges((prev) => [...prev, [start, end]]);
    };

    const deleteNode = (node) => {
        setGraphEdges((prev) => prev.filter(([start, end]) => start !== node && end !== node));
    };

    const startDFS = (startNode) => {
        const adjacencyList = graphEdges.reduce((acc, [start, end]) => {
            if (!acc[start]) acc[start] = [];
            if (!acc[end]) acc[end] = [];
            acc[start].push(end);
            acc[end].push(start);
            return acc;
        }, {});

        const steps = [];
        const visited = new Set();
        const parentTable = {};
        const stack = [[startNode, null]];

        while (stack.length > 0) {
            const [current, parent] = stack.pop();
            if (!visited.has(current)) {
                visited.add(current);
                parentTable[current] = parent;

                steps.push({
                    nodesVisited: Array.from(visited),
                    edgesVisited: graphEdges.filter(
                        ([start, end]) =>
                            visited.has(start) && visited.has(end)
                    ),
                    parentTable: { ...parentTable },
                });

                adjacencyList[current]?.forEach((neighbor) => {
                    stack.push([neighbor, current]);
                });
            }
        }

        setDfsSteps(steps);
        setCurrentStep(0);
        playAnimation(steps, 0);
    };

    const playAnimation = (steps, startFromStep) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPaused(false);
        intervalRef.current = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < steps.length - 1) {
                    return prev + 1;
                } else {
                    clearInterval(intervalRef.current);
                    return prev;
                }
            });
        }, 1000);
    };

    const pauseAnimation = () => {
        setIsPaused(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const continueAnimation = () => {
        if (!isPaused) return;
        setIsPaused(false);
        playAnimation(dfsSteps, currentStep);
    };

    const stepForward = () => {
        if (currentStep < dfsSteps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const stepBackward = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div>
            <h1>Візуалізація графа з пошуком в глибину</h1>
            <Link to='/'>← На головну</Link>
            <GraphControls
                onAddNode={addNode}
                onAddEdge={addEdge}
                onDeleteNode={deleteNode}
                onStartDFS={startDFS}
                onPause={pauseAnimation}
                onContinue={continueAnimation}
                onStepForward={stepForward}
                onStepBackward={stepBackward}
            />
            <GraphVisualization
                graphEdges={graphEdges}
                dfsProgress={dfsSteps[currentStep] || { nodesVisited: [], edgesVisited: [] }}
            />
            <GraphTables
                edges={graphEdges}
                visitedNodes={dfsSteps[currentStep]?.nodesVisited || []}
                parentTable={dfsSteps[currentStep]?.parentTable || {}}
            />
        </div>
    );
}

export default Home;
