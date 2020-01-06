function Phone (label){
  this.label = label;
  this.phoneNumber = [];
}
Phone.prototype.addPhoneNumber = function(phoneNumber){
  this.phoneNumber = this.phoneNumber.concat(phoneNumber);
}
module.exports = Phone;