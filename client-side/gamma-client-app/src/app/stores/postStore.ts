import { IPostModel } from './../models/postModel';
import { makeAutoObservable, runInAction } from "mobx";
import agent from '../api/agent';


export default class PostStore {
    postInventory = new Map<string, IPostModel>();
    selectedPost: IPostModel | undefined = undefined;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get postsByDate() {
        let result = Array.from(this.postInventory.values()).sort((a, b) => (a.CreatedDate.valueOf()) - (b.CreatedDate.valueOf()));

        return result;
    }

    postsByTagId = async (tagId: string) => {
        this.loadingInitial = true;
        this.postInventory.clear();
        try {
            const posts = await agent.Post.listByTagId(tagId);
            runInAction(() => {
                posts.forEach(post => {
                    this.postInventory.set(post.Id, post);
                })
            })

            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPosts = async () => {
        this.loadingInitial = true;
        try {

            const posts = await agent.Post.list();

            runInAction(() => {
                console.log("POSTS ARE:", posts[0].Tags);
                posts.forEach(post => {
                    this.postInventory.set(post.Id, post);
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

    selectPost = (id: string) => {
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

    deletePost = async (id: string) => {
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