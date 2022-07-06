import React from 'react';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import MainPage from "./Components";
import FindFalconResult from "./Components/findFalconResult";
import './App.css';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="result" element={<FindFalconResult/>}/>
                </Routes>
            </BrowserRouter>

        </>
    )
};

export default App;
