const dbconfig = {

    user: 'phat',
    password: '123123',
    server: 'localhost',
    database: 'EREL_server',
    port:1433,
    options: {
        trustedconnection: true,
        enableArithAbort: true,
        instancename: 'MSI',
        encrypt: true,
        trustServerCertificate: true,
    }
 };
 module.exports = dbconfig;