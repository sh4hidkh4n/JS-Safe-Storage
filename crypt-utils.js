var crypto = require("crypto");
var c = function() {
  this.password = "";
  this.iv = "";
  this.algorithm = "aes-256-gcm";

  this._encoding = "base64"
  this._generateIV = () => {
    this.iv = crypto.randomBytes(12).toString('hex').substring(0, 12);
    // console.log("IV: ", this.iv)
    return this.iv
  }

  this.encrypt = (text, pass) => {
    // pass = pass.substring(0, 32)
    pass = new Buffer(pass, "binary");
    
    this.setPassword(pass) 
    var cipher = crypto.createCipheriv(this.algorithm, this.getPassword(), this._generateIV())
    var encrypted = cipher.update(text, 'utf8', this._encoding)
    encrypted += cipher.final(this._encoding);
    var tag = cipher.getAuthTag();
    return {
      content: encrypted,
      tag: tag.toString("hex")
    };
  }

  this.decrypt = (encrypted, pass, iv) => {
    this.setPassword(pass)
    password = pass.substring(0, 32)
    password = new Buffer(password, "binary");
    var decipher = crypto.createDecipheriv(this.algorithm,this.getPassword(), iv)
    decipher.setAuthTag(new Buffer( encrypted.tag, "hex" ) );
    var dec = decipher.update(encrypted.content, this._encoding , 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }
  this.setPassword = (password) => {
    this.password = password.toString().substring(0, 32)
  }
  this.getPassword = () => {
    return this.password
  }
}
var crypt = new c()
module.exports = crypt