import React, { SyntheticEvent } from "react";
import { Link, useHistory } from 'react-router-dom';
import { IPostModel } from "../../app/models/postModel"
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import "./post.css";

interface IProps {
    article: IPostModel;
}

export const Post: React.FC<IProps> = observer((props) => {
    const { tagStore } = useStore();
    const history = useHistory();

    const tagHandler = (e: SyntheticEvent<HTMLAnchorElement>, tagId: string) => {
        e.preventDefault();
        tagStore.setSelectedTagId(tagId);
        history.push(`/posts/tag/${tagId}`);
    }

    return (
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-6">
            <article >
                <div>
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
                        {props.article?.Tags?.map((tag, index) => {
                            return (
                                <span key={"tag_" + index.toString()}>
                                    {(tag !== null) ?
                                        <>
                                            <div className="tags-inline">
                                                {(tagStore.selectedTagId === tag.Id) ?
                                                    <>
                                                        <span className="badge badge-success">{tag.Title}</span>
                                                    </>
                                                    :
                                                    <>
                                                        <Link id={tag.Id} to={`/posts/tag/${tag.Id}`} onClick={(e) => tagHandler(e, tag.Id)}>
                                                            <span className="badge badge-dark">{tag.Title}</span>
                                                        </Link>
                                                    </>
                                                }
                                            </div>
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
})