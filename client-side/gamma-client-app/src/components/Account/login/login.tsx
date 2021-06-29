import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

export const Login: React.FC = observer(() => {
    return (
        <>
            <div id="loginContainer" className="row">

                <aside className="col-sm-4">
                </aside>

                <aside className="col-sm-4">
                    <div className="card  mb-2 mt-2">
                        <article className="card-body">
                            <Link to='/signup' className="float-right btn btn-outline-primary">Sign up</Link>
                            <h4 className="card-title mb-4 mt-1">Sign in</h4>
                            <p>

                                <Link to='#' className="btn btn-block btn-outline-primary"> <i className="fa fa-facebook-f"></i> Login via facebook</Link>
                                <Link to='#' className="btn btn-block btn-outline-primary"> <i className="fa fa-google"></i> Login via Google</Link>
                            </p>
                            <hr />

                            {/* if (TempData["SpecialMessage"] != null)
                    {
                        <div className="text-info">@TempData["SpecialMessage"].ToString()</div>
                    } */}

                            <div className="text-danger" asp-validation-summary="All"></div>
                            <form asp-action="Login" method="post">

                                <input type="hidden" name="returnUrl" value="@ViewBag.returnUrl" />
                                <div className="form-group">
                                    <input asp-for="Email" className="form-control" placeholder="Email or login" type="email" />
                                </div>
                                <div className="form-group">
                                    <input asp-for="Password" className="form-control" placeholder="******" type="password" />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block"> Login </button>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <Link to='#' asp-action="ForgotPassword" className="small">Forgot password?</Link>
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