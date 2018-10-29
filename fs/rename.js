const fs = require('fs');
const path = require('path');

let name1 = 'README.md';
let name2 = 'readme1.md';

let dirname1 = 'mkdir';
let dirname2 = 'MKDIR1';

let constant = '';

if (!fs.existsSync(path.resolve(__dirname, name1))) {
    constant = name1;
    name1 = name2;
    name2 = constant;
}
console.log(name1, name2);
fs.rename(name1, name2, (err) => {
    if (err) throw err;

    console.log('重命名成功')
});

if (!fs.existsSync(path.resolve(__dirname, dirname1))) {
    constant = dirname1;
    dirname1 = dirname2;
    dirname2 = constant;
}

fs.renameSync(dirname1, dirname2);
