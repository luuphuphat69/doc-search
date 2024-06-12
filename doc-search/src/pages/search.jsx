import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import NavBar from "../components/navbar";
import axios from 'axios';
import Search_Options from "../components/search-options";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.get(`http://localhost:8080/v1/search?queries=${searchTerm}`);
            console.log(response.data);
            // navigate('/search', {  state: {
            //     searchResults: response.data,
            // }, });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ position: 'absolute', top: '0px', left: '0px', right: '0px' }}>
            <NavBar />
            <form onSubmit={handleSearch} className="input-group mb-3">
                <input
                    autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Input value"
                    name="req"
                    aria-label="input text"
                    aria-describedby="button-addon2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" id="button-addon2" type="submit">
                        &#128269;
                    </button>
                </div>
                <div className="invalid-feedback">Input value</div>
            </form>
            <div>
                <Search_Options />
            </div>
        </div>
    );
}

export default Search;
