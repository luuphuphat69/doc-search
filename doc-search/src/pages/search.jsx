import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/navbar";
import axios from 'axios';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:2000/v1/search?queries=${searchTerm}`);
            navigate("/result", {state:{searchResults: response.data}});
        } catch (error) {
            console.error("Error during search:", error);
        }
    }
    

    return (
        <div style={{ position: 'absolute', top: '0px', left: '0px', right: '0px' }}>
            <NavBar />
            <div className="if"><h1 className="ifr">Information Retrieval</h1></div>
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
        </div>
    );
}

export default Search;