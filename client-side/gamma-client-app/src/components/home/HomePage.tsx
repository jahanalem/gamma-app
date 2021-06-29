import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { LoadingComponent } from "../../layout/LoadingComponent";
import { Posts } from "../posts/Posts";
import { Tags } from "../tag/tags";

export const HomePage: React.FC = observer(() => {
    const { tagStore, postStore } = useStore();
    let { tagId } = useParams<{ tagId?: string }>();
    // const { tagsSortedByTitle } = tagStore;
    // const { loadPosts } = postStore;
    // const loadData = useCallback(() => {
    //     if (tagId) {
    //         postStore.postsByTagId(tagId);
    //     }
    //     else {
    //         postStore.loadPosts();
    //     }
    //     tagStore.loadTags();
    // }, [tagId, postStore, tagStore]);

    useEffect(() => {
        // postStore.loadPosts();
        // tagStore.loadTags();
        //loadData();
        if (tagId) {
            postStore.postsByTagId(tagId);
        }
        else {
            postStore.loadPosts();
        }
        tagStore.loadTags();
    }, [tagId, postStore, tagStore]);

    if (tagStore.loadingInitial) return <LoadingComponent content="Loading tags" />
    if (postStore.loadingInitial) return <LoadingComponent content="Loading posts" />
    console.log("HomePage");

    return (
        <>
            <div className="row">
                <Posts />
                <Tags />
            </div>
        </>
    )
})