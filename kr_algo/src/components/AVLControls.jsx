import React, { useState } from 'react';
import '../styles/AVLControls.css';


function AVLControls({ onInsert, onRemove, onSearch }) {
    const [value, setValue] = useState('');
    const handleInsert = () => {
        if (value.trim() !== '') {
            onInsert(Number(value));
            setValue('');
        }
    };

    const handleRemove = () => {
        if (value.trim() !== '') {
            onRemove(Number(value));
            setValue('');
        }
    };

    const handleSearch = () => {
        if (value.trim() !== '') {
            onSearch(Number(value));
        }
    };

    return (
        <div className="avl-controls">
            <h3>Управління AVL-деревом</h3>
            <div className="control-group">
                <input
                    type="number"
                    placeholder="Введіть число"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={handleInsert}>Додати</button>
                <button onClick={handleRemove}>Видалити</button>
                <button onClick={handleSearch}>Знайти</button>

            </div>
        </div>
    );
}

export default AVLControls;