// src/App.js
import React from 'react';
import Calendar from './Calendar';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <h1>Monthly Calendar</h1>
            <Calendar />
        </div>
    );
};

export default App;