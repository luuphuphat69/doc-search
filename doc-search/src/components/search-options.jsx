const Search_Options = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <div className="d-block" id="topic">
                        <strong className="d-block text-start">Search in fields:</strong>
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
                {/* <div className="col-4">
                    <div className="d-block" id="column">
                        <strong className="d-block text-start">Search in topics:</strong>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="topl" name="topics[]" value="l" defaultChecked />
                            <label className="form-check-label" htmlFor="topl">Libgen</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="topc" name="topics[]" value="c" defaultChecked />
                            <label className="form-check-label" htmlFor="topc">Comics</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="topf" name="topics[]" value="f" defaultChecked />
                            <label className="form-check-label" htmlFor="topf">Fiction</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="topa" name="topics[]" value="a" defaultChecked />
                            <label className="form-check-label" htmlFor="topa">Scientific Articles</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="topm" name="topics[]" value="m" defaultChecked />
                            <label className="form-check-label" htmlFor="topm">Magazines</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="topr" name="topics[]" value="r" defaultChecked />
                            <label className="form-check-label" htmlFor="topr">Fiction RUS</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="tops" name="topics[]" value="s" defaultChecked />
                            <label className="form-check-label" htmlFor="tops">Standards</label>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="d-block" id="object">
                        <strong className="d-block text-start">Search in objects:</strong>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="objf" name="objects[]" value="f" defaultChecked />
                            <label className="form-check-label" htmlFor="objf">Files</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="obje" name="objects[]" value="e" defaultChecked />
                            <label className="form-check-label" htmlFor="obje">Editions</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="objs" name="objects[]" value="s" defaultChecked />
                            <label className="form-check-label" htmlFor="objs">Series</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="obja" name="objects[]" value="a" defaultChecked />
                            <label className="form-check-label" htmlFor="obja">Authors</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="objp" name="objects[]" value="p" defaultChecked />
                            <label className="form-check-label" htmlFor="objp">Publishers</label>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="objw" name="objects[]" value="w" defaultChecked />
                            <label className="form-check-label" htmlFor="objw">Works</label>
                        </div>
                    </div>
                </div> */}
            </div>
            <div>
                <div className="row">
                    <strong>Results per page:</strong>

                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="res25" name="res" class="custom-control-input" value="25" defaultChecked='true'/>
                        <label class="custom-control-label" for="res25">25</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="res50" name="res" class="custom-control-input" value="50" />
                        <label class="custom-control-label" for="res50">50</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="res100" name="res" class="custom-control-input" value="100" />
                        <label class="custom-control-label" for="res100">100</label>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Search_Options;