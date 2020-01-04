/*var student = {
    name: "Nguyen Van A",
    age: 18,
    Father: {
        'name': 'Nguyen Van B',
        'occupation': 'Bac si'
    },
    Subjects: [{
        name: "Tin hoc dai cuong",
        marks: 6
    },
	{
	    name: "Toan roi rac",
	    marks: 5
	}]
};
console.log(Student);*/

function Contacts (name,email) {
    this.name = name;
    this.email = email;
    this.phones = [];
}

Contacts.prototype.addPhone = function (phone) {
    this.phones.push(phone);
}
module.exports = Contacts;

