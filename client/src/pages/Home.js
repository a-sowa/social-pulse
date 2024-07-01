import React from "react";
import LeftNav from "../components/LeftNav.js";
import Thread from "../components/Thread.js";


const Home = () => {
    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <Thread />
            </div>
        </div>
    );
};

export default Home;