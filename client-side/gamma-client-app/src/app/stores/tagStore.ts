import { makeAutoObservable, runInAction } from "mobx";
import agent from '../api/agent';
import { ITagModel } from '../models/tagModel';


export default class TagStore {
    tagInventory = new Map<string, ITagModel>();
    selectedTag: ITagModel | undefined = undefined;
    loading = false;
    loadingInitial = true;

    selectedTagId: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedTagId = (tagId: string) => {
        this.selectedTagId = tagId;
    }

    get tagsSortedByTitle() {
        let result = Array.from(this.tagInventory.values()).sort((a, b) => a.Title.localeCompare(b.Title));

        return result;
    }

    loadTags = async () => {
        this.setLoadingInitial(true);
        if (this.tagInventory.size > 0) {
            this.setLoadingInitial(false);

            return;
        }

        //this.tagInventory.clear();
        try {
            const tags = await agent.Tag.list();
            runInAction(() => {
                tags.forEach(tag => {
                    this.tagInventory.set(tag.Id, tag);
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

    selectTag = (id: string) => {
        this.selectedTag = this.tagInventory.get(id);
    }

    cancelSelectedTag = () => {
        this.selectedTag = undefined;
    }

    createTag = async (tag: ITagModel) => {
        this.loading = true;
        //tag.id = uuid();
        try {
            await agent.Tag.create(tag);
            runInAction(() => {
                this.tagInventory.set(tag.Id, tag);
                this.selectedTag = tag;
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

    updateTag = async (tag: ITagModel) => {
        this.loading = true;
        try {
            await agent.Tag.update(tag);
            runInAction(() => {
                this.tagInventory.set(tag.Id, tag);
                this.selectedTag = tag;
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

    deleteTag = async (id: string) => {
        this.loading = true;
        try {
            await agent.Tag.delete(id);
            runInAction(() => {
                this.tagInventory.delete(id);
                if (this.selectedTag?.Id === id) this.cancelSelectedTag();
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