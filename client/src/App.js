import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/appContext";
import axios from "axios";
import { METHODS } from "http";

const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => console.log("No Token"));
    }
    fetchToken();
  }, [uid]);
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </div>
  );
};

export default App;
