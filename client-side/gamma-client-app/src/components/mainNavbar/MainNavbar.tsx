import { Search } from '../../features/searchEngine/Search';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";
import '../mainNavbar/mainNavbar.css';
import { observer } from 'mobx-react-lite';

export const MainNavbar: React.FC = observer(() => {
    return (
        <>
            <div className="mainNavbar mb-3">
                <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                    <Navbar.Brand as={NavLink} exact to='/'>Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto" >

                            <Nav.Link as={NavLink} exact to='/'>Home</Nav.Link>
                            <Nav.Link as={NavLink} exact to='/about'>About</Nav.Link>
                            <Nav.Link as={NavLink} exact to='/contact'>Contact</Nav.Link>

                            <Search />

                        </Nav>
                        <nav>
                            <Nav.Link as={NavLink} exact to='/login' >Login</Nav.Link>
                        </nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
})
