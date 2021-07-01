import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { CategoryRecursiveComponent } from "./CategoryRecursiveComponent";



export const Category: React.FC = observer(() => {
    const { categoryStore } = useStore();

    useEffect(() => {
        categoryStore.loadCategories();
    }, [categoryStore])

    return (
        <>
            <CategoryRecursiveComponent key="cat_recur_" categoryies={categoryStore.categorysSortedByTitle} parentId={null} />
        </>
    )
})
