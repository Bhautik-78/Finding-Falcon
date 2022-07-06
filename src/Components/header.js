import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="App">
            <div>
                <div className="d-flex justify-content-end align-items-center mt-2 mr-5 padding">
                    <Link className="mr-3" to="/">Reset </Link> | <Link className="ml-3" to="/">Home </Link>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <h1>Finding Falcone!</h1>
                </div>

            </div>
        </div>
    )
};

export default Header;
