import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

const index = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact Component={Home} />
                <Route path="/Profil" exact Component={Profil} />
                <Route path="/Trending" exact Component={Trending} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;
