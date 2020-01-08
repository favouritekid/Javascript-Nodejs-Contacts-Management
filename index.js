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
const fs = require('fs') //Call buited-in module fs
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
/*Read content from data.json */
function readContact(){
	return JSON.parse(fs.readFileSync(filePath)); //object
}
/*Write content from data.json */
function writeContact(content){
	fs.writeFileSync(filePath,JSON.stringify(content));
}
function listContact(){
	var content = readContact();
	if(content.length ===0)	console.log(content);
	else {
	console.log('Danh sách liên hệ:');
		for(let i of content){
			console.log('Id:'+i.id+'|'+ i.name + '|' + i.email);
			for(let j of i.phones){
				console.log('\t'+j.label, j.phoneNumber);
			}
		}
	}
}

function addContact(){
	var content = readContact();
	var name = readlineSync.question('Nhập họ và tên:');
	var email = readlineSync.question('Nhập email:');
	/*Generate Id auto-increment*/
	var id;
	if(content.length===0){
		id = 1;
	} else id = 1 + content[content.length-1].id;
	console.log('Nhập số điện thoại nếu có 2 số trở lên thì ngăn cách nhau bằng dấu phẩy(,)');
	var numberOfMobile = readlineSync.question('Số di động:');
	var numberOfPhone = readlineSync.question('Số điện thoại bàn:');
	/*Delete backspace when user type before split to array*/
	numberOfMobile = (numberOfMobile.replace(/\s/g, '')).split(','); 
	numberOfPhone = (numberOfPhone.replace(/\s/g, '')).split(',');
	/*New phone constructor object*/
	var mobileLabel = new Phone('Mobile');	
	var phoneLabel = new Phone('Phone');
	/*Add phone number to object phone*/
	mobileLabel.addPhoneNumber(numberOfMobile);
	phoneLabel.addPhoneNumber(numberOfPhone);
	/*New contact constructor object and add phone to contact*/
	var contact = new Contact(id,name,email);
	contact.addPhone(mobileLabel);
	contact.addPhone(phoneLabel);
	console.log('Liên hệ vừa được tạo:\n');
	console.log(contact);
	/*Read file */
	var content = readContact();
	/*Push contact to content */
	content.push(contact);
	/*Write file */
	writeContact(content);
}

function editContact(){
	var content = readContact();
	console.table(content,['id','name']);
	var choose = parseInt(readlineSync.question('Chọn ID cần sửa:'));
	
	for(let i of content){
		if(i.id === choose){
			console.log('Vui lòng chọn thông  tin cần sửa:');
			console.log('1. Họ và tên:'+ i.name);
			console.log('2. Địa chỉ email:'+ i.email);
			for(let j of i.phones){
				if (j.label==='Mobile'){console.log('3. Số điện thoại '+ j.label, j.phoneNumber);}
					else console.log('4. Số điện thoại '+ j.label, j.phoneNumber);
			}
		}
	}
	var choose2 = parseInt(readlineSync.question('Chọn nội dung cần sửa:'));
	
	switch (choose2) {
		case 1:
			var nameEdited = readlineSync.question('Nhập họ và tên:');
			for(let i of content){
				if(i.id === choose){
					i.name = nameEdited;
					writeContact(content);
				}
			}
			break;
		case 2:
			var emailEdited = readlineSync.question('Nhập email:');
			for(let i of content){
				if(i.id === choose){
					i.email = emailEdited;
					writeContact(content);
				}
			}
			break;
		case 3:
			for(let i of content){
				if(i.id === choose){
					for(let j of i.phones){
						if (j.label==='Mobile'){
							j.phoneNumber = j.phoneNumber.map((currElement,index)=>{
								return '[ '+index+' ] '+currElement;
							});
							console.log('Danh sách số điện thoại '+j.label+' là:' + j.phoneNumber);
						}
					}
				}	
			}		
			var mobileFix = readlineSync.question('1.Xóa \n2.Sửa. \n3.Thêm mới\nChọn:');			
			switch (mobileFix) {
				case '1':
					var mobileIndex = readlineSync.question('Chọn vị trí số cần xóa:');
					for(let i of content){
						if(i.id === choose){
							for(let j of i.phones){
								if (j.label =='Mobile'){
									j.phoneNumber.splice(mobileIndex,1);
									j.phoneNumber = j.phoneNumber.map((currElement)=>{return currElement.slice(6)});		
									writeContact(content);
								}
							}							
						}
					}
					break;
				case '2':
					var mobileIndex = readlineSync.question('Chọn vị trí số cần sửa:');
					for(let i of content){
						if(i.id === choose){
							for(let j of i.phones){
								if (j.label =='Mobile'){
									var mobileNumberEdited= readlineSync.question('Nhập vào nội dung cần sửa:');
									j.phoneNumber = j.phoneNumber.map((currElement)=>{return currElement.slice(6)});		
									j.phoneNumber[mobileIndex] = mobileNumberEdited;
									writeContact(content);
								}
							}							
						}
					}					
					break;
				case '3':
					var mobileAdded= readlineSync.question('Nhập số cần thêm:');
					for(let i of content){
						if(i.id === choose){
							for(let j of i.phones){
								if (j.label =='Mobile'){
									j.phoneNumber = j.phoneNumber.map((currElement)=>{return currElement.slice(6)});		
									j.phoneNumber.push(mobileAdded);
									writeContact(content);
								}
							}							
						}
					}						
					break;
				default:
					break;
			}
			break;
		case 4:
			for(let i of content){
				if(i.id === choose){
					for(let j of i.phones){
						if (j.label==='Phone'){
							j.phoneNumber = j.phoneNumber.map((currElement,index)=>{
								return '[ '+index+' ] '+currElement;
							});
							console.log('Danh sách số điện thoại '+j.label+' là:' + j.phoneNumber);
						}
					}
				}	
			}		
			var mobileFix = readlineSync.question('1.Xóa \n2.Sửa. \n3.Thêm mới\nChọn:');			
			switch (mobileFix) {
				case '1':
					var mobileIndex = readlineSync.question('Chọn vị trí số cần xóa:');
					for(let i of content){
						if(i.id === choose){
							for(let j of i.phones){
								if (j.label =='Phone'){
									j.phoneNumber.splice(mobileIndex,1);
									j.phoneNumber = j.phoneNumber.map((currElement)=>{return currElement.slice(6)});		
									writeContact(content);
								}
							}							
						}
					}
					break;
				case '2':
					var mobileIndex = readlineSync.question('Chọn vị trí số cần sửa:');
					for(let i of content){
						if(i.id === choose){
							for(let j of i.phones){
								if (j.label =='Phone'){
									var mobileNumberEdited= readlineSync.question('Nhập vào nội dung cần sửa:');
									j.phoneNumber = j.phoneNumber.map((currElement)=>{return currElement.slice(6)});		
									j.phoneNumber[mobileIndex] = mobileNumberEdited;
									writeContact(content);
								}
							}							
						}
					}					
					break;
				case '3':
					var mobileAdded= readlineSync.question('Nhập số cần thêm:');
					for(let i of content){
						if(i.id === choose){
							for(let j of i.phones){
								if (j.label =='Phone'){
									j.phoneNumber = j.phoneNumber.map((currElement)=>{return currElement.slice(6)});		
									j.phoneNumber.push(mobileAdded);
									writeContact(content);
								}
							}							
						}
					}						
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}
}
function deleteContact(){
	var content = readContact();
	var id = parseInt(readlineSync.question('Nhập ID cần xóa:'));
	for(let i of content){
		if(i.id === id){
			content.splice(content.indexOf(i),1);
		}
	}
	writeContact(content);
}
function searchContact(content,findContent){
	listContact();
	var content = readContact();
	let inputFind = readlineSync.question('Nhập nội dung cần tìm: ');
	if (isNaN(inputFind)) {
		let dataFinded = content.filter(data => {
			return data.name.normalize('NFC').toLowerCase().indexOf(inputFind.normalize('NFC').toLowerCase()) > -1;
		})
		console.log(dataFinded.length === 0 ? "Can't find the contact" : dataFinded);
	} else if (!isNaN(inputFind)) {
		let dataFinded = dataContacts.filter(data => {
			return data.phoneNumber.toString().indexOf(inputFind) > -1;
		})
		console.log(dataFinded.length === 0 ? "Can't find the contact" : dataFinded);
	} else {
		console.log('Input wrong');
		findContact();
	}
}

var input = [
			{'id':1,
			'name':'Will Smith',
			'email':'mailabc.com',
			'phones':[
						{'label':'Mobile','phoneNumber':['0222222222','0222222222']},
						{'label':'Phone','phoneNumber':['0222222222','0222222222']}
					 ]
		  	},
			{'id':2,
			'name':'Will Smith 2',
			'email':'mailabc2@gmail.com',
			'phones':[
						{'label':'Mobile','phoneNumber':['01111111111111','0222222222']},
						{'label':'Phone','phoneNumber':['0222222222','0222222222']}
					 ]
		  	},
			{'id':3,
			'name':'Will Smith 3',
			'email':'mailabc3@gmail.com',
			'phones':[
						{'label':'Mobile','phoneNumber':['0222222222','0222222222']},
						{'label':'Phone','phoneNumber':['0222222222','0222222222']}
					 ]
		  	}
];
