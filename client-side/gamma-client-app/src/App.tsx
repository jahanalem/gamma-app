import { Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { AboutUs } from "./components/aboutUs/AboutUs";
import { ContactUs } from "./components/contactUs/ContactUs";
import { MainNavbar } from "./components/mainNavbar/MainNavbar";
import { HomePage } from "./components/home/HomePage";
import { PostDetails } from "./components/postDetails/PostDetails";
import { Posts } from "./components/posts/Posts";
import { Login } from "./components/Account/login/login";
import { Signup } from "./components/Account/signup/signup";
import { PostsByTagId } from "./components/postsByTagId/PostsByTagId";
import './App.css';
import { PostsByCategoryId } from "./components/postsByCategoryId/PostsByCategoryId";


const App: React.FC = () => {
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
                  <Route path={["/home"]} >
                    <HomePage />
                  </Route>
                  <Route path="/posts/tag/:tagId">
                    <PostsByTagId />
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
                  <Route path="/posts/category/:catId">
                    <PostsByCategoryId />
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
