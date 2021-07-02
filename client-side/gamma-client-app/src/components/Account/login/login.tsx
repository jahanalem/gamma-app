import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { LoginUserViewModel } from '../../../app/viewModels/loginUserViewModel';
import { useStore } from '../../../app/stores/store';

export const Login: React.FC = observer(() => {
    const { userStore } = useStore();
    let history = useHistory();

    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
        errors: {},
    });

    const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
        let keyName = e.currentTarget.name;
        let value = e.currentTarget.value;
        setLoginUser((previous) => {
            return {
                ...previous,
                [keyName]: value,
            };
        });
    };

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loggingUser = new LoginUserViewModel(
            loginUser.email,
            loginUser.password
        )
        await userStore.login(loggingUser).then(result => {
            console.log("User logged in!")
            history.push(`/`);
        }).catch(error => {
            console.error(error);
        });
    };


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
                            <form onSubmit={onSubmit} method="post">

                                <input type="hidden" name="returnUrl" value="@ViewBag.returnUrl" />
                                <div className="form-group">
                                    <input type="email"
                                        name="email"
                                        value={loginUser.email}
                                        onChange={onChange}
                                        placeholder="Email"
                                        className="form-control"
                                        required />
                                </div>
                                
                                <div className="form-group">
                                    <input type="password"
                                        name="password"
                                        value={loginUser.password}
                                        onChange={onChange}
                                        placeholder="******"
                                        className="form-control"
                                        required />
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