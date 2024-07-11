const Search_Options = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <strong className="d-block">Search in fields:</strong>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="colt" name="columns[]" value="t" defaultChecked />
                    <label className="form-check-label" htmlFor="colt">Nhân sự</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="cola" name="columns[]" value="a" defaultChecked />
                    <label className="form-check-label" htmlFor="cola">Cơ sở vật chất</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="cols" name="columns[]" value="s" defaultChecked />
                    <label className="form-check-label" htmlFor="cols">Tài chính</label>
                </div>
            </div>
        </div>

    );
}
export default Search_Options;