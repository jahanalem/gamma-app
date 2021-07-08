import { Redirect, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AboutUs } from "./components/aboutUs/AboutUs";
import { ContactUs } from "./components/contactUs/ContactUs";
import { MainNavbar } from "./components/mainNavbar/MainNavbar";
import { HomePage } from "./components/home/HomePage";
import PostDetails from "./components/postDetails/PostDetails";
import { Posts } from "./components/posts/Posts";
import { Login } from "./components/Account/login/login";
import { Signup } from "./components/Account/signup/signup";
import { PostsByTagId } from "./components/postsByTagId/postsByTagId";
import { PostsByCategoryId } from "./components/postsByCategoryId/PostsByCategoryId";
import { useStore } from "./app/stores/store";
//import { ToastContainer } from 'react-toastify';
//import { LoadingComponent } from "./layout/LoadingComponent";
import './App.css';
import { Footer } from "./layout/footer/Footer";
import AdminPanel from "./components/adminPanel/AdminPanel";


const App: React.FC = () => {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getCurrentUser().catch((error) => {
        commonStore.setAppLoaded();
        console.log(error);
        commonStore.setServerError({
          statusCode: 400,
          message: "Access denied!",
          details: "You don't have permision for this action."
        });
      })
        .finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  //if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      {/* <ToastContainer position='bottom-right' hideProgressBar /> */}
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
                    <Switch>
                      <Route path={["/home"]} exact>
                        <HomePage />
                      </Route>
                      <Route path="/posts/tag/:tagId" exact>
                        <HomePage />
                      </Route>
                      <Route path="/posts/category/:catId" exact>
                        <HomePage />
                      </Route>
                      <Route path="/about" exact>
                        <AboutUs />
                      </Route>
                      <Route path="/contact" exact>
                        <ContactUs />
                      </Route>
                      <Route path="/post/:id" exact>
                        <PostDetails />
                      </Route>
                      <Route path="/posts/:page" exact>
                        <Posts />
                      </Route>
                      <Route path="/login" exact>
                        <Login />
                      </Route>
                      <Route path="/signup" exact>
                        <Signup />
                      </Route>
                      <Route path="/admin" exact>
                        <AdminPanel />
                      </Route>
                      <Redirect to="/" />
                    </Switch>

                  </>
                )}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default observer(App);



/*
$(document).ready(function () {
  //console.log("I am .plus");
  $(".plus").click(function (event) {
    console.log(".plus clicked!");
    $(".plus").toggleClass("rotated-plus");
    $(".plus").parent().siblings("ul").slideToggle();
    event.preventDefault();
  });
});
*/