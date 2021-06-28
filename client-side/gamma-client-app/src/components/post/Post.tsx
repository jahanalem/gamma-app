import React from "react";
import { Link } from 'react-router-dom';
import { Card, Nav } from "react-bootstrap";
import "./post.css";
import { IPostModel } from "../../app/models/postModel"

interface IProps {
    article: IPostModel;
    selectedTagId: string;
}

const Post: React.FC<IProps> = (props) => {

    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-6">
            <article >
                <div className="">
                    <Link to="#" className="">
                        <img src="/images/art-logo.svg" className="image-responsive" alt="" />
                        <span className="et_overlay et_pb_inline_icon"></span>
                    </Link>
                </div>

                <h2 className="entry-title">
                    <Link to="#" >{props.article.Title}</Link>
                </h2>

                <p className="post-meta">
                    <span className="published">{props.article.CreatedDate}</span>
                </p>
                <div className="post-content">
                    <div className="article-summary">
                        <p>
                            !{props.article.Summary}
                        </p>
                    </div>
                    <div className="tags-in-articles float-right">
                        {props.article.Tags.map((tag, index) => {
                            return (
                                <span key={"tag_" + index.toString()}>
                                    {(tag !== null) ?
                                        <>
                                            <Link to="#">
                                                {(props.selectedTagId === tag.Id) ?
                                                    <>
                                                        <span className="badge badge-success">{tag.Title}</span>
                                                    </>
                                                    :
                                                    <>
                                                        <span className="badge badge-dark">{tag.Title}</span>
                                                    </>
                                                }
                                            </Link>
                                        </> : <></>
                                    }
                                </span>
                            )
                        })}
                    </div>
                </div>
                <Link to={`/post/${props.article.Id}`} className="more-link">read more</Link>
            </article>
        </div>
    )
}

export default Post;