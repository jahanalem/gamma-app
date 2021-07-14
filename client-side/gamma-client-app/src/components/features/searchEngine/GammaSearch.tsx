import React, { SyntheticEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";

export default observer(function GammaSearch() {
    const { postStore } = useStore();
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");
    useEffect(() => {
        if (query.trim().length > 1)
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

    const submitHandler = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchActionHandler();
    }

    return (
        <>
            <form onSubmit={submitHandler} id="searchForm" className="form-inline" role="search">
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