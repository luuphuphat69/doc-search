const soap = require('soap');
const https = require('https');

// Disable certificate verification (not recommended for production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const url = 'http://huflitwebservices.somee.com/WebService1.asmx?wsdl';
// const url = 'https://localhost:44324/WebService1.asmx?wsdl';

const GetParsedEntitiesFromQuery = () => {
    return new Promise((resolve, reject) => {
        const options = {
            wsdl_options: {
                agent: new https.Agent({
                    rejectUnauthorized: false // Use with caution in production
                })
            }
        };

        soap.createClient(url, options, (err, client) => {
            if (err) {
                console.error('Error creating SOAP client:', err);
                return reject(err);
            }

            client.GetListEntities({}, (err, result) => {
                if (err) {
                    console.error('Error calling GetListEntities:', err);
                    return reject(err);
                }

                try {
                    console.log('Raw result:', result);

                    // Ensure result and GetListEntitiesResult are not null or undefined
                    const entities = result && result.GetListEntitiesResult && result.GetListEntitiesResult.string
                        ? result.GetListEntitiesResult.string
                        : []; // Default to empty array if not present

                    console.log('Entities:', entities);
                    resolve(entities);
                } catch (err) {
                    console.error('Error processing result:', err);
                    reject(err);
                }
            });
        });
    });
};

module.exports = GetParsedEntitiesFromQuery;