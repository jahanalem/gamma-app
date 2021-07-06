
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Category } from '../category/Category';
import { useStore } from '../../app/stores/store';
import GammaSearch from '../features/searchEngine/GammaSearch';
import "./mainNavbar.css";
import userStore from '../../app/stores/userStore';

export const MainNavbar: React.FC = observer(() => {
    const { userStore } = useStore();

    const logoutHandler = () => {
        userStore.logout();
    }
    return (
        <>
            <header className="mainheader">
                <img src="/images/menu.png" id="button1" alt="menu button" />
                <div id="cats">
                    <div className="search-section">
                        <GammaSearch />
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
                    <img src="images/greencodes-logo.png" alt="logo" />
                </div>
            </header>
        </>
    );
})
