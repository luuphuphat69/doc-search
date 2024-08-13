const soap = require('soap');
const https = require('https');

// Disable certificate verification (not recommended for production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const url = 'http://huflitwebservices.somee.com/WebService1.asmx?wsdl';
// const url = 'https://localhost:44324/WebService1.asmx?wsdl';

const GetQuery = () => {
    return new Promise((resolve, reject) => {
        const options = {
            wsdl_options: {
                agent: new https.Agent({
                    rejectUnauthorized: false
                })
            }
        };

        soap.createClient(url, options, (err, client) => {
            if (err) {
                return reject(err);
            }
            client.GetQuery((err, result) => {
                if (err) {
                    return reject(err);
                } 
                try {
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            });
        });
    });
};

module.exports = GetQuery;