import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import "./postDetails.css";
import postStore from "../../app/stores/postStore";


export const PostDetails: React.FC = observer(() => {
    const { postStore } = useStore();
    let { id } = useParams<{ id?: string }>();
    postStore.selectPost(id);
    const [postDate, setPostDate] = useState<string>('OK');
    console.log(postStore.selectedPost.Id)
    setPostDate(postStore.selectedPost.CreatedDate.toString());

    return (
        <>
            <div className="container-fluid" id="article-container">
                <div className="row">
                    <div className="col-lg-12">

                        <h1 className="mt-4">{postStore.selectedPost.Title}</h1>


                        <p className="lead">
                        </p>

                        <hr />


                        {<input type="date" value={postDate} />}

                        <hr />
                        <div>
                            <p className="lead">{postStore.selectedPost.Summary}</p>

                            <div className="text-justify">
                                {postStore.selectedPost.Description}
                            </div>
                            <blockquote className="blockquote">
                                <p className="mb-0"></p>
                                <footer className="blockquote-footer">
                                    <cite title="Source Title"></cite>
                                </footer>
                            </blockquote>

                            <hr />
                        </div>




                    </div>
                </div>
            </div>
        </>
    )
})