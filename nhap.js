const readlineSync = require('readline-sync');

function Contact (name,email) {
    this.name = name;
    this.email = email;
    this.phones = [];
}
Contact.prototype.addPhone = function (phone) {
    this.phones.push(phone);
}
var name = readlineSync.question('Nhập họ và tên:');
var email = readlineSync.question('Nhập email:');
var contact = new Contact(name,email);
console.log(contact);


function Phone (label){
  this.label = label;
  this.phoneNumber = [];
}
Phone.prototype.addPhoneNumber = function(phoneNumber){
  this.phoneNumber = this.phoneNumber.concat(phoneNumber);
}
console.log('Nhập số điện thoại di động. Nếu có 2 số trở lên thì ngăn cách nhau bằng dấu phẩy(,)');
var numberOfMobile = readlineSync.question('Số di động:');
var numberOfPhone = readlineSync.question('Số điện thoại bàn:');
numberOfMobile = (numberOfMobile.replace(/\s/g, '')).split(','); //xóa khoảng trắng và chia nhỏ số điện thoại thành array 
numberOfPhone = (numberOfPhone.replace(/\s/g, '')).split(',');
var mobileLabel = new Phone('Mobile');
mobileLabel.addPhoneNumber(numberOfMobile);
var phoneLabel = new Phone('Phone');
phoneLabel.addPhoneNumber(numberOfPhone);
contact.addPhone(mobileLabel);
contact.addPhone(phoneLabel);

console.log(contact);
/*var mobileLabel = readlineSync.question('Liên hệ ('+name+') có bao nhiêu số điện thoại di động:');

var phoneLabel = readlineSync.question('Liên hệ ('+name+') có bao nhiêu số điện thoại di động:');

var phone = {};
for (var i = 0; i<totalPhone; i++) {
  var label = readlineSync.question('Kiểu Mobile/Phone:');
  var phoneNumber = readlineSync.question('Nhập số di động:');
  phone[i] = new Phone(label,phoneNumber);
  contact.addPhone(phone[i]);
}*/

var obj1 = {
  "name": "Pham Thai Ha",
  "email": "hapham1388@gmail.com",
  "phones": [
              { "label": "Mobile", "phoneNumber": ['0906513555','0815432345'] },
              { "label": "Phone","phoneNumber": ["02623505055"] }
            ]
};
var obj2 = {
  "name": "Pham Thai Ha 1",
  "email": "hapham1388@gmail.com",
  "phones": [{ "label": "MObile", "phoneNumber": "0906513555" },
    	   { "label": "Phone","phoneNumber": "02623505055" }
          ]
};
