import React, { SyntheticEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { LoadingComponent } from "../../../layout/LoadingComponent";

export default observer(function GammaSearch() {
    const { postStore } = useStore();
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");
    postStore.setLoadingInitial(false);
    useEffect(() => {
        postStore.searchInPosts(query);

    }, [postStore, query]);

    const searchActionHandler = () => {
        setQuery(input);
        setInput("");
    }

    const enterKeyHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "13") {
            event.preventDefault();
            searchActionHandler();
        }
    }

    const submitHandler = (event:SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchActionHandler();
    }

    if (postStore.loadingInitial) {
        return <LoadingComponent content='Loading posts XXX...' />
    }

    return (
        <>
            <form  onSubmit={submitHandler} id="searchForm" className="form-inline" role="search">
                <div className="input-group">
                    <input
                        onKeyDown={enterKeyHandler}
                        onChange={(e) => setInput(e.target.value)}
                        id="searchBox"
                        type="search"
                        className="form-control"
                        autoComplete="off"
                        placeholder="Search"
                        name="search"
                    />
                    <div id="search-result-body">
                        <div id="number-of-search-results"></div>
                        <div id="search-results">
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
})