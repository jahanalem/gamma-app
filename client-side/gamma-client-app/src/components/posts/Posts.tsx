import { observer } from 'mobx-react-lite';
import React from "react";
import { Post } from "../post/Post";
import { useStore } from '../../app/stores/store';
import './posts.css';

export const Posts: React.FC = observer(() => {

    const { postStore, tagStore } = useStore();
    const { postsByDate } = postStore;

    return (
        <>
            <div className="content col-xs-12 col-lg-9">
                <div id="articleListComponent" className="w-100 row">
                    {((postsByDate && postsByDate.length > 0) || postStore.loadingInitial || tagStore.loadingInitial)
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