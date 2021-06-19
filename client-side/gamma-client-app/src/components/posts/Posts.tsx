import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { client } from "../../client";
import Post from "../post/Post";
import LoadingComponent from "../../layout/LoadingComponent";
import { Pagination, PaginationProps } from 'semantic-ui-react';
import { Alert } from "react-bootstrap";
import './posts.css';
import { IPostModel } from "../../app/models/postModel";

export const Posts: React.FC = () => {

    const [articles, setArticles] = useState<IPostModel[]>([]);
    const [loading, setLoading] = useState(true);

    const [activePage, setActivePage] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const itemsPerPage = 10;

    let totalItems = useRef(0);

    let searchTermQueryString = new URLSearchParams(useLocation().search).get('search');

    useEffect(() => {

        setArticles([]);

        async function fetchData() {

            searchTermQueryString = (searchTermQueryString != null) ? searchTermQueryString : '';

            await client.getEntries({ content_type: 'blog', 'query': `${searchTermQueryString}` })
                .then((response: { items: string | any[]; }) => {
                    totalItems.current = response.items.length;
                });

            await client.getEntries({
                content_type: 'blog',
                order: '-sys.createdAt',
                'query': `${searchTermQueryString}`,
                limit: itemsPerPage,
                skip: (pageNumber - 1) * itemsPerPage
            })
                .then((response: { items: any; }) => {
                    setArticles(prev => [...response.items]);
                    console.log(`TotalItems = ${totalItems.current}`);
                })
                .catch(console.error);

            await sleep(500);
            setLoading(false);
        }

        fetchData();

    }, [pageNumber, searchTermQueryString]);

    const sleep = (delay: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, delay)
        });
    };

    if (loading) return <LoadingComponent content="loading..." />;

    const onChange = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, pageInfo: PaginationProps) => {
        setActivePage(pageInfo.activePage as number);
        setPageNumber(pageInfo.activePage as number);
    };

    return (
        <>
            {totalItems.current > 0 ?
                <>
                    <div className="posts">
                        {articles.map((art, index) => <Post key={index} article={art} />)}
                    </div>
                    {totalItems.current > itemsPerPage ?
                        <>
                            <div className="">
                                <Pagination
                                    activePage={activePage}
                                    onPageChange={onChange}
                                    totalPages={Math.ceil(totalItems.current / itemsPerPage)}
                                    ellipsisItem={null}
                                />
                            </div>
                        </>
                        :
                        null
                    }

                </>
                :
                <>
                    <Alert className="posts-results-empty" variant="info">
                        <h2>No Result!</h2>
                    </Alert>
                </>
            }
        </>
    );
}