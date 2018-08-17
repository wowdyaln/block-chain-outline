const fs = require('fs')
const CryptoJS = require("crypto-js")

// wordArray 轉成 string
function hashIt(str){
  let wordAry = CryptoJS.SHA256(str)
  return CryptoJS.enc.Hex.stringify(wordAry)
}


let block = fs.readFileSync('./input/block.txt', 'utf8')
let nonce = fs.readFileSync('./input/nonce.txt', 'utf8')
let data = fs.readFileSync('./input/data.txt', 'utf8')

let string = `${block}${nonce}${data}`

let hash = hashIt(string)

console.log(`
block: ${block}
nonce: ${nonce}
data: ${data}
hash: ${hash}
            `);