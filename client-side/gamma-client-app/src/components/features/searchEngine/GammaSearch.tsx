import React, { FormEventHandler, KeyboardEventHandler, SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { toJS } from "mobx";
import { LoadingComponent } from "../../../layout/LoadingComponent";

export default observer(function GammaSearch() {
    const { postStore } = useStore();
    //let { id } = useParams<{ id?: string }>();

    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");

    //const history = useHistory();

    useEffect(() => {
        console.log("query", query);
        postStore.searchInPosts(query);

    }, [postStore, query]);

    const searchActionHandler = () => {
        setQuery(input);
        setInput("");
    }

    const enterKeyHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "13") {
            event.preventDefault();
            event.stopPropagation();
            console.log(event.key);
            searchActionHandler();
        }
    }

    const submitHandler = (event:SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchActionHandler();
    }

    if (postStore.loadingInitial) {
        return <LoadingComponent content='Loading post...' />
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