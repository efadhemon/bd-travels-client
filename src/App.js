
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import Destination from './components/Destination/Destination';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';

import { createContext, useState } from 'react';

export const userContext = createContext();
export const vehiclesContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  const [vehicles, setVehicles] = useState('');

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <vehiclesContext.Provider value={[vehicles, setVehicles]}>
          <Switch>
            <Route path='/home'>
              <Home></Home>
            </Route>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <PrivateRoute path='/destination'>
              <Destination vehicles={vehicles}></Destination>
            </PrivateRoute>
            <Route path='/login'>
              <Login></Login>
            </Route>
          </Switch>
        </vehiclesContext.Provider>
      </Router>
    </userContext.Provider>
  );
}

export default App;
