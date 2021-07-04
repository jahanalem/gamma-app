import { history } from "../..";
import { makeAutoObservable, runInAction } from "mobx";
import agent from '../api/agent';
import { IUserModel, UserModel } from '../models/userModel';
import { ISignUpUserViewModel } from "../viewModels/signUpUserViewModel";
import { store } from "./store";
import { ILoginUserViewModel } from "../viewModels/loginUserViewModel";


export default class UserStore {
    user: UserModel | null = null;
    userInventory = new Map<string, IUserModel>();
    selectedUser: IUserModel | undefined = undefined;
    loading = false;
    loadingInitial = true;
    refreshTokenTimeout: any;

    selectedUserId: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    get UsersSortedByEmail() {
        let result = Array.from(this.userInventory.values()).sort((a, b) => a.Email.localeCompare(b.Email));

        return result;
    }

    loadUsers = async () => {
        this.loadingInitial = true;
        this.userInventory.clear();
        try {
            const Users = await agent.Account.list();
            runInAction(() => {
                Users.forEach(User => {
                    this.userInventory.set(User.Id, User);
                })
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectUser = (id: string) => {
        this.selectedUser = this.userInventory.get(id);
    }

    cancelSelectedUser = () => {
        this.selectedUser = undefined;
    }

    createUser = async (signupViewModel: ISignUpUserViewModel) => {
        this.loading = true;
        //signupViewModel.Id = uuidv4();
        try {
            const newUser = await agent.Account.signup(signupViewModel);
            runInAction(() => {
                this.userInventory.set(newUser.Id, newUser);
                this.selectedUser = newUser;
                //this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    login = async (creds: ILoginUserViewModel) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.Token);
            //this.startRefreshTokenTimer(user);
            runInAction(() => this.user = user);
            history.push('/home');
            //store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getCurrentUser = async () => {
        try {
            const user = await agent.Account.current();
            console.log(user);
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    updateUser = async (user: IUserModel) => {
        /*
        this.loading = true;
        try {
            await agent.Account.update(user);
            runInAction(() => {
                this.userInventory.set(user.Id, user);
                this.selectedUser = user;
                //this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
        */
    }

    deleteUser = async (id: string) => {
        this.loading = true;
        try {
            await agent.Account.delete(id);
            runInAction(() => {
                this.userInventory.delete(id);
                if (this.selectedUser?.Id === id) this.cancelSelectedUser();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
            const user = await agent.Account.refreshToken();
            runInAction(() => this.user = user);
            store.commonStore.setToken(user.Token);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer(user: UserModel) {
        const jwtToken = JSON.parse(atob(user.Token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

}