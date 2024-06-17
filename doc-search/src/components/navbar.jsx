import React, { useEffect } from 'react';

const NavBar = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "../src/assets/js/dark-mode-switch.js"; // Adjust the path as needed
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-secondary mb-4">
            <a className="navbar-brand" href="">
                <img src="../src/assets/images1.png" height="30" alt="" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">NEWS <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
                            id="dropdownMenuLink" aria-haspopup="true" aria-expanded="false">
                            LOGIN
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdown01">
                            <a className="dropdown-item" href="#">Register</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-secondary" href="#" role="button" id="dropdownMenuLink" aria-haspopup="true"
                            aria-expanded="false">
                            DOWNLOAD
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-secondary " href="" role="button" id="dropdownMenuLink"
                            aria-haspopup="true" aria-expanded="false">
                            UPLOAD
                        </a>
                    </li>
                </ul>
            </div>
            <div class="nav-link">

                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="darkSwitch"/>
                        <label class="custom-control-label" for="darkSwitch">🌓</label>
                </div>
               
            </div>
        </nav>
    );
}

export default NavBar;
