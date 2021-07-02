import { makeAutoObservable, runInAction } from "mobx";
import agent from '../api/agent';
import { IUserModel } from '../models/userModel';
import { ISignUpUserViewModel } from "../viewModels/signUpUserViewModel";
import { v4 as uuidv4 } from 'uuid';


export default class UserStore {
    userInventory = new Map<string, IUserModel>();
    selectedUser: IUserModel | undefined = undefined;
    loading = false;
    loadingInitial = true;

    selectedUserId: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedUserId = (userId: string) => {
        this.selectedUserId = userId;
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
                //console.log("UserS ARE:", Users);
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
            console.log("newUser",newUser);
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
}