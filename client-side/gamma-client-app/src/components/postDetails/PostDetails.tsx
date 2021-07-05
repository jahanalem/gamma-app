import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import "./postDetails.css";
import { toJS } from "mobx";
import { LoadingComponent } from "../../layout/LoadingComponent";

export default observer(function PostDetails() {
    const { postStore } = useStore();
    let { id } = useParams<{ id?: string }>();

    useEffect(() => {
        console.log("0002 - in useEffect");
        try {
            postStore.details(id);
        }
        catch (error) { }

    }, [id, postStore]);


    if (!postStore.postDetails) {
        return <LoadingComponent content='Loading post...' />
    }

    return (
        <>
            <div className="container-fluid" id="article-container">
                <div className="row">
                    <div className="col-lg-12">

                        <h1 className="mt-4">{postStore.postDetails.Title}</h1>

                        <p className="lead">
                        </p>

                        <hr />

                        <span>{postStore.postDetails.CreatedDate.toString()}</span>

                        <hr />
                        <div>
                            <p className="lead">{postStore.postDetails.Summary}</p>

                            <div className="text-justify">
                                {postStore.postDetails.Description}
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