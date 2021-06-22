import { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { AboutUs } from "./components/aboutUs/AboutUs";
import { ContactUs } from "./components/contactUs/ContactUs";
import MainNavbar from "./components/mainNavbar/MainNavbar";
import { HomePage } from "./components/home/HomePage";
import { PostDetails } from "./components/postDetails/PostDetails";
import './App.css';
import { Posts } from "./components/posts/Posts";
import { useStore } from "./app/stores/store";
import { LoadingComponent } from "./layout/LoadingComponent";
import { Container } from "semantic-ui-react";

function App() {
  const { postStore } = useStore();

  useEffect(() => {
    postStore.loadPosts();
  }, [postStore])


  if (postStore.loadingInitial) return <LoadingComponent content="Loading app" />

  return (
    <>
      <div className="container">
        <Router>
          <Route exact path='/' component={HomePage} />
          <Route
            path={'/(.+)'}
            render={() => (
              <>
                <MainNavbar />
                <Container style={{ marginTop: '7em' }}>
                  <Switch>
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
                  </Switch>
                </Container >
              </>
            )}
          />
        </Router>
      </div>
    </>
  );
}

export default observer(App);
