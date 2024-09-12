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
    if (!Object.keys(this.registeredUsers).includes(username) && age >= 18) {
      const user = new User(username, password, age);
      this.registeredUsers[username] = user;
      console.log("user has been registered");
      return user;
    } else if (age < 18) {
      throw new Error("too young to register");
    } else {
      throw new Error("already registered");
    }
  }

  loginUser(username, password) {
    if (Object.keys(this.registeredUsers).includes(username)) {
      const user = this.registeredUsers[username];
      user.login(password);
      console.log("user has been logged in");
    } else {
      throw new Error("username or password is incorrect");
    }
  }

  logoutUser(username) {
    if (
      Object.keys(this.registeredUsers).includes(username) &&
      this.registerUser[username].loggedIn
    ) {
      const user = this.registeredUsers[username];
      user.logout();
    } else {
      throw new Error("no such user is logged in");
    }
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
    console.log(this.registeredUsers);

    console.log("Stations : Scooters");
    Object.keys(this.stations).forEach((station) => {
      console.log(`${station} : ${this.stations[station]}`);
    });
  }
}

module.exports = ScooterApp;
