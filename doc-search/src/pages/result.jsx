import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import NavBar from '../components/navbar';

const Result = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { id: 'id', label: 'ID', minWidth: 170 },
        { id: 'title', label: 'Title', minWidth: 100 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch('http://3.81.8.209:2000/v1/result');
                //const response = await fetch('http://localhost:2000/v1/result');
                const data = await response.json();
                setData(data.map(createData));
                setLoading(false); // Set loading to false after data is set
            } catch (error) {
                console.error("Error fetching content data:", error);
                setLoading(false); // Set loading to false if there is an error
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);

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

    return (
        <div style={{ position: 'absolute', top: '0px', left: '0px', right: '0px' }}>
            <NavBar />
            <div className="if"><Link className="ifr" to="/search"><h1>Information Retrieval</h1></Link></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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
