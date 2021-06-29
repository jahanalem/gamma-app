import { makeAutoObservable, runInAction } from "mobx";
import agent from '../api/agent';
import { ICategoryModel } from '../models/categoryModel';


export default class CategoryStore {
    categoryInventory = new Map<string, ICategoryModel>();
    selectedCategory: ICategoryModel | undefined = undefined;
    loading = false;
    loadingInitial = true;

    selectedCategoryId: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedCategoryId = (categoryId: string) => {
        this.selectedCategoryId = categoryId;
    }

    get categorysSortedByTitle() {
        let result = Array.from(this.categoryInventory.values()).sort((a, b) => a.Title.localeCompare(b.Title));

        return result;
    }

    loadCategories = async () => {
        this.loadingInitial = true;
        this.categoryInventory.clear();
        try {
            const categories = await agent.Category.list();
            runInAction(() => {
                console.log("Categories ARE:", categories);
                categories.forEach(category => {
                    this.categoryInventory.set(category.Id, category);
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

    selectCategory = (id: string) => {
        this.selectedCategory = this.categoryInventory.get(id);
    }

    cancelSelectedCategory = () => {
        this.selectedCategory = undefined;
    }

    createCategory = async (category: ICategoryModel) => {
        this.loading = true;
        //Category.id = uuid();
        try {
            await agent.Category.create(category);
            runInAction(() => {
                this.categoryInventory.set(category.Id, category);
                this.selectedCategory = category;
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

    updateCategory = async (category: ICategoryModel) => {
        this.loading = true;
        try {
            await agent.Category.update(category);
            runInAction(() => {
                this.categoryInventory.set(category.Id, category);
                this.selectedCategory = category;
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

    deleteCategory = async (id: string) => {
        this.loading = true;
        try {
            await agent.Category.delete(id);
            runInAction(() => {
                this.categoryInventory.delete(id);
                if (this.selectedCategory?.Id === id) this.cancelSelectedCategory();
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