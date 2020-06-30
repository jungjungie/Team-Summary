// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

function Manager (name, id, email, officeNumber) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.officeNumber = officeNumber;
}

Manager.prototype.getName = function() {
    return this.name;
}

Manager.prototype.getId = function() {
    return this.id;
}

Manager.prototype.getEmail = function() {
    return this.email;
}

Manager.prototype.getOfficeNumber = function() {
    return this.officeNumber;
}

Manager.prototype.getRole = () => 'Manager';

module.exports = Manager;