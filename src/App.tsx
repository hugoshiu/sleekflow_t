import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

import Contact from 'pages/Contact'
import Layout from 'components/Layout';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <Layout>
                            <Contact />
                        </Layout>
                    } 
                />
            </Routes>
        </div>
    );
}

export default App;
