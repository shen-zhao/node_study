const fs = require('fs');
const path = require('path');

const getFilesInDir = (dir) => {
    let results = [ path.resolve(dir) ];
    let files = fs.readdirSync(dir, 'utf8');

    files.forEach((file) => {
        file = path.resolve(dir, file);

        let stats = fs.statSync(file);

        if (stats.isFile()) {
            results.push(file);
        } else {
            results = results.concat(getFilesInDir(file));
        }
    });

    return results;
}

const files = getFilesInDir('./');

console.log(files);