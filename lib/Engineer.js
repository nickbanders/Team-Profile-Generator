const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, gitHubId) {
    super(name, id, email);
    this.gitHubId = gitHubId;
  }
  getGithub() {
    return gitHubId;
  }
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;