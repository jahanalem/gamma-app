import { observer } from 'mobx-react-lite';
import React, { useEffect } from "react";
import { Post } from "../post/Post";
import { useStore } from '../../app/stores/store';
import './posts.css';
import { useLocation, useParams } from 'react-router-dom';
import { LoadingComponent } from '../../layout/LoadingComponent';

interface stateType {
    tagId: string;
    catId: string;
}

export const Posts: React.FC = observer((props) => {

    const { postStore } = useStore();
    const { postsByDate } = postStore;

    //const location = useLocation<stateType>();
    //const { tagId } = location.state || { tagId: null };
    //const { catId } = location.state || { catId: null };

    const { tagId } = useParams<stateType>();
    const { catId } = useParams<stateType>();

    useEffect(() => {
        if (tagId) {
            console.log("postStore.loadingInitial", postStore.loadingInitial);
            postStore.postsByTagId(tagId);
            //history.push('/');
        }
        else if (catId) {
            console.log("pcat items", catId);
            postStore.postsByCategoryId(catId);
        }
        else {
            postStore.loadPosts();
        }
    }, [tagId, postStore, catId]);


   if (postStore.loadingInitial || !postStore.postsByDate) return <LoadingComponent content="Loading posts..." />


    return (
        <>
            <div className="content col-xs-12 col-lg-9">
                <div id="articleListComponent" className="w-100 row">
                {((postsByDate && postsByDate.length > 0) && !postStore.loadingInitial)
                        ?
                        <>
                            {postsByDate?.map((post, index) => <Post key={index} article={post} />)}
                        </>
                        :
                        <>
                            <div className="w-100 d-flex justify-content-center align-items-center mt-5 alert alert-dark" role="alert">
                                Not Found!
                            </div>
                        </>
                    }

                </div>
            </div>
        </>
    );
})

