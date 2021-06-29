import { createContext, useContext } from "react";
import AboutusStore from "./aboutusStore";
import CategoryStore from "./categoryStore";
import CommentStore from "./commentStore";
import ContactusStore from "./contactusStore";
import PostStore from "./postStore";
import TagStore from "./tagStore";
import UserStore from "./userStore";

interface IStore {
    postStore: PostStore;
    aboutusStore: AboutusStore;
    commentStore: CommentStore;
    contactusStore: ContactusStore;
    userStore: UserStore;
    tagStore: TagStore;
    categoryStore: CategoryStore;
}

export const store: IStore = {
    postStore: new PostStore(),
    aboutusStore: new AboutusStore(),
    commentStore: new CommentStore(),
    contactusStore: new ContactusStore(),
    userStore: new UserStore(),
    tagStore: new TagStore(),
    categoryStore: new CategoryStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}

