function GraphTables({ edges, visitedNodes, parentTable }) {
    const visitedNodesSet = new Set(visitedNodes);

    return (
        <div className="container">
            <div className="table-container">
                <h3>Список ребер</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Ребро</th>
                    </tr>
                    </thead>
                    <tbody>
                    {edges.map(([start, end], index) => (
                        <tr key={index}>
                            <td>{`${start} - ${end}`}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="table-container">
                <h3>Відвідані вузли</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Вузол</th>
                        <th>Відвідано</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from(new Set(edges.flat())).map((node, index) => (
                        <tr key={index}>
                            <td>{node}</td>
                            <td>{visitedNodesSet.has(node) ? 'Так' : 'Ні'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="table-container">
                <h3>Таблиця батьків</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Вузол</th>
                        <th>Батько</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(parentTable).map(([node, parent], index) => (
                        <tr key={index}>
                            <td>{node}</td>
                            <td>{parent !== null ? parent : 'Немає'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GraphTables;
