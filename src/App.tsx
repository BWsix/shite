import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { Navbar, Main, Login } from "./routes/hub";
import { updateUser } from "./functions/updateUser";
import { Status } from "./components/hub";

import "./App.css";

if (!firebase.apps.length) {
  const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
  });
}
export const auth = firebase.auth();

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (error) return <Status content="Error" />;
  if (loading) return <Status content="Loading" />;

  if (!user) return <Login />;
  else updateUser(user);

  return (
    <Router>
      <Navbar user={user} />

      <div className="Container-outer">
        <div className="Container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Main uid={user.uid} name={user.displayName || ""} />
              )}
            />

            {/* <Route
              path="/user/:uid"
              exact
              render={({
                match: {
                  params: { uid },
                },
              }) => <User uid={uid} />}
            />

            <Route
              path="/post/:id"
              exact
              render={({
                match: {
                  params: { id },
                },
              }) => <OnePost id={id} />}
            /> */}

            <Route path="" render={() => <Status content="page not found" />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
