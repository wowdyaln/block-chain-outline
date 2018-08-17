const fs = require('fs')
const CryptoJS = require("crypto-js")
let newHash_ = ""
let newNonce_ = ""
let runtime_ = ""

let leading_zero = ""
//! set digit here
let digit = 4
//!

// * 定義前導零的位數
function setDigit(num){
  for (let i=0; i < num; i++){
    leading_zero += "0"
  }
}
//! set leading_zero
setDigit(digit)
//!
// * wordArray 轉成 string
function hashIt(str) {
  let wordAry = CryptoJS.SHA256(str)
  return CryptoJS.enc.Hex.stringify(wordAry)
}


// * 如果出來的 hash 不符合前導零規定，就 mine
function mine(oldHash) {
  let found = false
  let t1 = Date.now()

  for (var x = 0; !found; x++) {
  // for (var x = 0; x <= 1000000 && !found; x++) {
    let newStr = `${block}${x}${data}`
    let newHash = hashIt(newStr)

    if (newHash.substr(0, digit) === leading_zero) {
      let t2 = Date.now()
      let runtime = t2 - t1
      found = true
      newNonce_ = x
      newHash_ = newHash
      runtime_ = runtime
      console.log(`
      the valid nonce is :  ${newNonce_}

      newHash : ${newHash}

      runtime : ${runtime} ms
      `)
      // break
    }
  }
  if(!found){
    console.log(`oh my God !! computer can't calculate the nonce... ...`);
  }
}

let block = fs.readFileSync('./input/block.txt', 'utf8')
let nonce = fs.readFileSync('./input/nonce.txt', 'utf8')
let data = fs.readFileSync('./input/data.txt', 'utf8')

let string = `${block}${nonce}${data}`

let hash = hashIt(string)
let valid = hash.substr(0, digit) === leading_zero

// print info
console.log(`
  ============================
  leading_zero: ${leading_zero}
  ============================ 
  block: ${block}

  nonce: ${nonce}

  data: 
    >>|${data}
  
  ===> hash: ${hash}
============================  
            `);

//! check hash...
if (!valid){ 
  console.log("mining... ");
  mine(hash)

  let log = `
  ============================ 
  leading_zero: ${leading_zero}
  ============================ 
  block: ${block}
  nonce: ${nonce}
  data: 
  <---vvvvvvvvvvvvvv--->
  ${data}
  <---^^^^^^^^^^^^^^--->
  ===> hash: ${hash}
  ============================ 
  valid nonce :  ${newNonce_}
  ===> hash: ${newHash_}
  runtime: ${runtime_} ms


  `
  // 寫入 logs
  fs.appendFileSync('./logs/log.txt', log, "utf8")

} 

if (valid) {
  console.log(`
  Good !
  The nonce is valid (leading_zero: '${leading_zero}'): ${nonce}
  hash : ${hash}
  `)
}