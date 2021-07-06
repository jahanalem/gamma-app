import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useStore } from "../../app/stores/store";
import { LoadingComponent } from "../../layout/LoadingComponent";
import { Posts } from "../posts/Posts";
import { Tags } from "../tag/tags";

interface stateType {
    tagId: string;
    catId:string;
}

export const HomePage: React.FC = observer((props) => {
    const { tagStore, postStore } = useStore();

    const location = useLocation<stateType>();
    const { tagId } = location.state || { tagId: null };
    const {catId} = location.state || {catId:null};
    useEffect(() => {
        if (tagId) {
            postStore.postsByTagId(tagId);
        }
        else if(catId){
            postStore.postsByCategoryId(catId);
        }
        else {
            postStore.loadPosts();
        }

        tagStore.loadTags();

    }, [tagId, postStore, tagStore,catId]);

    if (postStore.loadingInitial) return <LoadingComponent content="Loading posts" />
    if (tagStore.loadingInitial) return <LoadingComponent content="Loading tags" />

    return (
        <>
            <div className="row">
                <Posts />
                <Tags />
            </div>
        </>
    )
})