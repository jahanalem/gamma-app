import { Route } from "react-router-dom";
import { AboutUs } from "./components/aboutUs/AboutUs";
import { ContactUs } from "./components/contactUs/ContactUs";
import MainNavbar from "./components/mainNavbar/MainNavbar";
import { HomePage } from "./components/home/HomePage";
import { PostDetails } from "./components/postDetails/PostDetails";
import './App.css';
import { Posts } from "./components/posts/Posts";
import { observer } from "mobx-react-lite";
import { useStore } from "./app/stores/store";
import { useEffect } from "react";
import postStore from "./app/stores/postStore";
import { LoadingComponent } from "./layout/LoadingComponent";

function App() {
  const { postStore } = useStore();

  useEffect(() => {
    postStore.loadPosts();
  }, [postStore])


  if (postStore.loadingInitial) return <LoadingComponent content="Loading app" />

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

export default observer(App);
