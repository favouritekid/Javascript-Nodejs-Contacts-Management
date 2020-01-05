function Contacts (name,email) {
    this.name = name;
    this.email = email;
    this.phones = [];
}

Contacts.prototype.addPhone = function (phone) {
    this.phones.push(phone);
}
module.exports = Contacts;

