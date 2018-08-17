# block chain outline



A simple way to understand what block chain is.

[based on https://anders.com/blockchain](https://anders.com/blockchain/block.html)

[video](https://youtu.be/_160oMzblY8)
1. See this video and play around the web site. This is a great resource to understand block chain.
   ### Thanks to Anders Brownworth !
2. If you want to calculate the Nonce causing a hash with **leading zero more than 4 digit** , and you can clone this project to play around.


### Prerequisite

* node.js

### First-time setup

After cloning this repository & cd into project directory, then install the dependencies.

```
$ npm i
```
Create a log file to write some infomation.

```
$ mkdir logs
$ cd logs
$ touch log.txt
```
### edit txt files


Reference [this web](https://anders.com/blockchain/block.html)
Fill in the info from website fields to following files.
```
./input/block.txt
./input/nonce.txt
./input/data.txt
```

* field 'Block:' --> `block.txt`
* field 'Nonce:' --> `nonce.txt`
* field 'Data:' --> `data.txt`



### execute
##### get a hash


```
$ node dataToHash.js
```
the terminal with print the infomation like this :



```
block: 2
nonce: 35990
data: 上千名谷歌員工對公司決定祕密為中國打造一個審查版搜索引擎感到不滿，簽署了一封信，要求公司提高透明度，以便他們了解自己工作的道德後果。
hash: 753ea2d39924e0b21140197bd20ee5e5c951310d42a61eb7fa543b218e018265
```

##### calculate the Nonce (Mine)

1. Open `calcNonce.js` file to **set leading zero digits.**

```
.....
...
//! set digit here
let digit = 4
//!
...
.....
```
e.g. `let digit = 3` ; `let digit = 6`
##### Warning: setting more than 6 will cost huge time.

2. `$ node calcNonce.js`
the terminal with print the infomation like this :

```
============================
  leading_zero: 0000
  ============================
  block: 2

  nonce: 35990

  data:
    >>|上千名谷歌員工對公司決定祕密為中國打造一個審查版搜索引擎感到不滿，簽署了一封信，要求公司提高透明度，以便他們了解自己工作的道德後果。

  ===> hash: 753ea2d39924e0b21140197bd20ee5e5c951310d42a61eb7fa543b218e018265
============================

mining...

      the valid nonce is :  28338

      newHash : 0000cc8064dd125f260934c7e8c18a5ffdf8db2d469068285edc9488810247a0

      runtime : 932 ms
```
compare the result with the website. ;D

#### logs history
Every action of mining, the logs info will be `logs/log.txt`

```
log.txt
============================ 
  leading_zero: 000000
  ============================ 
  block: 1
  nonce: 4578
  data: 
  <---vvvvvvvvvvvvvv--->
  have a good day
  <---^^^^^^^^^^^^^^--->
  ===> hash: 0009453179b5cac0f28d0dfd505eaa84f5aa9bacb2a3bab7f90b51a01df397fb
  ============================ 
  valid nonce :  7102892
  ===> hash: 0000008ab83bb687aa5722f41de5d43bebcdf4beb90b3b7199e45e3527b37e11
  runtime: 81315 ms
```

### Compare more...

https://anders.com/blockchain/blockchain.html
https://anders.com/blockchain/distributed.html

https://anders.com/blockchain/tokens.html
https://anders.com/blockchain/coinbase.html

There are many fields to effect the coming hash. You can get a final string using '**getText(block, user)**' functions with devTools.

> block left to right: 1 - 5

> user PeerA to PeerC: 1 - 3


```
in (https://anders.com/blockchain/coinbase.html)
chrome devTools console :

// get a string from PeerC; block2
> getText(2, 3)

return a string:

"2215458100.00Anders10.00AndersSophia20.00AndersLucas15.00AndersEmily15.00AndersMadison0000438d7625b86a6f366545b1929975a0d3ff1f8847e56cc587cadddb0ab781"

```
open `singleStr_test.js`
assign variable `string` with the string from devTools console :

```
let string = "2215458100.00Anders10.00AndersSophia20.00AndersLucas15.00AndersEmily15.00AndersMadison0000438d7625b86a6f366545b1929975a0d3ff1f8847e56cc587cadddb0ab781"
```

`$ node singleStr_test.js`  :
```
string: 2215458100.00Anders10.00AndersSophia20.00AndersLucas15.00AndersEmily15.00AndersMadison0000438d7625b86a6f366545b1929975a0d3ff1f8847e56cc587cadddb0ab781

hash: 0000baeab68c2a60f9a6fa56355438d97c672a15494fcea617064d9314f9ff63
```

compare the result with website. ;D
