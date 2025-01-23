import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import AVLTreePage from "./pages/AVLTreePage";
import './styles/App.css';

function App() {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Main />} />
                    <Route path="/avl" element={<AVLTreePage />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
