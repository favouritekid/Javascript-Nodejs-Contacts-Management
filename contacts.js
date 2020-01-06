function Contact (name,email) {
    this.name = name;
    this.email = email;
    this.phones = [];
}

Contact.prototype.addPhone = function (phone) {
    this.phones.push(phone);
}
module.exports = Contact;

