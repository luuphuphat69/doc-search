import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
    const [contentData, setContentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { responseData } = location.state || { responseData: { data: [] } };
    const prevUniqueDataRef = useRef([]);
    const preDataRef = useRef([]);

    const columns = [
        { id: 'id', label: 'ID', minWidth: 170 },
        { id: 'title', label: 'Title', minWidth: 100 },
    ];

    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await fetch('http://localhost:2000/v1/result');
                const data = await response.json();
                setContentData(data); // Ensure contentData is set correctly
            } catch (error) {
                console.error("Error fetching content data:", error);
            }
        };

        fetchContentData();
    }, [contentData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if contentData is an array
                const fetchedContentData = Array.isArray(contentData) ? contentData : [];

                // Combine contentData with responseData
                const validResponseData = Array.isArray(responseData.data)
                    ? responseData.data.flatMap(item => item.docs || [])
                    : [];

                // Combine the two datasets
                const combinedData = [...validResponseData, ...fetchedContentData];

                // Deduplicate based on ID
                const uniqueData = Array.from(
                    new Map(combinedData.map(doc => [String(doc.Id), doc])).values()
                );

                // Compare with previous unique data
                const prevUniqueData = prevUniqueDataRef.current;
                if (!areArraysEqual(prevUniqueData, uniqueData)) {
                    setData(uniqueData.map(record => createData(record)));
                    prevUniqueDataRef.current = uniqueData;
                }
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        fetchData();
    }, [responseData, contentData]);

    useEffect(() => {
            const prevData = preDataRef.current;
            if (!areArraysEqual(prevData, data)) {
                setLoading(false);
            } else {
                setLoading(true);
            }
            preDataRef.current = data; // Update reference to current data
        
    }, [data]);

    function createData(record) {
        return {
            id: record.Id || record.id,
            title: record.DocName || record.title,
            path: record.Path || record.path
        };
    }

    // Function to check if two arrays are equal
    const areArraysEqual = (array1, array2) => {
        if (array1.length !== array2.length) return false;
        return array1.every((item, index) => JSON.stringify(item) === JSON.stringify(array2[index]));
    };

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