class User {
  // User code here
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }

  login(password) {
    if (password === this.password) {
      this.loggedIn = true;
    } else {
      throw new Error("incorrect password");
    }
  }

  logout() {
    this.loggedInoggedIn = false;
  }
}

module.exports = User
