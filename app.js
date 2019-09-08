const fs = require('fs');
const http = require('http');

//console.log(process)

const readFile = (file) => {
  return new Promise((resolve, reject)=> {
    fs.readFile(file, (err, data) => {
      if(err) {
        reject(err);
      }
      else {
        resolve(data.toString())
      }
    }
  )}
  )};

http.createServer((req, res)=> {
if (req.url === '/api/users') {
  readFile('./users.json')
  .then(data => {
    res.write(data);
    res.end();
  })
  .catch( ex => {
    res.statusCode = 500;
    res.write(ex.message);
    res.end();
  })
} else {
  res.write('hello world!');
  res.end();
}
}).listen(3000);



