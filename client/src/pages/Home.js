import React, { useContext } from "react";
import LeftNav from "../components/LeftNav.js";
import Thread from "../components/Thread.js";
import { UidContext } from "../components/AppContext.js";
import NewPostForm from "../components/Post/NewPostForm.js";
import Log from "../components/Log/Index.js";

const Home = () => {
  const uid = useContext(UidContext);
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
        {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
