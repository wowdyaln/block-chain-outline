const fs = require('fs')
const CryptoJS = require("crypto-js")

// wordArray 轉成 string
function hashIt(str){
  let wordAry = CryptoJS.SHA256(str)
  return CryptoJS.enc.Hex.stringify(wordAry)
}


let string = fs.readFileSync('./data.txt', 'utf8')
let hash = hashIt(string)

console.log(hash);