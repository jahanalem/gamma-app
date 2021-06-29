import { observer } from 'mobx-react-lite';
import React, { useEffect } from "react";
import { useStore } from '../../app/stores/store';
import { useParams } from 'react-router-dom';
import { LoadingComponent } from '../../layout/LoadingComponent';


export const PostsByTagId: React.FC = observer(() => {

    const { postStore, tagStore } = useStore();
    const { postsByTagId } = postStore;
    const {loadTags} = tagStore;
    let { tagId } = useParams<{ tagId?: string }>();

    useEffect(() => {
        postsByTagId(tagId);
    }, [tagId, postsByTagId]);

    if (postStore.loadingInitial) return <LoadingComponent content="Loading posts by tag name" />

    return (
        <>

        </>

    );
})