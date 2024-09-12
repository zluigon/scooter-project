const User = require("./User");

class Scooter {
  // scooter code here
  constructor(station) {
    this.station = station;
    this.user = null;
    this.charge = 100;
    this.isBroken = false;

    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
  }

  static nextSerial = 1;

  rent(user) {
    if (user instanceof User) {
      if (this.charge >= 20 && this.isBroken === false) {
        this.user = user;
      } else {
        throw new Error("scooter needs to charge or scooter needs repair");
      }
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  async recharge() {
    while (this.charge <= 100) {
      setInterval(() => {
        this.charge += 20;
        console.log(this.charge);
      }, 1000);
    }
  }

  async requestRepair() {
    setTimeout(() => {
      this.isBroken = false;
      console.log("repair completed");
    }, 5000);
  }
}

module.exports = Scooter;
