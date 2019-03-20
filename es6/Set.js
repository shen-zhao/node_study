const firstSet = new Set();

console.log(firstSet.size);  // 0

console.log(firstSet.add(1));  // Set { 1 }
console.log(firstSet.add(2));  // Set { 1, 2 }
console.log(firstSet.size);  // 2

console.log(firstSet.has(1));  // true

console.log(firstSet.delete(1));  // true

console.log(firstSet.clear());  //undefined

//数组去重
console.log([...new Set([1,5,2,4,6,4,2,1,3])]);
//使用类似于’===‘, 但是NaN除外
console.log(new Set([NaN, NaN]))  // Set { NaN }

//遍历
var set1 = new Set([1,2,3,4,5,6,7,{}]);
//键和值相同
//实例方法
console.log(set1.keys()); // SetIterator { 1, 2, 3, 4, 5, 6, 7, {} }
console.log(set1.values()); // SetIterator { 1, 2, 3, 4, 5, 6, 7, {} }
console.log(set1.entries()); // SetIterator { [1,1], [2,2], [3,3], [4,4], [5,5], [6,6], [7,7], [{},{}] }
//返回值都为迭代器(iterator), 都可以供for...of消费
for (let [k, v] of set1.entries()) {
    console.log(k === v);
}
//key和value都相等

set1.forEach((v, k) => {
    console.log(k, v);
})








