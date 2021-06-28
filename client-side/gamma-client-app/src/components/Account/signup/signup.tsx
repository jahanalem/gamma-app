import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';

export const Signup: React.FC = observer(() => {

    const togglePasswordVisibility = (e: any) => {
        
    }

    return (
        <>
            <div id="signupContainer" className="row">

                <aside className="col-sm-4">
                </aside>

                <aside className="col-sm-4">
                    <div className="card  mb-2 mt-2">
                        <article className="card-body">
                            <Link to="/login" className="float-right btn btn-outline-primary">Sign in</Link>
                            <h4 className="card-title mb-4 mt-1">Sign up</h4>
                            <p>

                                <Link to="#" asp-action="FacebookLogin" className="btn btn-block btn-outline-primary"> <i className="fa fa-facebook-f"></i>  sign up via facebook</Link>
                                <Link to="#" asp-action="GoogleLogin" className="btn btn-block btn-outline-primary"> <i className="fa fa-google"></i>  sign up via Google</Link>
                            </p>
                            <hr />
                            <div className="text-danger" asp-validation-summary="All"></div>
                            <form asp-action="Signup" method="post" id="signupForm">

                                <input type="hidden" name="returnUrl" value="@ViewBag.returnUrl" />
                                <div className="form-group">
                                    <input asp-for="FirstName" placeholder="first name" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <input asp-for="LastName" placeholder="last name" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <input asp-for="UserName" placeholder="user name" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <input asp-for="Email" className="form-control" placeholder="Email" type="email" required />
                                </div>
                                <div className="form-group">
                                    <input asp-for="Password" className="form-control" placeholder="password" type="password" minLength={4} maxLength={8} required />
                                </div>
                                <div className="form-group">
                                    <input asp-for="ConfirmPassword" className="form-control" placeholder="confirm password" type="password"
                                        data-rule-equalto="#Password" minLength={4} maxLength={8} required />
                                    <input type="checkbox" onClick={togglePasswordVisibility} />Show Password
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block"> sign up </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </article>
                    </div>

                </aside>

                <aside className="col-sm-4">
                </aside>

            </div>
        </>
    )

})