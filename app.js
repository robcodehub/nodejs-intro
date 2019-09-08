const fs = require('fs');

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


readFile('./users.json')
.then( data => console.log('resolve', data))
.catch( ex => console.log('rejected', ex));


