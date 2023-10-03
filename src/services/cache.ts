import NodeCache from 'node-cache';

const myCache = new NodeCache();

const obj = { name: "Alexander", age: 42 };
let data = myCache.set( "key", obj, 20000 );

console.log(data);

export default myCache;
