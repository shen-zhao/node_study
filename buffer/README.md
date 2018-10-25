## Buffer (缓冲)

在 ECMAScript 2015 引入 TypedArray 之前，JavaScript 语言没有读取或操作二进制数据流的机制。 `Buffer` 类被引入作为 Node.js API 的一部分，使其可以在 TCP 流或文件系统操作等场景中处理二进制数据流。

TypedArray 现已被添加进 ES6 中，`Buffer` 类以一种更优化、更适合 Node.js 用例的方式实现了 `Uint8Array` API。

`Buffer` 类的实例类似于整数数组，但 `Buffer` 的大小是固定的、且在 V8 堆外分配物理内存。 `Buffer` 的大小在被创建时确定，且无法调整。

`Buffer` 类在 Node.js 中是一个全局变量，因此无需使用 `require('buffer').Buffer`。

### Buffer实例创建，`Buffer.from()`, `Buffer.alloc()`, and `Buffer.allocUnsafe()`

在 Node.js v6 之前的版本中，`Buffer` 实例是通过 `Buffer` 构造函数创建的，它根据提供的参数返回不同的 `Buffer`


- 传一个数值作为第一个参数给 `Buffer()`（如 `new Buffer(10)`），则分配一个指定大小的新建的 `Buffer` 对象。 在 Node.js 8.0.0 之前，分配给这种 `Buffer` 实例的内存是没有初始化的，且可能包含敏感数据。 这种 `Buffer` 实例随后必须被初始化，可以使用 `buf.fill(0)` 或写满这个 `Buffer`。 虽然这种行为是为了提高性能而有意为之的，但开发经验表明，创建一个快速但未初始化的 `Buffer` 与创建一个慢点但更安全的 `Buffer` 之间需要有更明确的区分。从 Node.js 8.0.0 开始， `Buffer(num)` 和 `new Buffer(num)` 将返回一个初始化内存之后的 `Buffer`。
- 传一个字符串、数组、或 `Buffer` 作为第一个参数，则将所传对象的数据拷贝到 `Buffer` 中。
- 传入 `ArrayBuffer` 或 `SharedArrayBuffer`，则返回一个与传入的 `ArrayBuffer` 共享所分配内存的 `Buffer`。

因为 `new Buffer()` 的行为会根据所传入的第一个参数的值的数据类型而明显地改变，所以如果应用程序没有正确地校验传给 `new Buffer()` 的参数、或未能正确地初始化新分配的 `Buffer` 的内容，就有可能在无意中为他们的代码引入安全性与可靠性问题。

为了使 `Buffer` 实例的创建更可靠、更不容易出错，各种 `new Buffer()` 构造函数已被 废弃，并由 `Buffer.from()`、`Buffer.alloc()`、和 `Buffer.allocUnsafe()` 方法替代。

- `Buffer.from(array)` 返回一个新建的包含所提供的字节数组的副本的 `Buffer`。
- `Buffer.from(arrayBuffer)` 返回一个新建的与给定的 `ArrayBuffer` 共享同一内存的 `Buffer`。
- `Buffer.from(buffer)` 返回一个新建的包含所提供的 `Buffer` 的内容的副本的 `Buffer`。
- `Buffer.from(string[, encoding])` 返回一个新建的包含所提供的字符串的副本的 `Buffer`。
- `Buffer.alloc(size[, fill[, encoding]])` 返回一个指定大小的被填满的 Buffer 实例。 这个方法会明显地比 Buffer.allocUnsafe(size) 慢，但可确保新创建的 Buffer 实例绝不会包含旧的和潜在的敏感数据。
- `Buffer.allocUnsafe(size)` 与 `Buffer.allocUnsafeSlow(size)` 返回一个新建的指定 size 的 `Buffer`，但它的内容必须被初始化，可以使用 `buf.fill(0)` 或完全写满。


### Buffer与字符编码

#### nodeJS目前支持的字符编码：
- 'ascii' - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
- 'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
- 'utf16le' - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- 'ucs2' - 'utf16le' 的别名。
- 'base64' - Base64 编码。当从字符串创建 Buffer 时，按照 RFC4648 第 5 章的规定，这种编码也将正确地接受“URL 与文件名安全字母表”。
- 'latin1' - 一种把 Buffer 编码成一字节编码的字符串的方式（由 IANA 定义在 RFC1345 第 63 页，用作 Latin-1 补充块与 C0/C1 控制码）。
- 'binary' - 'latin1' 的别名。
- 'hex' - 将每个字节编码为两个十六进制字符。


### Buffer实例的创建

#### new Buffer(array)
```javascript
// Creates a new Buffer containing the ASCII bytes of the string 'buffer'
const buf = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

//验证
const array = 'buffer'.split('').map((s) => {
    return '0x' + s.charCodeAt(0).toString(16);
});

console.log(array.join());
```

#### Buffer.alloc(length)
```javascript
const buf1 = Buffer.alloc(10); // 长度为10的buffer，初始值为0x0
const buf2 = Buffer.alloc(10, 1);  // 长度为10的buffer，初始值为0x1
console.log(buf1, buf2);

const buf3 = Buffer.allocUnsafe(10);  // 长度为10的buffer，初始值不确定
const buf4 = Buffer.from([1, 2, 3])  // 长度为3的buffer，初始值为 0x01, 0x02, 0x03
```

#### Buffer.from()

- 1、Buffer.from(array)
```javascript
// [0x62, 0x75, 0x66, 0x66, 0x65, 0x72] 为字符串 "buffer" 
// 0x62 为16进制，转成十进制就是 98，代表的就是字母 b
const _buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
console.log(_buf.toString());
```
- 2、Buffer.from(string[, encoding])
通过`string`创建`buffer`，跟将`buffer`转成字符串时，记得编码保持一致，不然会出现乱码，如下所示.
```javascript
const buf = Buffer.from('this is a tést');

// 输出：this is a tést
console.log(buf.toString());  // 默认编码是utf8，所以正常打印

// 输出：this is a tC)st
console.log(buf.toString('ascii'));  // 转成字符串时，编码不是utf8，所以乱码
```
对乱码进行分析如下：
```javascript
const letter = 'é';
const buff = Buffer.from(letter);  // 默认编码是utf8，这里占据两个字节 <Buffer c3 a9>
const len = buff.length;  // 2
const code = buff[0]; // 第一个字节为0xc3，即195：超出ascii的最大支持范围
const binary = code.toString(2);  // 195的二进制：10101001
const finalBinary = binary.slice(1);  // 将高位的1舍弃，变成：0101001
const finalCode = parseInt(finalBinary, 2);  // 0101001 对应的十进制：67
const finalLetter = String.fromCharCode(finalCode);  // 67对应的字符：C

// 同理 0xa9最终转成的ascii字符为)
// 所以，最终输出为 this is a tC)st
```
- 3、Buffer.from(buffer)
创建新的`Buffer`实例，并将buffer的数据拷贝到新的实例子中去。
```javascript
const buff = Buffer.from('buffer');
const buff2 = Buffer.from(buff);

console.log(buff.toString());  // 输出：buffer
console.log(buff2.toString());  // 输出：buffer

buff2[0] = 0x61;

console.log(buff.toString());  // 输出：buffer
console.log(buff2.toString());  // 输出：auffer
```

### Buffer实例比较

#### buffer.equals(otherBuffer)

判断两个buffer实例存储的数据是否相同，如果是，返回true，否则返回false。
```javascript
// 例子一：编码一样，内容相同
const buf1 = Buffer.from('A');
const buf2 = Buffer.from('A');

console.log( buf1.equals(buf2) );  // true

// 例子二：编码一样，内容不同
const buf3 = Buffer.from('A');
const buf4 = Buffer.from('B');

console.log( buf3.equals(buf4) );  // false

// 例子三：编码不一样，内容相同
const buf5 = Buffer.from('ABC');  // <Buffer 41 42 43>
const buf6 = Buffer.from('414243', 'hex');

console.log(buf5.equals(buf6));
```

#### buffer.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])

同样是对两个buffer实例进行比较，不同的是：
- 可以指定特定比较的范围（通过start、end指定）
- 返回值为整数，达标buf、target的大小关系
假设返回值为
- 0：buf、target大小相同。
- 1：buf大于target，也就是说buf应该排在target之后。
- -1：buf小于target，也就是说buf应该排在target之前。
看例子，官方的例子挺好的，直接贴一下：
```javascript
const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('BCD');
const buf3 = Buffer.from('ABCD');

// Prints: 0
console.log(buf1.compare(buf1));

// Prints: -1
console.log(buf1.compare(buf2));

// Prints: -1
console.log(buf1.compare(buf3));

// Prints: 1
console.log(buf2.compare(buf1));

// Prints: 1
console.log(buf2.compare(buf3));

// Prints: [ <Buffer 41 42 43>, <Buffer 41 42 43 44>, <Buffer 42 43 44> ]
// (This result is equal to: [buf1, buf3, buf2])
console.log([buf1, buf2, buf3].sort(Buffer.compare));
```
#### Buffer.compare(buf1, buf2)

跟 `buffer.compare(target)` 大同小异，一般用于排序。直接贴官方例子：
```javascript
const buf1 = Buffer.from('1234');
const buf2 = Buffer.from('0123');
const arr = [buf1, buf2];

// Prints: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// (This result is equal to: [buf2, buf1])
console.log(arr.sort(Buffer.compare));
```