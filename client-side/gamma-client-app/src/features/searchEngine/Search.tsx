import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";
import "./search.css";

export const Search: React.FC = () => {

    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");

    const history = useHistory()

    useEffect(() => {

        const params = new URLSearchParams();
        (query) ? params.append("search", query) : params.delete("search");

        history.push({ search: params.toString() });

    }, [input, history, query]);

    const searchActionHandler = () => {
        setQuery(input);
        setInput("");
    }

    const enterKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "13") {
            searchActionHandler();
        }
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        searchActionHandler();
    }

    return (
        <>
            <Form inline onSubmit={submitHandler} className="ml-5">
                <FormControl
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={enterKeyHandler}
                    placeholder="Search"
                    className="mr-sm-2" />
                <Button variant="outline-success" type='submit'>Search</Button>
            </Form>
        </>
    )
}