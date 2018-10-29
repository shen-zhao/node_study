var buff1 = Buffer.from('abcde');
console.log(buff1);  // <Buffer 61 62 63 64 65>

var buff2 = buff1.slice();
console.log(buff2);  // <Buffer 61 62 63 64 65>

var buff3 = buff1.slice(1, 3);
console.log(buff3);  // <Buffer 62 63>

buff3[0] = 97;  // parseInt(61, 16) ==> 97
console.log(buff1);  // <Buffer 61 61 63 64 65>
console.log(buff3);  // <Buffer 61 63>
console.log(buff2);  // <Buffer 61 61 63 64 65>

buff3[0] = 33;
console.log('-------------');
console.log(buff1);  // <Buffer 61 21 63 64 65>
console.log(buff3);  // <Buffer 21 63>
console.log(buff2);  // <Buffer 61 21 63 64 65>