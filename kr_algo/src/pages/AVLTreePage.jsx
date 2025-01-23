import React, { useState } from 'react';
import AVLTree from '../utils/avlTree';
import AVLControls from '../components/AVLControls';
import AVLTreeVisualization from '../components/AVLTreeVisualization';
import {Link} from "react-router-dom";

function AVLTreePage() {
    const [avlTree] = useState(new AVLTree());
    const [root, setRoot] = useState(null);
    const [highlightedNodes, setHighlightedNodes] = useState([]);
    const [traversedNodes, setTraversedNodes] = useState([]);

    const animateTraversal = (path, callback) => {
        let index = 0;
        setHighlightedNodes([]);
        setTraversedNodes([path[0]]);

        const interval = setInterval(() => {
            if (index < path.length) {
                setHighlightedNodes([path[index]]);
                setTraversedNodes((prev) => [...prev, path[index]]);
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => setHighlightedNodes([]), 1000);
                if (callback) callback();
            }
        }, 500);
    };

    const handleInsert = (value) => {
        avlTree.insertValue(value);
        setRoot(avlTree.root);
        setHighlightedNodes([value]);
        setTraversedNodes([value]);
        setTimeout(() => setHighlightedNodes([]), 1000);
    };

    const handleRemove = (value) => {
        const path = [];
        const node = avlTree.searchValue(value, avlTree.root, path);

        if (node) {
            animateTraversal(path, () => {
                avlTree.removeValue(value);
                setRoot(avlTree.root);
            });
        } else {
            alert(`Вузол з значенням ${value} не знайдено!`);
        }
    };


    const handleSearch = (value) => {
        const path = [];
        const node = avlTree.searchValue(value, avlTree.root, path);

        if (node) {
            animateTraversal(path);
        } else {
            alert(`Вузол з значенням ${value} не знайдено!`);
        }
    };

    return (
        <div>
            <h1>Візуалізація роботи з AVL-деревом</h1>
            <Link to='/'>← На головну</Link>
            <AVLControls
                onInsert={handleInsert}
                onRemove={handleRemove}
                onSearch={handleSearch}
            />
            <AVLTreeVisualization tree={root} highlightedNodes={highlightedNodes}/>
            <div className="traversal-info">
                <h3>Обхід вузлів</h3>
                <p>
                    {traversedNodes.length > 0
                        ? traversedNodes
                        .filter((node) => node !== undefined)
                        .reduce((acc, node, index, array) => {
                            if (index === array.length - 1) {
                                return acc + node;
                            }
                            return acc + node + ' → ';
                        }, '') + (highlightedNodes.length === 0 ? ' → Кінець обходу' : '')
                        : 'Обхід ще не виконано'}
                </p>
            </div>


        </div>
    );
}

export default AVLTreePage;
