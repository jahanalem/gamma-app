
import React, { SyntheticEvent, useRef } from "react";
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Category } from '../category/Category';
import { useStore } from '../../app/stores/store';
import GammaSearch from '../features/searchEngine/GammaSearch';
import "./mainNavbar.css";
import $ from "jquery";
import { LoadingComponent } from "../../layout/LoadingComponent";


// $(function () {
//     $("#button1").click(function () {
//         if ($("#cats").css("left") === "-300px") {
//             $("#cats").css("left", "0");

//             $("#topmenu ul").slideUp();
//         } else {
//             $("#cats").css("left", "-300px");
//         }
//     });
// });



$(document).ready(function () {
    $(".plus").click(function (event) {
        $(".plus").toggleClass("rotated-plus");
        $(".plus").parent().siblings("ul").slideToggle();
        event.preventDefault();
    });
});

export const MainNavbar: React.FC = observer(() => {
    const { userStore, postStore } = useStore();
    const categoriesRef = useRef<HTMLAnchorElement>(null);
    const button1 = useRef<HTMLImageElement>(null);
    const cats = useRef<HTMLDivElement>();

    const logoutHandler = () => {
        userStore.logout();
    }

    const imgClickHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        if (cats.current.style.left === "-300px") {
            cats.current.style.left = "0";
        }
        else {
            cats.current.style.left = "-300px";
        }
    }

    console.log(postStore.loadingInitial);
    //if (postStore.loadingInitial) return <LoadingComponent content="Loading posts" />
    
    return (
        <>
            <header className="mainheader">

                <img onClick={imgClickHandler} ref={button1} src="/images/menu.png" id="button1" alt="menu button" />

                <div ref={cats} id="cats">
                    <div className="search-section">
                        <GammaSearch />
                    </div>
                    <div className="menu-section">
                        <ul id="menu">

                            <li className="item"><Link to='/'> Home</Link></li>
                            <li className="item">
                                <Link ref={categoriesRef} to="#">Categories<span className="plus"></span></Link>
                                <Category />
                            </li>
                            <li className="item"><Link to='/about'> About</Link></li>
                            <li className="item"><Link to='/contact'>  Contact</Link></li>
                            {
                                userStore.isLoggedIn ? (
                                    <>
                                        <li className="item">
                                            <Link to='#' onClick={logoutHandler} className=""><span className="show-username">{userStore.user.UserName}</span> / LogOut</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="item">

                                            <Link to='/login' className=""> Login</Link>
                                        </li>
                                    </>
                                )
                            }
                            {/* <li className="item">
                                <Link to='#' className="">  Dashboard</Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div id="logo">
                    <Link to="/">
                        <img src="images/greencodes-logo.png" alt="logo" />
                    </Link>
                </div>
            </header>
        </>
    );
})
