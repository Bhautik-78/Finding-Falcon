import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import {Button} from "antd";

const FindFalconResult = () => {
    const locationData = useLocation();
    let navigate = useNavigate();

    const onStartAgain = () => {
        navigate("/", {replace: true});
    };

    return (
        <div className="App">
            <Header/>
            {
                locationData?.state?.data?.status === "success" ?
                    <div className="mt-5">
                        <h2>Success! Congratulations on Finding Falcon. King Shah is mighty pleased.</h2>
                        <h2>Time taken: {locationData?.state?.timeTaken}</h2>
                        <h2>Planet found: {locationData?.state?.data?.planet_name}</h2>
                    </div>
                    :
                    <div className="mt-5">
                        <h2>{locationData?.state?.data?.status}</h2>
                    </div>
            }
            <div className="mt-5">
                <Button
                    onClick={() => onStartAgain()}
                >
                    Start Again
                </Button>
            </div>
            <Footer/>
        </div>
    )
};

export default FindFalconResult;
