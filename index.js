/**
* Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
* - Nhập dữ liệu contact (name, phone number)
* - Sửa dữ liệu contact
* - Xoá contact
* - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho
ra kết quả) hoặc 1 phần số điện thoại
*/
const Contact = require('./contacts');
const Phone = require('./phones');
const readlineSync = require('readline-sync');
const fs = require('fs') //gọi buit-in module fs trong nodejs
const filePath = './data.json';

function displayMenu(){
	console.log('1.Hiển thị danh sách liên hệ\n2.Nhập liên hệ mới\n3.Sửa liên hệ\n4.Xóa liên hệ\n5.Tìm kiếm liên hệ\n0.Thoát chương trình\nVui long chọn một trong các tùy chọn trên!');
	var choose = readlineSync.question('Chọn:');
	switch(choose){
		case '1':
			listContact();
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
function readContact(path){
	/*Đọc dữ liệu từ data.json */
	var contactList = fs.readFileSync(path);
	return contactList = JSON.parse(contactList); //object
}
function writeContact(content){
	content = JSON.stringify(content);
	fs.writeFileSync(filePath,content);
}
function listContact(){
	var content = readContact(filePath);
	if(content.length ===0)	console.log(content);
	else {
		for(key in content) {
		    if(content.hasOwnProperty(key)) {
		        var value = content[key];
		        console.log(value);
		    }
		}
	}
}
function addContact(){
	var name = readlineSync.question('Nhập họ và tên:');
	var email = readlineSync.question('Nhập email:');
	console.log('Nhập số điện thoại di động. Nếu có 2 số trở lên thì ngăn cách nhau bằng dấu phẩy(,)');
	var numberOfMobile = readlineSync.question('Số di động:');
	var numberOfPhone = readlineSync.question('Số điện thoại bàn:');
	/*Delete backspace when user type then split it to array*/
	numberOfMobile = (numberOfMobile.replace(/\s/g, '')).split(','); 
	numberOfPhone = (numberOfPhone.replace(/\s/g, '')).split(',');
	/*New phone constructor object*/
	var mobileLabel = new Phone('Mobile');	
	var phoneLabel = new Phone('Phone');
	/*Add phone number to object phone*/
	mobileLabel.addPhoneNumber(numberOfMobile);
	phoneLabel.addPhoneNumber(numberOfPhone);
	/*New contact constructor object and add phone to contact*/
	var contact = new Contact(name,email);
	contact.addPhone(mobileLabel);
	contact.addPhone(phoneLabel);
	console.log('Liên hệ vừa được tạo:\n');
	console.log(contact);
	/*Read file */
	var content = readContact(filePath);
	/*Push contact to content */
	content.push(contact);
	/*Write file */
	writeContact(content);
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
