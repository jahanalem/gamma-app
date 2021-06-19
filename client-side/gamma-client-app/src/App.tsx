import { Route } from "react-router-dom";
import {AboutUs} from "./components/aboutUs/AboutUs";
import {ContactUs} from "./components/contactUs/ContactUs";
import MainNavbar from "./components/mainNavbar/MainNavbar";
import {HomePage} from "./components/home/HomePage";
import { PostDetails } from "./components/postDetails/PostDetails";
import './App.css';
import {Posts} from "./components/posts/Posts";

function App() {
  return (
    <div className="container">
      <MainNavbar />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Route path="/home" >
              <HomePage />
            </Route>
            <Route path="/about" >
              <AboutUs />
            </Route>
            <Route path="/contact">
              <ContactUs />
            </Route>
            <Route path="/post/:id">
              <PostDetails />
            </Route>
            <Route path="/posts/:page">
              <Posts />
            </Route>
          </>
        )}
      />
    </div>
  );
}

export default App;
