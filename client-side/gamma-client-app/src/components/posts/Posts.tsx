import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import Post from "../post/Post";
import { Alert } from "react-bootstrap";
import './posts.css';
import { IPostModel } from "../../app/models/postModel";
import { useStore } from '../../app/stores/store';

export const Posts: React.FC = observer(() => {

    const { postStore } = useStore();
    const { postsByDate } = postStore;

    //let searchTermQueryString = new URLSearchParams(useLocation().search).get('search');

    return (
        <>
            <div className="posts">
                {postsByDate.map((post, index) => <Post key={index} article={post} />)}
            </div>
        </>
    );
})