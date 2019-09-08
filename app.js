const fs = require('fs');
const http = require('http');

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

http.createServer(()=> {
  
});



