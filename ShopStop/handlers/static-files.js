const fs = require('fs');
const path = require('path');
const url = require('url');

function getContentType(url) {

    if (url.endsWith('.css')) {
        return 'text/css';
    } else if (url.endsWith('.html')) {
        return 'text/html';
    } else if (url.endsWith('.js')) {
        return 'text/javascript';
    } else if (url.endsWith('.png')) {
        return 'text/png';
    } else if (url.endsWith('.jpg')) {
        return 'image/jpg';
    } else if (url.endsWith('.ico')) {
        return 'image/x-icon';
    }

}

module.exports = (req, resp) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname.startsWith('/content/') && req.method === 'GET') {

        let filePath = path.normalize(
            path.join(__dirname, `..${req.pathname}`)
        )


        fs.readFile(filePath, (err, data) => {

            if (err) {
                //Show Error page
                resp.writeHead(404, {
                    'content-type': 'text/plain'
                })

                resp.write('Resource not found.');
                resp.end();
                return;
            }

            resp.writeHead(200, {
                'content-type': getContentType(req.pathname)
            })
            console.log('path: ' + req.pathname)
            resp.write(data);
            resp.end();
        })


    } else {
        return true;
    }


}


