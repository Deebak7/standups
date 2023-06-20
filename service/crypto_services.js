const CryptoJs=require('crypto-js');

const encrypt=async function(plaintext){
  let ciphertext;
  ciphertext=CryptoJs.AES.encrypt(plaintext.toString(),CONFIG.secretKey).toString();
  return ciphertext;
}
module.exports.encrypt=encrypt;

const decrypt=function(ciphertext){
  let plaintext;
  const bytes=CryptoJs.AES.decrypt(ciphertext.toString(),CONFIG.secretKey);
  plaintext=bytes.toString(CryptoJs.enc.Utf8);
  return plaintext;
};
module.exports.decrypt=decrypt;