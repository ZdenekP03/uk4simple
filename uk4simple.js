const http = require('http');
const fs = require('fs');

const PORT = 3000;

function increaseCounter() {
    fs.readFile('counter.txt', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.writeFile('counter.txt', '0', (err) => {
                    if (err) throw err;
                    console.log('Counter file created with initial value 0');
                });
            } else {
                throw err;
            }
        } else {
            const newValue = parseInt(data) + 1;
            fs.writeFile('counter.txt', newValue.toString(), (err) => {
                if (err) throw err;
                console.log('Counter increased to', newValue);
            });
        }
    });
}

function decreaseCounter() {
    fs.readFile('counter.txt', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.writeFile('counter.txt', '0', (err) => {
                    if (err) throw err;
                    console.log('Counter file created with initial value 0');
                });
            } else {
                throw err;
            }
        } else {
            const newValue = parseInt(data) - 1;
            fs.writeFile('counter.txt', newValue.toString(), (err) => {
                if (err) throw err;
                console.log('Counter decreased to', newValue);
            });
        }
    });
}

function readCounter(callback) {
    fs.readFile('counter.txt', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.writeFile('counter.txt', '0', (err) => {
                    if (err) throw err;
                    console.log('Counter file created with initial value 0');
                    callback('0');
                });
            } else {
                throw err;
            }
        } else {
            callback(data);
        }
    });
}

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/increase') {
        increaseCounter();
        res.end('Counter increased');
    }
    else if (url === '/decrease') {
        decreaseCounter();
        res.end('Counter decreased');
    }
    else if (url === '/read') {
        readCounter((counterValue) => {
            res.end(counterValue);
        });
    }
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
