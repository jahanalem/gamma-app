import React from "react";
import { Link } from 'react-router-dom';
import { Card, Nav } from "react-bootstrap";
import "./post.css";
import { IPostModel } from "../../app/models/postModel"

interface IProps {
    article: IPostModel;
    key: number;
}

const Post: React.FC<IProps> = (props) => {

    return (
        <div className="post">
            <Card className="mb-2">
                <Card.Header><h3>{props.article.Title}</h3></Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {props.article.Summary}
                        </p>
                        <footer className="blockquote-footer">
                            <Nav>
                                <Nav.Link as={Link} to={`/post/${props.article.Id}`}>
                                    read more
                                </Nav.Link>
                            </Nav>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>

            {/* <h2 className="post-title">{props.article.fields.title}</h2>
            <h5 className="post-summary">{props.article.fields.summary}</h5>
            <div className="post-description" dangerouslySetInnerHTML={{ __html: marked(postDescription) }} />
            <Attachments attachmentFiles={props.article.fields.attachments} /> */}
        </div>
    )

}

export default Post;