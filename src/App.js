  import { HashRouter as Router, Routes, Route } from "react-router-dom";
  import { Fragment, useEffect } from "react";
  import "./App.css";
  import Landing from "./componets/Landing";
  import Navbar from "./componets/Navbar";
  import store from "./redux/store";
  import { Provider } from "react-redux";
  import Register from "./componets/Users/Register";
  import { transitions, positions, Provider as AlertProvider } from "react-alert";
  import AlertTemplate from "react-alert-template-basic";
  import Alert from "./componets/Alert";
  import Login from "./componets/Users/Login";
  import Home from "./componets/Home";
  import Private from "./componets/Private";
  import ProfileForm from "./componets/ProfileForms/ProfileForm";
  import AddEducation from "./componets/ProfileForms/AddEducation";
  import AddExperience from "./componets/ProfileForms/AddExperience";
  import { setAuthToken } from "./utils";
  import { loadUser } from "./redux/modules/users";
  import Developers from "./componets/Developers";
  import Profile from "./componets/Profile";
  import Settings from "./componets/Settiings";
  import Posts from "./componets/Posts/Posts";
  import Post from "./componets/Posts/Post";

  const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000, // مدة عرضه
    ofset: "30px", // بعده عن طرف الشاشة
    transitions: transitions.SCALE,
  };

  function App() {
    useEffect(() => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      store.dispatch(loadUser());
    }, []);
    // Fragment as Container and does not render in DOM
    // <Navbar /> we will always load navbar
    // <Provider store={store}> لازم يحيط بالروت كومبومنت
    return (
      <Provider store={store}>
        <Router>
          <AlertProvider template={AlertTemplate} {...options}>
            <Fragment>
              <Alert />
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route
                  exact
                  path="/home"
                  element={<Private component={Home} />}
                />
                <Route
                  exact
                  path="/create-profile"
                  element={<Private component={ProfileForm} />}
                />
                <Route
                  exact
                  path="/add-education"
                  element={<Private component={AddEducation} />}
                />
                <Route
                  exact
                  path="/add-experience"
                  element={<Private component={AddExperience} />}
                />
                <Route
                  exact
                  path="/developers"
                  element={<Private component={Developers} />}
                />
                <Route
                  exact
                  path="/profile/:id"
                  element={<Private component={Profile} />}
                />
                <Route
                  exact
                  path="/settings"
                  element={<Private component={Settings} />}
                />
                <Route
                  exact
                  path="/edit-profile"
                  element={<Private component={ProfileForm} />}
                />
                <Route
                  exact
                  path="/posts"
                  element={<Private component={Posts} />}
                />
                <Route
                  exact
                  path="/posts/:id"
                  element={<Private component={Post} />}
                />
              </Routes>
            </Fragment>
          </AlertProvider>
        </Router>
      </Provider>
    );
  }

  export default App;
