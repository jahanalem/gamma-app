import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../app/stores/store";



export const Category: React.FC = observer(() => {
    const { categoryStore } = useStore();
    const { loadCategories } = categoryStore;
    
    useEffect(() => {
        let x = loadCategories();
        console.log("categories: ", x);

    }, [loadCategories])
    return (
        <>
        </>
    )
})