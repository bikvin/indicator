const str = '125.12.233.211';

const regex = new RegExp('[0-255].[0-255].[0-255].[0-255]');

console.log(regex.test(str));