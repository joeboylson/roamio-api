import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import DashBoard from '../DashBoard/DashBoard';
import Login from '../Login/Login';
import InterestList from '../Interest/InterestList';

const App = () => {

  return (
    <Router>
        <Switch>
          <Route path="/login" component={Login}/>

          <Route path="/">
            <DashBoard>
              <InterestList/>
            </DashBoard>
          </Route>

        </Switch>
    </Router>
  );

}

export default App;