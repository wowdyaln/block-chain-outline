const CryptoJS = require("crypto-js")

// wordArray 轉成 string
function hashIt(str){
  let wordAry = CryptoJS.SHA256(str)
  return CryptoJS.enc.Hex.stringify(wordAry)
}

let string = "418292100.00Anders15.00JacksonRyan5.00EmilyMadison8.00SophiaJackson0000df1d632b734f5a5fc126a0f0e8894fb4c8314ba7086b62980559af6771b9"
let hash = hashIt(string)

console.log(`
string: ${string}


hash: ${hash}
            `);