import React, { useState } from 'react';

function GraphControls({ onAddNode, onAddEdge, onDeleteNode, onStartDFS, onStepForward, onStepBackward, onPause, onContinue }) {
    const [nodeId, setNodeId] = useState('');
    const [startNode, setStartNode] = useState('');
    const [edgeStart, setEdgeStart] = useState('');
    const [edgeEnd, setEdgeEnd] = useState('');

    const handleAddNode = () => {
        onAddNode(Number(nodeId));
        setNodeId('');
    };

    const handleAddEdge = () => {
        onAddEdge(Number(edgeStart), Number(edgeEnd));
        setEdgeStart('');
        setEdgeEnd('');
    };

    const handleDeleteNode = () => {
        onDeleteNode(Number(nodeId));
        setNodeId('');
    };

    return (
        <div>
            <h3>Керування графом</h3>
            <div>
                <label>Введіть ID вузла:</label>
                <input type="text" value={nodeId} onChange={(e) => setNodeId(e.target.value)} />
                <button onClick={handleAddNode}>Додати вузол</button>
                <button onClick={handleDeleteNode}>Видалити вузол</button>
            </div>
            <div>
                <label>Початковий вузол для ребра:</label>
                <input type="text" value={edgeStart} onChange={(e) => setEdgeStart(e.target.value)} />
                <label>Кінцевий вузол для ребра:</label>
                <input type="text" value={edgeEnd} onChange={(e) => setEdgeEnd(e.target.value)} />
                <button onClick={handleAddEdge}>Додати ребро</button>
            </div>
            <div>
                <label>Початковий вузол для DFS:</label>
                <input type="text" value={startNode} onChange={(e) => setStartNode(e.target.value)} />
                <button onClick={() => onStartDFS(Number(startNode))}>Запустити DFS</button>
            </div>
            <div>
                <button onClick={onStepBackward}>Крок назад</button>
                <button onClick={onStepForward}>Крок вперед</button>
                <button onClick={onPause}>Пауза</button>
                <button onClick={onContinue}>Продовжити</button>
            </div>
        </div>
    );
}

export default GraphControls;
