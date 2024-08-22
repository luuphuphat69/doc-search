import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button'; // Import Button
import NavBar from '../components/navbar';
import axios from 'axios';

const Result = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { state } = useLocation();
    const { query } = state;

    const columns = [
        { id: 'id', label: 'ID', minWidth: 170 },
        { id: 'title', label: 'Title', minWidth: 100 },
    ];

    const getData = () => {
        setLoading(true);
        //axios.get('http://localhost:2000/v1/result')
        axios.get('http://3.81.8.209:2000/v1/result')
            .then(response => {
                const data = response.data;
                setData(data.map(createData));
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, [query]);

    function createData(record) {
        return {
            id: record.DocID || record.Id,
            title: record.Title || record.DocName,
            path: record.Path
        };
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Add a function to handle the refresh button click
    const handleRefresh = () => {
        getData();
    };

    return (
        <div style={{ position: 'absolute', top: '0px', left: '0px', right: '0px' }}>
            <NavBar />
            <div className="if">
                <Link className="ifr" to="/search">
                    <h1>Information Retrieval</h1>
                </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Button variant="contained" color="primary" onClick={handleRefresh} style={{ margin: '20px 0' }}>
                    Refresh Data
                </Button>
                {loading ? (
                    <CircularProgress /> // Display loading spinner
                ) : (
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
                                    {data
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
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                )}
            </div>
        </div>
    );
};

export default Result;