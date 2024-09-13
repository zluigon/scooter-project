// require the User and Scooter classes - see where they can be used in ScooterApp.js
const Scooter = require("./Scooter");
const User = require("./User");

class ScooterApp {
  // ScooterApp code here
  constructor() {
    this.stations = { station1: [], station2: [], station3: [] };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (Object.keys(this.registeredUsers).includes(username)) {
      throw new Error("already registered");
    }

    if (age < 18) {
      throw new Error("too young to register");
    }
    
    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log("user has been registered");
    return user;
  }

  loginUser(username, password) {
    if (!Object.keys(this.registeredUsers).includes(username)) {
      throw new Error("username or password is incorrect");
    }
    const user = this.registeredUsers[username];
    user.login(password);
    console.log("user has been logged in");
  }

  logoutUser(username) {
    if (!this.registeredUsers[username].loggedIn) {
      throw new Error("no such user is logged in");
    }
    const user = this.registeredUsers[username];
    user.logout();
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }

    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log("created new scooter");
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    } else if (this.stations[station].includes(scooter)) {
      throw new Error("scooter already at station");
    }
    scooter.user = null;
    scooter.station = station;
    this.stations[station].push(scooter);
  }

  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error("scooter is already rented");
    }

    const station = Object.keys(this.stations).find((station) =>
      this.stations[station].includes(scooter)
    );

    const index = this.stations[station].indexOf(scooter);
    this.stations[station].splice(index, 1);
    scooter.user = user;
    console.log("scooter is rented");
  }

  print() {
    console.log("Registered Users:");
    console.log(JSON.stringify(this.registeredUsers));

    console.log("Stations : Scooters");
    Object.keys(this.stations).forEach((station) => {
      console.log(`${station} : ${JSON.stringify(this.stations[station])}`);
    });
  }
}

module.exports = ScooterApp;
