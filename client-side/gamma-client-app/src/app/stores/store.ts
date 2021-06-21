import { createContext, useContext } from "react";
import PostStore from "./postStore";

interface IStore {
    postStore: PostStore,
}

export const store: IStore = {
    postStore: new PostStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}

