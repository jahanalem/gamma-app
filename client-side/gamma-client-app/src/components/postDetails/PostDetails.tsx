import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../layout/LoadingComponent";
import { Card } from "react-bootstrap";
import "./postDetails.css";
import { IPostModel } from "../../app/models/postModel";


export const PostDetails: React.FC = () => {
    let { id } = useParams<{ id?: string }>();

    const [article, setArticle] = useState<IPostModel[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        async function fetchData() {
            // client.getEntries({
            //     content_type: 'blog',
            //     //'sys.id[in]': id,
            // })
            //     .then((response: { items: React.SetStateAction<IPostModel[]>; }) => setArticle(response.items))
            //     .catch(console.error);
            await sleep(500);
            setLoading(false);
        }

        fetchData();

    }, [id]);

    const sleep = (delay: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, delay)
        })
    }

    if (loading) return <LoadingComponent content="loading..." />

    console.log(id);
    console.log(article);
    return (
        <>
            <div className="post-details">
                <Card className="mb-2">
                    <Card.Header><h3>{article[0].Title}</h3></Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <div>
                                <p>
                                    {article[0].Summary}
                                </p>
                            </div>
                            <div>
                                {article[0].Description}
                            </div>
                            <footer className="blockquote-footer">

                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}