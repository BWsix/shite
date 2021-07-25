import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { Navbar, Main, Login, OnePost, User } from "./routes/hub";
import { updateUser } from "./functions/updateUser";
import { Status } from "./components/hub";
import { useGetPrevPosts } from "./pages/posts/hooks/usePosts";

import "./App.css";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
  });
}
export const db = firebase.firestore();
export const auth = firebase.auth();

export const UserContext = React.createContext<firebase.User>(
  {} as firebase.User
);

const App: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const POSTS = useGetPrevPosts();

  if (error) return <Status content="Error" />;
  if (loading) return <Status content="Loading" />;

  if (!user) return <Login />;
  else updateUser(user);

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Navbar />

        <div className="Container-outer">
          <div className="Container">
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Main POSTS={POSTS as any} />}
              />

              <Route
                path="/user/:uid"
                exact
                render={({
                  match: {
                    params: { uid },
                  },
                }) => <User uid={uid} userId={user.uid} />}
              />

              <Route
                path="/post/:id"
                exact
                render={({
                  match: {
                    params: { id },
                  },
                }) => <OnePost postId={id} />}
              />

              <Route
                path=""
                render={() => <Status content="page not found" />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
