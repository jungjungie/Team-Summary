// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

function Engineer (name, id, email, github) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.github = github;
}

Engineer.prototype.getName = function() {
    return this.name;
}

Engineer.prototype.getId = function() {
    return this.id;
}

Engineer.prototype.getEmail = function() {
    return this.email;
}

Engineer.prototype.getGithub = function() {
    return this.github;
}

Engineer.prototype.getRole = () => 'Engineer';

module.exports = Engineer;