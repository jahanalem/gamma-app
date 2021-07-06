import { Link } from 'react-router-dom';
import './footer.css';

export const Footer: React.FC = () => {
    return (
        <>
            <footer id="footer" className="pt-5 pb-1 bg-dark">
                <div className="container justify-content-center">
                    <div className="row align-left ml-1 mb-4 justify-content-center">
                        <a target="_blank" href="/Policy/CookiePolicy.html">
                            <span className="text-success">Green Codes</span><span className="text-warning"> Cookie Policy</span>
                        </a>
                    </div>
                    <div className="row align-left ml-1 justify-content-center">
                        <p className="m-0 text-center text-secondary">
                            Developed by
                            <Link to='/about' className="text-secondary"> Said Roohullah Allem</Link>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}





