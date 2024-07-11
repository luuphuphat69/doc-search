import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import NavBar from "../components/navbar";
import axios from 'axios';

const Result = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { searchResults } = location.state || { searchResults: [] };

    const columns = [
        { id: 'id', label: 'ID', minWidth: 170 },
        { id: 'title', label: 'Title', minWidth: 100 },
        // { id: 'date', label: 'Date', minWidth: 170 }
    ];

    useEffect(() => {
        if (searchResults) {
            if (searchResults.type === 'json') {
                setData(searchResults.data.docs);
            } else{
                const fetchData = async () => {
                    try {
                        const response = await axios.get('http://localhost:2000/v1/result');
                        if (response.data && Array.isArray(response.data)) {
                            setData(response.data);
                        }
                    } catch (error) {
                        console.error("Error fetching initial data:", error);
                    }
                };
    
                fetchData();
            }
        } else {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:2000/v1/result');
                    if (response.data && Array.isArray(response.data)) {
                        setData(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching initial data:", error);
                }
            };

            fetchData();
        }
    }, [data]);

    function createData(record) {
        return {
            id: record.Id,
            title: record.DocName,
            path: record.Path
        };
    }
    
    const rows = data.map(record => createData(record));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.get(`http://localhost:2000/v1/search?queries=${searchTerm}`);
            navigate("/result", {state:{searchResults: response.data}});
            window.location.reload();
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

            {
                /* display data table */
            }
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id}>
                                                        {column.id === 'title' ? (
                                                            <Link to={row.path}>
                                                                {value}
                                                            </Link>
                                                        ) : (
                                                            value
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
};

export default Result;