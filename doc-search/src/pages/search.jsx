import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import NavBar from "../components/navbar";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            // Navigate to results page
            navigate("/result", {state: {query: searchTerm}});
        } catch (error) {
            console.error("Error during search:", error);
        }
    }

    return (
        <div style={{ position: 'absolute', top: '0px', left: '0px', right: '0px' }}>
            <NavBar />
            <div className="if"><Link className="ifr" to="/search"><h1>Information Retrieval</h1></Link></div>
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