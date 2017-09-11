var crypt = require('./crypt-utils.js')
var fs = require("fs")
var assert = require('assert')

// TEST-1 : Direct Bitmap Encryption

// var bitmap = fs.readFileSync("./30.png").toString("base64")
// console.log("Bitmap Base64 Length: ", bitmap.length)
var password = "iamshahidkamalkhanwhichisveryuniqueperson"

// var encrypted = crypt.encrypt(bitmap, password)
// encrypted.iv = crypt.iv
// console.log("Encrypted Base64 Length: ", encrypted.content.length)

// fs.writeFileSync("encrypted-data.txt", JSON.stringify(encrypted))

// DECRYPTION: 
// read file
var encJson = JSON.parse( fs.readFileSync("encrypted-data.txt", "utf-8") )

var decrypted = crypt.decrypt(encJson, password, encJson.iv)
console.log(typeof decrypted, decrypted.length)
var file = fs.writeFileSync("./enc-30.png",  new Buffer( decrypted, "base64" ) )
// Results Successful

// TEST-2 : Bitmap -> Base64 -> Encryption



// var pass = "this is my very very very very aa" // should not be more than 32 bits

// var encrypted =  crypt.encrypt("Hello World!", pass) //Object => {content: "", tag: ""}

// console.log( encrypted ) 

// var decrypted = crypt.decrypt(encrypted, pass, crypt.iv)

// console.log(decrypted)

