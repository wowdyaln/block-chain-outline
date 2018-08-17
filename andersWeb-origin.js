const CryptoJS = require("crypto-js");


$(function () {
  mineButtonAnimation(1, 1);
  updateHash(1, 1);
});

// *把 Block /  Nonce / Data 欄位輸入的字串都串在一起，成爲一個新的字串
// block: 第幾個區塊（在這網站，最多顯示5個而已。最左邊是1，最右邊是5）  
// chain: 那位使用者 （1代表Peer A；2代表 Peer B，以此類推）
function getText(block, chain) {
  return $('#block' + block + 'chain' + chain + 'number').val() +
    $('#block' + block + 'chain' + chain + 'nonce').val() +
    $('#block' + block + 'chain' + chain + 'data').val();
}


function mineButtonAnimation(block, chain) {
  $('#block' + block + 'chain' + chain + 'mineButton').click(function (e) {
    e.preventDefault();
    var l = Ladda.create(this);
    l.start();
    setTimeout(function () {
      mine(block, chain, false);
      l.stop();
    }, 250); // give UI time to update
  });
}




// from block.js

// 回傳一個 8個元素的 array ， 每個元素是位數不定的整數（有看到 9位/10位 ； 正負不一定）
function sha256(block, chain) {
  // calculate a SHA256 hash of the contents of the block
  return CryptoJS.SHA256(getText(block, chain));
}

function updateState(block, chain) {
  // set the well background red or green for this block
  if ($('#block' + block + 'chain' + chain + 'hash').val().substr(0, 4) === '0000') {
    $('#block' + block + 'chain' + chain + 'well').removeClass('well-error').addClass('well-success');
  }
  else {
    $('#block' + block + 'chain' + chain + 'well').removeClass('well-success').addClass('well-error');
  }
}

//* 指定區域(block)、使用者（chain）之後，算出 hash 值
function updateHash(block, chain) {
  // update the SHA256 hash value for this block
  $('#block' + block + 'chain' + chain + 'hash').val(sha256(block, chain));
  updateState(block, chain);
}

function updateChain(block, chain) {
  // update all blocks walking the chain from this block to the end
  for (var x = block; x <= 5; x++) {
    if (x > 1) {
      $('#block' + x + 'chain' + chain + 'previous').val($('#block' + (x - 1).toString() + 'chain' + chain + 'hash').val());
    }
    updateHash(x, chain);
  }
}

function mine(block, chain, isChain) {
  var found = false;
  for (var x = 0; x <= 1000000 && !found; x++) {
    $('#block' + block + 'chain' + chain + 'nonce').val(x);
    $('#block' + block + 'chain' + chain + 'hash').val(sha256(block, chain));
    if ($('#block' + block + 'chain' + chain + 'hash').val().substr(0, 4) === '0000') {
      found = true;
      if (isChain) {
        updateChain(block, chain);
      }
      else {
        updateState(block, chain);
      }
    }
  }
}

console.log(sha256("1", "yesman"));