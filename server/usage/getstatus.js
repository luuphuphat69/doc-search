const soap = require('soap');
const https = require('https');

const url = 'http://huflitwebservices.somee.com/WebService1.asmx?wsdl';

const getstat = () => {
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
                console.log(err);
                return reject(err);
            }
            client.CheckIfDone((err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(result.CheckIfDoneResult);
            });
        });
    });
};

module.exports = getstat;