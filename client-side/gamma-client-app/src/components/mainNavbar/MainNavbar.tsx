
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Category } from '../category/Category';
//import { useState } from 'react';

import $ from "jquery";
import { useStore } from '../../app/stores/store';



export const MainNavbar: React.FC = observer(() => {
    const { userStore } = useStore();
    //const [isAuthenticated, setIsAuthenticated] = useState(true);
    //const [superAdmin, setSuperAdmin] = useState(true);
    const logoutHandler = ()=>{
        userStore.logout();
    }
    return (
        <>
            <header className="mainheader">
                <img src="/images/menu.png" id="button1" alt="menu button" />
                <div id="cats">
                    <div className="search-section">
                        <form id="searchForm" className="form-inline" role="search">
                            <div className="input-group">
                                <input id="searchBox" type="search" className="form-control" autoComplete="off" placeholder="Search" name="search" />
                                <div id="search-result-body">

                                    <div id="number-of-search-results"></div>
                                    <div id="search-results">

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="menu-section">
                        <ul id="menu">

                            <li className="item"><Link to='/home'> Home</Link></li>
                            <li className="item">
                                <Link to="#">Categories<span className="plus"></span></Link>
                                <Category />
                            </li>
                            <li className="item"><Link to='/about'> About</Link></li>
                            <li className="item"><Link to='/contact'>  Contact</Link></li>
                            {
                                userStore.isLoggedIn ? (
                                    <>
                                        <li className="item">
                                            <Link to='#' onClick={logoutHandler} className=""> LogOut</Link>
                                            {/* <button onClick={auth.logout}>LOGOUT</button> */}
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
                    <img src="images/greencodes-logo.png" alt="logo" />
                </div>
            </header>
        </>
    );
})
