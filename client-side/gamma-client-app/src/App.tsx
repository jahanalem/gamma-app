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
import { PostsByTagId } from "./components/postsByTagId/postsByTagId";
import './App.css';
import { PostsByCategoryId } from "./components/postsByCategoryId/PostsByCategoryId";
import $ from "jquery";

console.log("AAAAAAAAAAA");

// $(()=> {
//   console.log("BBBBBBBBBB");
//   $(".plus").on('click', function (event: JQuery.ClickEvent<HTMLElement, null, HTMLElement, HTMLElement>) {
//     $(".plus").toggleClass("rotated-plus");
//     $(".plus").parent().siblings("ul").slideToggle();
//     //event.preventDefault();
    
//   });
// });

// $( ()=> {
//   console.log("CCCCCCCCCCCc");
//   $("#button1").on('click', function (event:JQuery.ClickEvent<HTMLElement, null, HTMLElement, HTMLElement>) {
      
//     if ($("#cats").css("left") === "-300px") {
//       $("#cats").css("left", "0");

//       $("#topmenu ul").slideUp();
//     } else {
//       $("#cats").css("left", "-300px");
//     }
//     //event.preventDefault();

//   });
// });



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



$(function () {
  $("#button1").click(function () {
      if ($("#cats").css("left") === "-300px") {
          $("#cats").css("left", "0");

          $("#topmenu ul").slideUp();
      } else {
          $("#cats").css("left", "-300px");
      }
  });
});


$(document).ready(function () {
  console.log("I am .plus");
  $(".plus").click(function (event) {
    console.log(".plus clicked!");
    $(".plus").toggleClass("rotated-plus");
    $(".plus").parent().siblings("ul").slideToggle();
    event.preventDefault();
  });
});