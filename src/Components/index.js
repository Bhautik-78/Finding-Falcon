import React from 'react';
import FindFalcon from "./findFalcon";
import Header from "./header";
import Footer from "./footer";

const MainPage = () => {
    return (
        <div className="App">
            <Header/>
            <FindFalcon/>
            <Footer/>
        </div>
    )
};

export default MainPage;
