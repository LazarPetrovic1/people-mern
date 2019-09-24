import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// eslint-disable-next-line
import tachyons from "tachyons";
import Nav from "./components/layout/Nav";
import UserState from "./context/user/UserState";
import UserList from "./components/users/UserList";
import UserForm from "./components/users/UserForm";
import FullUser from "./components/users/FullUser";
import "./App.css";

function App() {
  return (
    <UserState>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route exact path="/update-user/:id" component={UserForm} />
          <Route exact path="/add" component={UserForm} />
          <Route
            exact
            path="/user/:id"
            render={props => <FullUser {...props} />}
          />
        </Switch>
      </Router>
    </UserState>
  );
}

export default App;
