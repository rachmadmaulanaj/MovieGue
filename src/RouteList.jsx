import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import ViewDetail from './pages/ViewDetail';

const RouteList = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/detail/:slug" component={ViewDetail} />
            </Switch>
        </Router >
    )
}

export default RouteList;