const fs = require('fs');
const path = require('path');

fs.readdir('./', 'utf8', (err, files) => {
    if (err) throw err;
    
    console.log(files);
});