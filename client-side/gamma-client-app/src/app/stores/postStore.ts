import { IPostModel } from './../models/postModel';
import { makeAutoObservable, runInAction } from "mobx";
import agent from '../api/agent';


export default class PostStore {
    postInventory = new Map<number, IPostModel>();
    selectedPost: IPostModel | undefined = undefined;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get postsByDate() {
        return Array.from(this.postInventory.values()).sort((a, b) =>
            (a.CreatedDate.valueOf()) - (b.CreatedDate.valueOf()));
    }

    loadPosts = async () => {
        try {
            const posts = await agent.Post.list();
            posts.forEach(post => {
                //post.date = post.date.split('T')[0];
                this.postInventory.set(post.Id, post);
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

    selectPost = (id: number) => {
        this.selectedPost = this.postInventory.get(id);
    }

    cancelSelectedPost = () => {
        this.selectedPost = undefined;
    }

    createPost = async (post: IPostModel) => {
        this.loading = true;
        //activity.id = uuid();
        try {
            await agent.Post.create(post);
            runInAction(() => {
                this.postInventory.set(post.Id, post);
                this.selectedPost = post;
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

    updatePost = async (post: IPostModel) => {
        this.loading = true;
        try {
            await agent.Post.update(post);
            runInAction(() => {
                this.postInventory.set(post.Id, post);
                this.selectedPost = post;
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

    deletePost = async (id: number) => {
        this.loading = true;
        try {
            await agent.Post.delete(id);
            runInAction(() => {
                this.postInventory.delete(id);
                if (this.selectedPost?.Id === id) this.cancelSelectedPost();
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