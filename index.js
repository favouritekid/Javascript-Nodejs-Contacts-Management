/**
* Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
* - Nhập dữ liệu contact (name, phone number)
* - Sửa dữ liệu contact
* - Xoá contact
* - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho
ra kết quả) hoặc 1 phần số điện thoại
*/
const Contacts = require('./contacts');
const Phones = require('./phones');
const readlineSync = require('readline-sync');
const fs = require('fs') //gọi buit-in module fs trong nodejs

/*Đọc dữ liệu từ data.json */
var contactList = fs.readFileSync('data.json');
contactList = JSON.parse(contactList); //object

function displayMenu(){
	console.log('1.Hiển thị danh sách liên hệ\n2.Nhập liên hệ mới\n3.Sửa liên hệ\n4.Xóa liên hệ\n5.Tìm kiếm liên hệ\n0.Thoát chương trình\nVui long chọn một trong các tùy chọn trên!');
	var choose = readlineSync.question('Chọn:');
	switch(choose){
		case '1':
			listContact();
			console.log('-------------------------');
			displayMenu();
			break;
		case '2':
			addContact();
			console.log('-------------------------');
			displayMenu();
			break;
		case '3':
			editContact();
			console.log('-------------------------');
			displayMenu();
			break;
		case '4':
			deleteContact();
			console.log('-------------------------');
			displayMenu();
			break;
		case '5':
			searchContact();
			console.log('-------------------------');
			displayMenu();
			break;
		case '0':
			console.log('Tạm biệt!');
			break;
		default:
			displayMenu();
			break;			
	}
}
function listContact(){
	console.log(contactList);
}
function addContact(){
	var name = readlineSync.question('Nhập họ và tên:');
	var email = readlineSync.question('Nhập email:');
	var contact = new Contacts(name,email);
	console.log(contact);
	var totalPhone = readlineSync.question('Liên hệ ('+name+') có bao nhiêu số điện thoại:');
	var phone = {};
	for (var i = 0; i<totalPhone; i++) {
		var label = readlineSync.question('Loại số di động:');
		var phoneNumber = readlineSync.question('Số di động:');
		phone[i] = new Phones(label,phoneNumber);
	}
/*const readlineSync = require('readline-sync');
var phone = [];
for (var i = 0; i<2; i++) {
	var label = readlineSync.question('Loại số di động:');
	var phoneNumber = readlineSync.question('Số di động:');
	phone[i] = new Phones(label,phoneNumber);
	phone.push(phone[i]);
}
console.log(phone);*/

var objects = {};

for (var x = 0; x < 100; x++) {
  objects[x] = {name: etc};
}



}
function editContact(){
	console.log('Sua');
}
function deleteContact(){
	console.log('Xoa');
}
function searchContact(){
	console.log('Tim kiem');
}

displayMenu();