import React from "react";
import NavBar from "../components/navbar";
import Search_Options from "../components/search-options";
const Search = () => {
    return (
        <div style={{position: 'absolute', top:'0px', left:'0px', right:'0px'}}>
            <NavBar />
            <div class="input-group mb-3" >
                <input autofocus type="text" class="form-control" placeholder="Input value" name="req" aria-label="input text" aria-describedby="button-addon2" value="" required />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" id="button-addon2" type="submit">&nbsp;&nbsp;&nbsp;&nbsp;&#128269;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                </div>
                <div class="invalid-feedback">Input value</div>
            </div>
            <div>
                <Search_Options/>
            </div>
        </div>
    );
}
export default Search;