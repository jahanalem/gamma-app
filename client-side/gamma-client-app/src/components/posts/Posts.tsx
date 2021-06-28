import { observer } from 'mobx-react-lite';
import React from "react";
import Post from "../post/Post";
import './posts.css';
import { useStore } from '../../app/stores/store';


export const Posts: React.FC = observer(() => {

    const { postStore } = useStore();
    const { postsByDate } = postStore;
 

    console.log("postsByDate[0]", postsByDate[0].Tags);

    return (
        <>
            <div className="content col-xs-12 col-lg-9">
                <div id="articleListComponent" className="row">
                    {postsByDate.map((post, index) => <Post key={index} article={post} selectedTagId={"b4f6e1b0-0a20-4467-909e-ece9927846f2"} />)}
                </div>
            </div>
        </>

    );
})