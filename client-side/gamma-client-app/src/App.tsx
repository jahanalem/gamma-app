import { useEffect } from "react";
import { Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { AboutUs } from "./components/aboutUs/AboutUs";
import { ContactUs } from "./components/contactUs/ContactUs";
import { MainNavbar } from "./components/mainNavbar/MainNavbar";
import { HomePage } from "./components/home/HomePage";
import { PostDetails } from "./components/postDetails/PostDetails";
import './App.css';
import { Posts } from "./components/posts/Posts";
import { useStore } from "./app/stores/store";
import { LoadingComponent } from "./layout/LoadingComponent";
import { Container } from "semantic-ui-react";
import { Login } from "./components/Account/login/login";
import { Signup } from "./components/Account/signup/signup";
import { PostsByTagId } from "./components/postsByTagId/postsByTagId";

const App: React.FC = () => {
  // const { postStore } = useStore();
  // const { tagStore } = useStore();
  // useEffect(() => {
  //   postStore.loadPosts();
  //   tagStore.loadTags();
  // });


  // if (postStore.loadingInitial) return <LoadingComponent content="Loading app" />

  return (

    <div id="page-container">
      <MainNavbar />
      <main className="wrapper">
        <div>
          <div id="render_body" className="container-fluid">

            <Route exact path='/' component={HomePage} />
            <Route
              path={'/(.+)'}
              render={() => (
                <>
                  <Route path={["/home", "/posts/tag/:tagId"]} >
                    {console.log("go to homepage from /home")}
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

                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/signup">
                    <Signup />
                  </Route>
                </>
              )}
            />
          </div>
        </div>
      </main>
    </div>

  );
}

export default observer(App);
