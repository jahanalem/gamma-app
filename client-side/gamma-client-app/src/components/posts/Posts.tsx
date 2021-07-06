import { observer } from 'mobx-react-lite';
import React from "react";
import { Post } from "../post/Post";
import './posts.css';
import { useStore } from '../../app/stores/store';

export const Posts: React.FC = observer(() => {

    const { postStore } = useStore();
    const { postsByDate } = postStore;

    return (
        <>
            <div className="content col-xs-12 col-lg-9">
                <div id="articleListComponent" className="row">
                    {(postsByDate)
                        ?
                        <>
                            {postsByDate?.map((post, index) => <Post key={index} article={post} />)}
                        </>
                        :
                        <>
                            <div>NOT FOUND</div>
                        </>
                    }
                </div>
            </div>
        </>
    );
})