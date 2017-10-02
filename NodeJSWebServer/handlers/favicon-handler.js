/*jshint esversion: 6 */
const fs = require('fs');
const favicoIco = '/favicon.ico';

module.exports = (req, res) => {
    if (req.path === favicoIco){
        fs.readFile('.' + favicoIco, (err,data) => {
            if(err){
                console.log(err);
                return;
            }
        
            response.writeHead(200, {
                'content-type': 'image/x-icon'
            });
        
            response.write(data);
            response.end();
        });
    }else{
        return true;
    }
};



