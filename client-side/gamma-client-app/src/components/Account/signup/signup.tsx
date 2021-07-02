import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { couldStartTrivia } from "typescript";
import { useStore } from "../../../app/stores/store";
import { SignUpUserViewModel } from "../../../app/viewModels/signUpUserViewModel";

export const Signup: React.FC = observer(() => {

    const { userStore } = useStore();

    let history = useHistory();

    const [newRegister, setNewRegister] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: {},
    });

    const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
        let keyName = e.currentTarget.name;
        let value = e.currentTarget.value;
        setNewRegister((previous) => {
            return {
                ...previous,
                [keyName]: value,
            };
        });
    };

    const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newUser = new SignUpUserViewModel(
            newRegister.firstName,
            newRegister.lastName,
            newRegister.userName,
            newRegister.email,
            newRegister.password,
            newRegister.confirmPassword);

       
            userStore.createUser(newUser).then(result => {
                console.log("User c!")
                history.push(`/login`);
            }).catch(error => {
                console.error(error);
            });
     

        // (async () =>
        //     await userStore.createUser(newUser).then(result => {
        //         console.log("User created successfully!")
        //         history.push(`/login`);
        //     }).catch(error => {
        //         console.error(error);
        //     })
        // )();
    };

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
                            <form onSubmit={onSubmit} id="signupForm">

                                <input type="hidden" name="returnUrl" value="@ViewBag.returnUrl" />
                                <div className="form-group">
                                    <input type="text"
                                        name="firstName"
                                        value={newRegister.firstName}
                                        onChange={onChange}
                                        placeholder="first name"
                                        className="form-control"
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        name="lastName"
                                        value={newRegister.lastName}
                                        onChange={onChange}
                                        placeholder="last name"
                                        className="form-control"
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        name="userName"
                                        value={newRegister.userName}
                                        onChange={onChange}
                                        placeholder="user name"
                                        className="form-control"
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                        name="email"
                                        value={newRegister.email}
                                        onChange={onChange}
                                        className="form-control"
                                        placeholder="Email"
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        name="password"
                                        value={newRegister.password}
                                        onChange={onChange}
                                        className="form-control"
                                        placeholder="password"
                                        minLength={4} maxLength={8}
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        name="confirmPassword"
                                        value={newRegister.confirmPassword}
                                        onChange={onChange}
                                        className="form-control"
                                        placeholder="confirm password"
                                        data-rule-equalto="#Password"
                                        minLength={4} maxLength={8}
                                        required />
                                    <input type="checkbox"
                                        onClick={togglePasswordVisibility} />Show Password
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