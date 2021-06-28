import "./postDetails.css";
import React from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";


export const PostDetails: React.FC = observer(() => {

    const { postStore } = useStore();
    let { id } = useParams<{ id?: string }>();
    postStore.selectPost(id);

    return (
        <>
            <div className="post-details">
                <Card className="mb-2">
                    <Card.Header><h3>{postStore.selectedPost.Title}</h3></Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <div>
                                <p>
                                    {postStore.selectedPost.Summary}
                                </p>
                            </div>
                            <div>
                                {postStore.selectedPost.Description}
                            </div>
                            <footer className="blockquote-footer">

                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
})