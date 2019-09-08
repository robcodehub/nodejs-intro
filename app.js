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
  res.write('hello world!');
  res.end();
}).listen(3000);



